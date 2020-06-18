export enum BroadCastErrorEnum {
    CheckTx,
    DeliverTx,
}

export class BroadcastError extends Error {
    readonly code: number
    readonly type: BroadCastErrorEnum

    constructor(type: BroadCastErrorEnum, log: string, code: number) {
        super(log)
        Object.setPrototypeOf(this, BroadcastError.prototype)
        this.type = type
        this.code = code
    }
}
