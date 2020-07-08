import * as Types from '../common';
import { ITransport } from '../transport';
import { ResultBlock, ResultStatus, ResultTx } from '../transport/rpc';
import StakingQuery from './staking';
import SlashingQuery from './slashing';
export default class Query {
    private _transport;
    private _staking;
    private _slashing;
    constructor(transport: ITransport);
    readonly staking: StakingQuery;
    readonly slashing: SlashingQuery;
    getBlock(height: number): Promise<ResultBlock>;
    getStatus(): Promise<ResultStatus>;
    getTx(hash: string): Promise<ResultTx>;
    getAccountInfo(address: string): Promise<Types.Account>;
    getAccSignInfo(address: string): Promise<Types.AccSignInfo>;
}
