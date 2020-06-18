import { ec as EC } from 'elliptic'
import shajs from 'sha.js'

import { encodeMsg, encodeSignMsg, encodeTx } from '../transport/encoder'
import * as Utils from '../utils'
import { Signer } from './index'

const ec = new EC('secp256k1')

export class MnemonicSigner implements Signer {
    private _privateKey: string
    private _publicKey: string
    private _address: string

    constructor(mnemonic: string, path = `m/44'/118'/0'/0/0`) {
        const masterKey = Utils.deriveMasterKey(mnemonic)
        const keyPair = Utils.deriveKeyPair(masterKey, path)

        this._privateKey = keyPair.privateKey

        this._publicKey = keyPair.publicKey
        this._address = Utils.getAddressFromPublicKey(this._publicKey)
    }

    getAddress(): string {
        return this._address
    }

    getPrivateKey(): string {
        return this._privateKey
    }

    getPublicKey(): string {
        return this._publicKey
    }

    signTransaction(
        msgs: any[],
        chainId: string,
        fee: number,
        sequence: number,
        accountNumber: number
    ): string {
        let key = ec.keyFromPrivate(this._privateKey, 'hex')

        const signMsgHash = encodeSignMsg(msgs, chainId, sequence, accountNumber, fee)

        const sig = key.sign(signMsgHash, { canonical: true })

        const sigDERHex = Buffer.from(
            sig.r.toArray('be', 32).concat(sig.s.toArray('be', 32))
        ).toString('hex')

        const tx = encodeTx(
            msgs.map(msg => encodeMsg(msg.value)),
            new Array<string>(key.getPublic(true, 'hex')),
            new Array<string>(sigDERHex),
            fee
        )

        return tx
    }

    signMessage(msg: string): string {
        const key = ec.keyFromPrivate(this._privateKey, 'hex')

        const signByte = shajs('sha256')
            .update(msg)
            .digest()

        const sig = key.sign(signByte, { canonical: true })

        return Buffer.from(JSON.stringify(sig), 'utf-8').toString('hex')
    }
}
