import { ResultBlock, ResultStatus, ResultBroadcastTx } from './rpc';
export interface ITransport {
    block(height: number): Promise<ResultBlock>;
    status(): Promise<ResultStatus>;
    query<T = any>(key: string[], data: string, storeName: string, subStoreName: string): Promise<T>;
    signAndBuild(msgs: any[], privKeyHex: string, seq: number, accNum: number): string;
    broadcastRawMsgBytesSync(tx: string): Promise<ResultBroadcastTx>;
}
export interface ITransportOptions {
    nodeUrl: string;
    chainId?: string;
    timeout?: number;
    maxAttempts?: number;
    txConfirmInterval?: number;
    txConfirmMaxAttempts?: number;
    maxFeeInCoin?: number;
}
export declare class Transport implements ITransport {
    private _chainId;
    private _rpc;
    private _maxFeeInCoin;
    constructor(opt: ITransportOptions);
    block(height: number): Promise<ResultBlock>;
    status(): Promise<ResultStatus>;
    query<T>(keys: string[], data: string, storeName: string, subStoreName: string): Promise<T>;
    signAndBuild(msgs: any[], privKeyHex: string, seq: number, accNum: number): string;
    broadcastRawMsgBytesSync(tx: string): Promise<ResultBroadcastTx>;
}
export declare class QueryError extends Error {
    readonly code: number;
    constructor(log: string, code: number);
}
export declare enum BroadCastErrorEnum {
    CheckTx = 0,
    DeliverTx = 1
}
export declare class BroadcastError extends Error {
    readonly code: number;
    readonly type: BroadCastErrorEnum;
    constructor(type: BroadCastErrorEnum, log: string, code: number);
}
