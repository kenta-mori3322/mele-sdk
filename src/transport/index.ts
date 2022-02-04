import fetch from 'cross-fetch'
import { ResultBlock, ResultBroadcastTx, ResultStatus, ResultTx, Rpc } from './rpc'

import { BroadCastErrorEnum, BroadcastError } from '../transactions/errors'

export interface ITransport {
    block(height: number): Promise<ResultBlock>
    status(): Promise<ResultStatus>
    tx(hash: string): Promise<ResultTx>
    query<T = any>(key: string[], data: string, storeName: string, subStoreName: string): Promise<T>
    lcdQuery<T = any>(path: string): Promise<T>
    broadcastRawMsgBytesSync(tx: string): Promise<ResultBroadcastTx>
}

export interface ITransportOptions {
    nodeUrl: string
}

export class Transport implements ITransport {
    private _rpc: Rpc
    private _nodeUrl: string
    private _lcdUrl: string

    constructor(opt: ITransportOptions) {
        this._rpc = new Rpc(opt.nodeUrl)
        this._nodeUrl = opt.nodeUrl

        this._lcdUrl = this._nodeUrl.replace('26657', '443')
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

    lcdQuery<T>(path: string): Promise<T> {
        return fetch(this._lcdUrl + path)
            .then(response => response.json())
            .then(result => {
                return result as T
            })
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
