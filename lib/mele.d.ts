import Query from './query';
import { Signer } from './signer';
import Bank from './transactions/bank';
import Distribution from './transactions/distribution';
import Gov from './transactions/gov';
import Slashing from './transactions/slashing';
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
    private _slashing;
    private _distribution;
    private _gov;
    constructor(opt: Options);
    readonly query: Query;
    readonly signer: Signer;
    readonly bank: Bank;
    readonly staking: Staking;
    readonly slashing: Slashing;
    readonly distribution: Distribution;
    readonly governance: Gov;
    readonly indexer: Indexer;
}
