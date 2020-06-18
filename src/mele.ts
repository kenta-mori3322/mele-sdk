import Query from './query'
import Broadcast from './broadcast'
import { DefaultSigner, Signer } from './signer'

import * as Types from './common'

import {
    BroadCastErrorEnum,
    BroadcastError,
    ITransport,
    ITransportOptions,
    Transport
} from './transport'

import { ResultBroadcastTx } from './transport/rpc'

export class Mele {
    private _options: ITransportOptions
    private _transport: ITransport
    private _query: Query
    private _broadcast: Broadcast
    private _signer: Signer
    private _chainId: string
    private _maxFeeInCoin: number

    constructor(opt: ITransportOptions) {
        this._options = opt
        this._transport = new Transport(opt)
        this._query = new Query(this._transport)
        this._broadcast = new Broadcast(this._transport)
        this._signer = opt.signer || new DefaultSigner()

        this._chainId = opt.chainId || 'test'
        this._maxFeeInCoin = opt.maxFeeInCoin || 0
    }

    get query(): Query {
        return this._query
    }

    get signer(): Signer {
        return this._signer
    }

    async transfer(
        toAddress: string,
        amount: Types.SDKCoin[],
    ): Promise<ResultBroadcastTx> {
        const msgs = this._broadcast.makeTransferMsg(this._signer.getAddress(), toAddress, amount)

        return this.sendTransaction(msgs)
    }

    async sendTransaction(msgs: any[]): Promise<ResultBroadcastTx> {
        return this._safeBroadcast([this._signer.getAddress()], accSignInfos => {
            return this._signer.signTransaction(
                msgs,
                this._chainId,
                this._maxFeeInCoin,
                accSignInfos[0].sequence,
                accSignInfos[0].accountNumber
            )
        })
    }

    async _safeBroadcast(signers: string[], makeTxFunc: Function): Promise<ResultBroadcastTx> {
        let accSignInfos: Types.AccSignInfo[] = []

        for (let i = 0; i < signers.length; i++) {
            let seq = await this._query.getAccSignInfo(signers[i])

            accSignInfos.push(seq)
        }

        let tx = makeTxFunc(accSignInfos)

        let res: ResultBroadcastTx

        try {
            res = await this._transport.broadcastRawMsgBytesSync(tx)

            return res
        } catch (err) {
            if (err.data && err.data.indexOf('Tx already exists in cache') >= 0) {
                throw new BroadcastError(BroadCastErrorEnum.CheckTx, err.data, err.code || 0)
            } else if (err.code && err.message) {
                throw new BroadcastError(BroadCastErrorEnum.CheckTx, err.message, err.code)
            } else {
                throw new BroadcastError(
                    BroadCastErrorEnum.CheckTx,
                    'Unknown error ocurred while broadcasting transaction.',
                    -1
                )
            }
        }
    }
}