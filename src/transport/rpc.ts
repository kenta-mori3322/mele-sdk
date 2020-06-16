import fetch from 'cross-fetch'
import { JsonRpcResponse, isJsonRpcSuccess } from './jsonrpc2'


export interface ResultBlock {
    block: Block
    block_meta: BlockMeta
}

export interface Block {
    data: Data
}

export interface BlockMeta {}

export interface Data {
    txs: string[]
}

export interface ResultStatus {
    node_info: NodeInfo
    sync_info: SyncInfo
}

export interface NodeInfo {
    channels: string
    id: string
    listen_addr: string
    moniker: string
    network: string
    version: string
}

export interface SyncInfo {
    catching_up: boolean
    latest_app_hash: string
    latest_block_hash: string
    latest_block_height: string
    latest_block_time: string
}

export class Rpc {
    private _nodeUrl: string

    constructor(nodeUrl: string) {
        this._nodeUrl = nodeUrl
    }

    block(height: number): Promise<ResultBlock> {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'block',
                params: {
                    height: String(height),
                },
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data: JsonRpcResponse<ResultBlock>) => {
                if (isJsonRpcSuccess(data)) {
                    return data.result as ResultBlock
                } else {
                    throw data.error
                }
            })
    }

    status(): Promise<ResultStatus> {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'status',
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data: JsonRpcResponse<ResultStatus>) => {
                if (isJsonRpcSuccess(data)) {
                    return data.result as ResultStatus
                } else {
                    throw data.error
                }
            })
    }

}