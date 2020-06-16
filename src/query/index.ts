import { ITransport } from '../transport'
import { ResultBlock, ResultStatus } from '../transport/rpc'

export default class Query {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    getBlock(height: number): Promise<ResultBlock> {
        return this._transport.block(height)
    }

    getStatus(): Promise<ResultStatus> {
        return this._transport.status()
    }

}