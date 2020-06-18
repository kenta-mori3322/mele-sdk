import { Signer } from './index';
export declare class KeyPairSigner implements Signer {
    private _privateKey;
    private _publicKey;
    private _address;
    constructor(privateKey: string);
    getAddress(): string;
    getPrivateKey(): string;
    getPublicKey(): string;
    signTransaction(msgs: any[], chainId: string, fee: number, sequence: number, accountNumber: number): string;
    signMessage(msg: string): string;
}
