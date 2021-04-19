import Query from './query'
import { DefaultSigner, Signer } from './signer'
import Broadcast from './transactions/broadcast'

import { ITransport, Transport } from './transport'

import Bank from './transactions/bank'

import Indexer from './indexer'
import Staking from './transactions/staking'
import Distribution from './transactions/distribution'

export interface Options {
    nodeUrl: string
    chainId?: string
    timeout?: number
    maxAttempts?: number
    txConfirmTries?: number
    txConfirmInterval?: number
    maxFeeInCoin?: number
    signer?: Signer
    indexerEndpoint?: string
}

export class Mele {
    private _options: Options
    private _transport: ITransport
    private _query: Query
    private _broadcast: Broadcast
    private _signer: Signer
    private _chainId: string
    private _maxFeeInCoin: number
    private _indexer: Indexer

    private _bank: Bank
    private _staking: Staking
    private _distribution: Distribution

    constructor(opt: Options) {
        this._options = opt

        this._transport = new Transport({
            nodeUrl: this._options.nodeUrl,
        })
        this._query = new Query(this._transport)

        this._signer = opt.signer || new DefaultSigner()

        this._chainId = opt.chainId || 'test'
        this._maxFeeInCoin = opt.maxFeeInCoin || 0

        this._broadcast = new Broadcast(this._transport, this._query, this._signer, {
            txConfirmInterval: this._options.txConfirmInterval || 6000,
            txConfirmTries: this._options.txConfirmTries || 6,
            chainId: this._chainId,
            maxFeeInCoin: this._maxFeeInCoin,
        })

        this._indexer = new Indexer({
            endpoint: opt.indexerEndpoint || 'http://localhost:3100/api/v1',
        })

        this._bank = new Bank(this._broadcast)
        this._distribution = new Distribution(this._broadcast)
        this._staking = new Staking(this._broadcast)
    }

    get query(): Query {
        return this._query
    }

    get signer(): Signer {
        return this._signer
    }

    get bank(): Bank {
        return this._bank
    }

    get staking(): Staking {
        return this._staking
    }

    get distribution(): Distribution {
        return this._distribution
    }

    get indexer(): Indexer {
        return this._indexer
    }
}
