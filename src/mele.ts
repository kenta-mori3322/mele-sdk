import Query from './query'
import { DefaultSigner, Signer } from './signer'
import Broadcast from './transactions/broadcast'
import { Encoder } from './transactions/encoder'

import * as Types from './common'

import { ITransport, Transport } from './transport'

import { ResultBroadcastTx } from './transport/rpc'

import { Transaction } from './transactions'
import { TransactionEvents } from './transactions/events'

import Bank from './transactions/bank'

export interface Options {
    nodeUrl: string
    chainId?: string
    timeout?: number
    maxAttempts?: number
    txConfirmTries?: number
    txConfirmInterval?: number
    maxFeeInCoin?: number
    signer?: Signer
}

export class Mele {
    private _options: Options
    private _transport: ITransport
    private _query: Query
    private _broadcast: Broadcast
    private _signer: Signer
    private _chainId: string
    private _maxFeeInCoin: number

    private _bank: Bank

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

        this._bank = new Bank(this._broadcast)
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
}
