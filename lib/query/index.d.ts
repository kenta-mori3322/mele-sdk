import * as Types from '../common';
import { ITransport } from '../transport';
import { ResultBlock, ResultStatus, ResultTx } from '../transport/rpc';
import DistributionQuery from './distribution';
import GovQuery from './gov';
import SlashingQuery from './slashing';
import StakingQuery from './staking';
export default class Query {
    private _transport;
    private _staking;
    private _slashing;
    private _distribution;
    private _gov;
    constructor(transport: ITransport);
    readonly staking: StakingQuery;
    readonly slashing: SlashingQuery;
    readonly distribution: DistributionQuery;
    readonly governance: GovQuery;
    getBlock(height: number): Promise<ResultBlock>;
    getStatus(): Promise<ResultStatus>;
    getTx(hash: string): Promise<ResultTx>;
    getAccountInfo(address: string): Promise<Types.Account>;
    getAccSignInfo(address: string): Promise<Types.AccSignInfo>;
}
