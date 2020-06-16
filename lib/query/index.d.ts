import { ITransport } from '../transport';
import { ResultBlock, ResultStatus } from '../transport/rpc';
export default class Query {
    private _transport;
    constructor(transport: ITransport);
    getBlock(height: number): Promise<ResultBlock>;
    getStatus(): Promise<ResultStatus>;
}
