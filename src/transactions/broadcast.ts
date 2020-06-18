import Query from '../query'
import { ITransport } from '../transport'
import { ResultBroadcastTx } from '../transport/rpc'
import { BroadCastErrorEnum, BroadcastError } from './errors'
import { TransactionEvents } from './events'

import * as Types from '../common'

import promiseRetry from 'promise-retry'

export function safeBroadcast(
    signers: string[],
    query: Query,
    transport: ITransport,
    options: any,
    makeTxFunc: Function
): TransactionEvents {
    const txEvents = new TransactionEvents()

    let accSignInfos: Promise<Types.AccSignInfo>[] = []

    for (let i = 0; i < signers.length; i++) {
        let seq = query.getAccSignInfo(signers[i])

        accSignInfos.push(seq)
    }

    Promise.all(accSignInfos).then((signInfos: Types.AccSignInfo[]): void => {
        let tx = makeTxFunc(signInfos)

        transport
            .broadcastRawMsgBytesSync(tx)
            .then((result: ResultBroadcastTx): void => {
                txEvents.emitHash(result.hash)

                txEvents.emitReceipt(result)

                promiseRetry(
                    (retry, num) => {
                        if (num === 1) {
                            return retry()
                        }

                        return transport.tx(result.hash).catch(retry)
                    },
                    {
                        retries: options.txConfirmTries || 6,
                        factor: 1,
                        minTimeout: options.txConfirmInterval || 6000,
                        maxTimeout: options.txConfirmInterval || 6000,
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
