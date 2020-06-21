import Query from '../query'
import { ITransport } from '../transport'
import { ResultBroadcastTx } from '../transport/rpc'
import { BroadCastErrorEnum, BroadcastError } from './errors'
import { TransactionEvents } from './events'

import * as Types from '../common'

import promiseRetry from 'promise-retry'

interface Options {
    txConfirmInterval: number
    txConfirmTries: number
}

export default class Broadcast {
    private _transport: ITransport
    private _query: Query
    private _options: Options

    constructor(transport: ITransport, query: Query, opts: Options) {
        this._transport = transport
        this._query = query

        this._options = opts
    }

    safeBroadcast(signers: string[], makeTxFunc: Function): TransactionEvents {
        const txEvents = new TransactionEvents()

        let accSignInfos: Promise<Types.AccSignInfo>[] = []

        for (let i = 0; i < signers.length; i++) {
            let seq = this._query.getAccSignInfo(signers[i])

            accSignInfos.push(seq)
        }

        Promise.all(accSignInfos).then((signInfos: Types.AccSignInfo[]): void => {
            let tx = makeTxFunc(signInfos)

            this._transport
                .broadcastRawMsgBytesSync(tx)
                .then((result: ResultBroadcastTx): void => {
                    txEvents.emitHash(result.hash)

                    txEvents.emitReceipt(result)

                    promiseRetry(
                        (retry, num) => {
                            if (num === 1) {
                                return retry()
                            }

                            return this._transport.tx(result.hash).catch(retry)
                        },
                        {
                            retries: this._options.txConfirmTries,
                            factor: 1,
                            minTimeout: this._options.txConfirmInterval,
                            maxTimeout: this._options.txConfirmInterval,
                        }
                    ).then(
                        (value) => {
                            txEvents.emitConfirmation(value)
                        },
                        (err) => {}
                    )
                })
                .catch((err: any): void => {
                    if (err.data && err.data.indexOf('Tx already exists in cache') >= 0) {
                        txEvents.emitError(
                            new BroadcastError(BroadCastErrorEnum.CheckTx, err.data, err.code || 0)
                        )
                    } else if (err.code && err.message) {
                        txEvents.emitError(
                            new BroadcastError(BroadCastErrorEnum.CheckTx, err.message, err.code)
                        )
                    } else {
                        txEvents.emitError(
                            new BroadcastError(
                                BroadCastErrorEnum.CheckTx,
                                'Unknown error ocurred while broadcasting transaction.',
                                -1
                            )
                        )
                    }
                })
        })

        return txEvents
    }
}
