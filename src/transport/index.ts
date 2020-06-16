import { ec as EC } from 'elliptic'

import {
    ResultBlock,
    ResultStatus,
    Rpc
} from './rpc'

export interface ITransport {
    block(height: number): Promise<ResultBlock>
    status(): Promise<ResultStatus>
}

export interface ITransportOptions {
    nodeUrl: string
    chainId?: string
    timeout?: number
    maxAttempts?: number
    txConfirmInterval?: number
    txConfirmMaxAttempts?: number
}

export class Transport implements ITransport {
    private _rpc: Rpc

    constructor(opt: ITransportOptions) {
        this._rpc = new Rpc(opt.nodeUrl)
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
}