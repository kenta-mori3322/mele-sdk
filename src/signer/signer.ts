import { AccountData, DirectSignResponse } from '@cosmjs/proto-signing'
import { SignDoc } from '../transport/codec/cosmos/tx/v1beta1/tx'

export interface Signer {
    getAddress(): string
    getPrivateKey(): string
    getPublicKey(): string
    signDirect(address: string, signDoc: SignDoc): Promise<DirectSignResponse>
    signMessage(msg: string): string
    getAccounts(): AccountData[]
}
