import Query from './query'

import {
    ITransport,
    ITransportOptions,
    Transport,
} from './transport'

export class Mele {
    private _options: ITransportOptions
    private _transport: ITransport
    private _query: Query

    constructor(opt: ITransportOptions) {
        this._options = opt
        this._transport = new Transport(opt)
        this._query = new Query(this._transport)
    }

    get query(): Query {
        return this._query
    }
}