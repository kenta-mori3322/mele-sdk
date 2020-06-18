import { Signer } from '../signer';
import { ResultBlock, ResultStatus, ResultTx, ResultBroadcastTx } from './rpc';
export interface ITransport {
    block(height: number): Promise<ResultBlock>;
    status(): Promise<ResultStatus>;
    tx(hash: string): Promise<ResultTx>;
    query<T = any>(key: string[], data: string, storeName: string, subStoreName: string): Promise<T>;
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
    signer?: Signer;
}
export declare class Transport implements ITransport {
    private _rpc;
    constructor(opt: ITransportOptions);
    block(height: number): Promise<ResultBlock>;
    status(): Promise<ResultStatus>;
    tx(hash: string): Promise<ResultTx>;
    query<T>(keys: string[], data: string, storeName: string, subStoreName: string): Promise<T>;
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
