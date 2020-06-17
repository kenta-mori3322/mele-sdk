import * as Types from '../common';
import { ITransport } from '../transport';
import { ResultBlock, ResultStatus, ResultTx } from '../transport/rpc';
export default class Query {
    private _transport;
    constructor(transport: ITransport);
    getBlock(height: number): Promise<ResultBlock>;
    getStatus(): Promise<ResultStatus>;
    getTx(hash: string): Promise<ResultTx>;
    getAccountInfo(address: string): Promise<Types.Account>;
    getAccSignInfo(address: string): Promise<Types.AccSignInfo>;
}
