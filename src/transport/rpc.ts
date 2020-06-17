import fetch from 'cross-fetch'
import { JsonRpcResponse, isJsonRpcSuccess } from './jsonrpc2'

export interface ResultTx {
    hash: string
    height: string
    tx: string
    tx_result: TxDetail
}

export interface TxDetail {
    code: number
    data: any
    log: string
    info: string
    gasWanted: string
    gasUsed: string
    events: TxEvent[]
    codespace: string
}

export interface TxEvent {
    type: string
    attributes: TxEventAttribute[]
}

export interface TxEventAttribute {
    key: string
    value: string
}

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

const DefaultABCIQueryOptions = {
    height: '0',
    trusted: false,
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

export interface ResultABCIQuery {
    response: ResponseQuery
}

export interface ResponseQuery {
    code: number
    log: string
    info: string
    index: number
    key: string
    value: any
    proof: string
    height: number
}

export interface ResultBroadcastTx {
    code: number
    data: any
    log: string
    hash: any
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

    abciQuery(path: string, key: string, opts = DefaultABCIQueryOptions): Promise<ResultABCIQuery> {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'abci_query',
                params: {
                    ...opts,
                    path,
                    data: key,
                },
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data: JsonRpcResponse<ResultABCIQuery>) => {
                if ('result' in data) {
                    return data.result as ResultABCIQuery
                } else {
                    throw data.error
                }
            })
    }

    broadcastTxSync(tx: string): Promise<ResultBroadcastTx> {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'broadcast_tx_sync',
                params: {
                    tx: tx,
                },
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data: JsonRpcResponse<ResultBroadcastTx>) => {
                if (isJsonRpcSuccess(data)) {
                    return data.result as ResultBroadcastTx
                } else {
                    throw data.error
                }
            })
    }

    tx(hash: string): Promise<ResultTx> {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'tx',
                params: {
                    hash: hash,
                },
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data: JsonRpcResponse<ResultTx>) => {
                if (isJsonRpcSuccess(data)) {
                    let res: ResultTx = {
                        hash: data.result.hash,
                        tx_result: data.result.tx_result,
                        height: data.result.height,
                        tx: data.result.tx,
                    }
                    return res
                } else {
                    throw data.error
                }
            })
    }
}