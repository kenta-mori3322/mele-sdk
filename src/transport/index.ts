import { ec as EC } from 'elliptic'
import { encodeMsg, encodeSignMsg, encodeTx } from './encoder'

import {
    ResultBlock,
    ResultStatus,
    ResultTx,
    ResultBroadcastTx,
    Rpc
} from './rpc'

export interface ITransport {
    block(height: number): Promise<ResultBlock>
    status(): Promise<ResultStatus>
    tx(hash: string): Promise<ResultTx>
    query<T = any>(key: string[], data: string, storeName: string, subStoreName: string): Promise<T>
    signAndBuild(msgs: any[], privKeyHex: string, seq: number, accNum: number): string
    broadcastRawMsgBytesSync(tx: string): Promise<ResultBroadcastTx>
}

export interface ITransportOptions {
    nodeUrl: string
    chainId?: string
    timeout?: number
    maxAttempts?: number
    txConfirmInterval?: number
    txConfirmMaxAttempts?: number
    maxFeeInCoin?: number
}

export class Transport implements ITransport {
    private _chainId: string
    private _rpc: Rpc
    private _maxFeeInCoin: number

    constructor(opt: ITransportOptions) {
        this._rpc = new Rpc(opt.nodeUrl)
        this._chainId = opt.chainId || 'test'
        this._maxFeeInCoin = opt.maxFeeInCoin || 0
    }

    block(height: number): Promise<ResultBlock> {
        return this._rpc.block(height).then(result => {
            return result as ResultBlock
        })
    }

    status(): Promise<ResultStatus> {
        return this._rpc.status().then(result => {
            return result as ResultStatus
        })
    }

    tx(hash: string): Promise<ResultTx> {
        return this._rpc.tx(String(Buffer.from(hash, 'hex').toString('base64'))).then(result => {
            return result as ResultTx
        })
    }

    query<T>(keys: string[], data: string, storeName: string, subStoreName: string): Promise<T> {
        let path = `/custom/${storeName}/${subStoreName}`

        keys.forEach(key => {
            path += '/' + key
        })

        return this._rpc
            .abciQuery(path, Buffer.from(data, 'utf-8').toString('hex'))
            .then(result => {
                if (!result.response || !result.response.value) {
                    throw new QueryError(result.response.log, result.response.code)
                }

                const jsonStr = Buffer.from(result.response.value, 'base64').toString('utf-8')

                return JSON.parse(jsonStr) as T
            })
    }

    signAndBuild(msgs: any[], privKeyHex: string, seq: number, accNum: number): string {
        let ec = new EC('secp256k1')
        let key = ec.keyFromPrivate(privKeyHex, 'hex')

        const signMsgHash = encodeSignMsg(msgs, this._chainId, seq, accNum, this._maxFeeInCoin)

        const sig = key.sign(signMsgHash, { canonical: true })
        const sigDERHex = Buffer.from(
            sig.r.toArray('be', 32).concat(sig.s.toArray('be', 32))
        ).toString('hex')

        const tx = encodeTx(
            msgs.map(msg => encodeMsg(msg.value)),
            new Array<string>(key.getPublic(true, 'hex')),
            new Array<string>(sigDERHex),
            this._maxFeeInCoin
        )

        return tx
    }

    broadcastRawMsgBytesSync(tx: string): Promise<ResultBroadcastTx> {
        return this._rpc.broadcastTxSync(tx).then(result => {
            if (result.code !== 0) {
                throw new BroadcastError(BroadCastErrorEnum.CheckTx, result.log, result.code)
            }
            return result
        })
    }
}

export class QueryError extends Error {
    readonly code: number

    constructor(log: string, code: number) {
        super(log)
        Object.setPrototypeOf(this, QueryError.prototype)
        this.code = code
    }
}

export enum BroadCastErrorEnum {
    CheckTx,
    DeliverTx,
}

export class BroadcastError extends Error {
    readonly code: number
    readonly type: BroadCastErrorEnum

    constructor(type: BroadCastErrorEnum, log: string, code: number) {
        super(log)
        Object.setPrototypeOf(this, BroadcastError.prototype)
        this.type = type
        this.code = code
    }
}