import Query from './query';
import { Signer } from './signer';
import Bank from './transactions/bank';
import Staking from './transactions/staking';
import Indexer from './indexer';
export interface Options {
    nodeUrl: string;
    chainId?: string;
    timeout?: number;
    maxAttempts?: number;
    txConfirmTries?: number;
    txConfirmInterval?: number;
    maxFeeInCoin?: number;
    signer?: Signer;
    indexerEndpoint?: string;
}
export declare class Mele {
    private _options;
    private _transport;
    private _query;
    private _broadcast;
    private _signer;
    private _chainId;
    private _maxFeeInCoin;
    private _indexer;
    private _bank;
    private _staking;
    constructor(opt: Options);
    readonly query: Query;
    readonly signer: Signer;
    readonly bank: Bank;
    readonly staking: Staking;
    readonly indexer: Indexer;
}
