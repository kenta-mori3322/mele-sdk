export declare function encodeAddr(addr: Buffer): string;
export declare function decodeAddr(addr: string): Buffer;
export declare const encodeMsg: (msg: any) => any;
export declare function encodeSignMsg(stdMsg: any[], chainId: string, seq: number, accountNumber: number, maxFeeInCoin: number): any;
export declare function encodeTx(msgs: any[], rawPubKey: string[], rawSigDER: string[], maxFeeInCoin: number): string;
export declare const getFee: (maxFeeInCoin: number, msgCount: number) => any;
