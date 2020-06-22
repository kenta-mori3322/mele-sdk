import Query from './query';
import { Signer } from './signer';
import Bank from './transactions/bank';
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
    private _bank;
    constructor(opt: Options);
    readonly query: Query;
    readonly signer: Signer;
    readonly bank: Bank;
}
