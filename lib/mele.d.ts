import Query from './query';
import { Signer } from './signer';
import Bank from './transactions/bank';
import Control from './transactions/control';
import Distribution from './transactions/distribution';
import Gov from './transactions/gov';
import Slashing from './transactions/slashing';
import Staking from './transactions/staking';
import Treasury from './transactions/treasury';
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
    private _treasury;
    private _control;
    constructor(opt: Options);
    get query(): Query;
    get signer(): Signer;
    get bank(): Bank;
    get staking(): Staking;
    get slashing(): Slashing;
    get distribution(): Distribution;
    get governance(): Gov;
    get treasury(): Treasury;
    get control(): Control;
    get indexer(): Indexer;
}
