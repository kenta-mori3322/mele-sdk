export interface Signer {
    getAddress(): string;
    getPrivateKey(): string;
    getPublicKey(): string;
    signTransaction(msgs: any[], chainId: string, fee: number, sequence: number, accountNumber: number): string;
    signMessage(msg: string): string;
}
