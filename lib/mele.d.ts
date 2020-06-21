import Query from './query';
import { Signer } from './signer';
import * as Types from './common';
import { Transaction } from './transactions';
import { TransactionEvents } from './transactions/events';
export interface Options {
    nodeUrl: string;
    chainId?: string;
    timeout?: number;
    maxAttempts?: number;
    txConfirmTries?: number;
    txConfirmInterval?: number;
    maxFeeInCoin?: number;
    signer?: Signer;
}
export declare class Mele {
    private _options;
    private _transport;
    private _query;
    private _broadcast;
    private _signer;
    private _chainId;
    private _maxFeeInCoin;
    constructor(opt: Options);
    readonly query: Query;
    readonly signer: Signer;
    sendTransaction(msgs: any[]): TransactionEvents;
    transfer(toAddress: string, amount: Types.SDKCoin[]): Transaction;
}
