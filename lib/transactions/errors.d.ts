export declare enum BroadCastErrorEnum {
    CheckTx = 0,
    DeliverTx = 1
}
export declare class BroadcastError extends Error {
    readonly code: number;
    readonly type: BroadCastErrorEnum;
    constructor(type: BroadCastErrorEnum, log: string, code: number);
}
