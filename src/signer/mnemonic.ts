import * as Utils from '../utils'

import { ec as EC } from 'elliptic'
import shajs from 'sha.js'

import { encodeSecp256k1Signature, rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino'
import { Secp256k1, sha256 } from '@cosmjs/crypto'
import { Bech32 } from '@cosmjs/encoding'
import { AccountData, DirectSignResponse, makeSignBytes } from '@cosmjs/proto-signing'
import { SignDoc } from '../transport/codec/cosmos/tx/v1beta1/tx'

import { Signer } from './index'

const secp256k1 = new EC('secp256k1')

export class MnemonicSigner implements Signer {
    private readonly pubkey: string
    private readonly privkey: string
    private readonly prefix: string

    constructor(mnemonic: string, path = `m/44'/118'/0'/0/0`) {
        const masterKey = Utils.deriveMasterKey(mnemonic)
        const keyPair = Utils.deriveKeyPair(masterKey, path)

        this.privkey = keyPair.privateKey
        this.pubkey = keyPair.publicKey
        this.prefix = 'mele'
    }

    getAddress(): string {
        return Bech32.encode(
            this.prefix,
            rawSecp256k1PubkeyToRawAddress(Buffer.from(this.pubkey, 'hex'))
        )
    }

    getPrivateKey(): string {
        return this.privkey
    }

    getPublicKey(): string {
        return this.pubkey
    }

    getAccounts(): AccountData[] {
        return [
            {
                algo: 'secp256k1',
                address: this.getAddress(),
                pubkey: Buffer.from(this.pubkey, 'hex'),
            },
        ]
    }

    async signDirect(address: string, signDoc: SignDoc): Promise<DirectSignResponse> {
        const signBytes = makeSignBytes(signDoc)

        if (address !== this.getAddress()) {
            throw new Error(`Address ${address} not found in wallet`)
        }

        const hashedMessage = sha256(signBytes)

        const signature = await Secp256k1.createSignature(
            hashedMessage,
            Buffer.from(this.privkey, 'hex')
        )

        const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)])

        const stdSignature = encodeSecp256k1Signature(
            Buffer.from(this.pubkey, 'hex'),
            signatureBytes
        )

        return {
            signed: signDoc,
            signature: stdSignature,
        }
    }

    signMessage(msg: string): string {
        const key = EC.keyFromPrivate(this.privkey, 'hex')

        const signByte = shajs('sha256').update(msg).digest()

        const sig = key.sign(signByte, { canonical: true })

        return Buffer.from(JSON.stringify(sig), 'utf-8').toString('hex')
    }
}
