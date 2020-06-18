import { Signer } from './index';
export declare class MnemonicSigner implements Signer {
    private _privateKey;
    private _publicKey;
    private _address;
    constructor(mnemonic: string, path?: string);
    getAddress(): string;
    getPrivateKey(): string;
    getPublicKey(): string;
    signTransaction(msgs: any[], chainId: string, fee: number, sequence: number, accountNumber: number): string;
    signMessage(msg: string): string;
}
