import * as Types from '../common';
import { ITransport } from '../transport';
import { ResultBlock, ResultStatus, ResultTx } from '../transport/rpc';
import DistributionQuery from './distribution';
import SlashingQuery from './slashing';
import StakingQuery from './staking';
export default class Query {
    private _transport;
    private _staking;
    private _slashing;
    private _distribution;
    constructor(transport: ITransport);
    get staking(): StakingQuery;
    get slashing(): SlashingQuery;
    get distribution(): DistributionQuery;
    getBlock(height: number): Promise<ResultBlock>;
    getStatus(): Promise<ResultStatus>;
    getTx(hash: string): Promise<ResultTx>;
    getAccountInfo(address: string): Promise<Types.Account>;
    getAccSignInfo(address: string): Promise<Types.AccSignInfo>;
}
