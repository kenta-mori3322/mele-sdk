import { AccountData, DirectSignResponse } from '@cosmjs/proto-signing'
import { SignDoc } from '../transport/codec/cosmos/tx/v1beta1/tx'
import { Signer } from './index'

export class DefaultSigner implements Signer {
    getAddress(): string {
        throw new Error('Signer not initialized.')
    }

    getPrivateKey(): string {
        throw new Error('Signer not initialized.')
    }

    getPublicKey(): string {
        throw new Error('Signer not initialized.')
    }

    getAccounts(): AccountData[] {
        throw new Error('Signer not initialized.')
    }

    async signDirect(address: string, signDoc: SignDoc): Promise<DirectSignResponse> {
        throw new Error('Signer not initialized.')
    }

    signMessage(msg: string): string {
        throw new Error('Signer not initialized.')
    }
}
