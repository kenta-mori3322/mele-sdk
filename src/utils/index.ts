import { ec as EC } from 'elliptic'

import * as bip32 from 'bip32'
import * as bip39 from 'bip39'

import bech32 from 'bech32'
import ripemd160 from 'ripemd160'
import shajs from 'sha.js'

import { encodeAddr } from '../transport/encoder'
import { TransactionEvents } from '../transactions/events'

import { fromUmelg, fromUmelc, smallestDenom, smallestStableDenom, toUmelg, toUmelc } from './conversion'
export { fromUmelg, fromUmelc, smallestDenom, smallestStableDenom, toUmelg, toUmelc }

const ec = new EC('secp256k1')

export interface KeyPair {
    privateKey: string
    publicKey: string
}

export function generateMnemonic(): string {
    return bip39.generateMnemonic(256)
}

export function generateKeyPair(): KeyPair {
    const keyPair = ec.genKeyPair()

    const pubKey = keyPair.getPublic(true, 'hex')
    const privKey = keyPair.getPrivate('hex')

    return <KeyPair>{
        privateKey: privKey,
        publicKey: pubKey,
    }
}

export function deriveMasterKey(mnemonic: string): bip32.BIP32Interface {
    bip39.validateMnemonic(mnemonic)

    const seed = bip39.mnemonicToSeedSync(mnemonic)

    return bip32.fromSeed(seed)
}

export function deriveMasterKeyFromSeed(seed: Buffer): bip32.BIP32Interface {
    return bip32.fromSeed(seed)
}

export function deriveKeyPair(masterKey: bip32.BIP32Interface, hdPath: string): KeyPair {
    const hdWallet = masterKey.derivePath(hdPath)

    const privKey = hdWallet.privateKey

    if (!privKey) {
        throw new Error('Failed to derive key pair!')
    }

    const pubKey = ec.keyFromPrivate(privKey, 'hex')

    return <KeyPair>{
        privateKey: privKey.toString('hex'),
        publicKey: pubKey.getPublic(true, 'hex'),
    }
}

export function deriveKeyPairFromAccountAndIndex(
    masterKey: bip32.BIP32Interface,
    account: number = 0,
    index: number = 0
): KeyPair {
    const hdPath = `m/44'/118'/${account}'/0/${index}`

    return deriveKeyPair(masterKey, hdPath)
}

export function getAddressFromPublicKey(pubKey: string): string {
    if (!validatePublicKey(pubKey)) {
        throw new Error('Invalid public key.')
    }

    const hashResult = shajs('sha256').update(Buffer.from(pubKey, 'hex')).digest() as string

    const addr = new ripemd160().update(hashResult).digest()

    return encodeAddr(addr)
}

export function getPublicKeyFromPrivateKey(privKey: string): string {
    const key = ec.keyFromPrivate(privKey, 'hex')

    return key.getPublic(true, 'hex')
}

export function validatePublicKey(pubKey: string): boolean {
    try {
        const keyPair = ec.keyFromPublic(pubKey, 'hex')

        return keyPair.validate().result
    } catch (e) {
        return false
    }
}

export function encodeAddress(addr: Buffer, prefix: string): string {
    return bech32.encode(prefix, bech32.toWords(addr))
}

export function decodeAddress(addr: string, prefix: string): Buffer {
    let decode = bech32.decode(addr)

    if (decode.prefix !== prefix) {
        throw new Error(`invalid prefix: ${decode.prefix}\n`)
    }

    return Buffer.from(bech32.fromWords(decode.words))
}

export function promisify(events: TransactionEvents, type: string = 'confirmation'): Promise<any> {
    if (type === 'hash' || type === 'receipt' || type === 'confirmation') {
        return new Promise<any>((resolve, reject) => {
            events.on('error', error => reject(error))
            events.on(type, data => resolve(data))
        })
    } else {
        throw new Error('Invalid event type.')
    }
}
