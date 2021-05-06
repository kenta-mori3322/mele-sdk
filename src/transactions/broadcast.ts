import Query from '../query'
import { Signer } from '../signer'
import { ITransport } from '../transport'
import { ResultBroadcastTx } from '../transport/rpc'
import { BroadCastErrorEnum, BroadcastError } from './errors'
import { TransactionEvents } from './events'

import { StdFee, encodeSecp256k1Pubkey } from '@cosmjs/amino'
import { fromBase64 } from '@cosmjs/encoding'
import { Int53 } from '@cosmjs/math'
import { EncodeObject, encodePubkey, makeAuthInfoBytes, makeSignDoc } from '@cosmjs/proto-signing'
import { TxRaw } from '../transport/codec/cosmos/tx/v1beta1/tx'

import { getRegistry } from '../transport/registry'

import promiseRetry from 'promise-retry'

interface Options {
    txConfirmInterval: number
    txConfirmTries: number
    chainId: string
    maxFeeInCoin: number
}

export interface SignerData {
    readonly accountNumber: number
    readonly sequence: number
    readonly chainId: string
}

export default class Broadcast {
    private _transport: ITransport
    private _query: Query
    private _options: Options
    private _signer: Signer

    constructor(transport: ITransport, query: Query, signer: Signer, opts: Options) {
        this._transport = transport
        this._query = query
        this._signer = signer

        this._options = opts
    }

    get signer(): Signer {
        return this._signer
    }

    get query(): Query {
        return this._query
    }

    safeBroadcast(tx): TransactionEvents {
        const txEvents = new TransactionEvents()

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
                    value => {
                        if (value && value.tx_result && value.tx_result.code !== 0) {
                            txEvents.emitError(
                                new BroadcastError(
                                    BroadCastErrorEnum.DeliverTx,
                                    value.tx_result.log,
                                    value.tx_result.code,
                                )
                            )
                        } else {
                            txEvents.emitConfirmation(value)
                        }
                    },
                    err => {}
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

        return txEvents
    }

    async sign(messages: readonly EncodeObject[], fee: StdFee, memo: string): Promise<TxRaw> {
        let signerAddress = this._signer.getAddress()

        const { accountNumber, sequence } = await this._query.getAccSignInfo(signerAddress)
        const chainId = this._options.chainId

        const accountFromSigner = this.signer
            .getAccounts()
            .find(account => account.address === signerAddress)

        if (!accountFromSigner) {
            throw new Error('Failed to retrieve account from signer')
        }

        const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey))

        const txBody = {
            messages: messages,
            memo: memo,
        }

        const txBodyBytes = getRegistry().encode({
            typeUrl: '/cosmos.tx.v1beta1.TxBody',
            value: txBody,
        })

        const gasLimit = Int53.fromString(fee.gas).toNumber()
        const authInfoBytes = makeAuthInfoBytes([pubkey], fee.amount, gasLimit, sequence)
        const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber)
        const { signature, signed } = await this.signer.signDirect(signerAddress, signDoc)

        return TxRaw.fromPartial({
            bodyBytes: signed.bodyBytes,
            authInfoBytes: signed.authInfoBytes,
            signatures: [fromBase64(signature.signature)],
        })
    }

    async sendTransaction(messages: readonly EncodeObject[]): Promise<TransactionEvents> {
        let fee: StdFee = {
            amount: [
                {
                    denom: 'umelc',
                    amount: '0',
                },
            ],
            gas: String(Math.ceil(messages.length / 10) * 200000),
        }
        const txRaw = await this.sign(messages, fee, 'sdk')
        const signedTx = Uint8Array.from(TxRaw.encode(txRaw).finish())

        return this.safeBroadcast(Buffer.from(signedTx).toString('base64'))
    }
}
