export interface ResultTx {
    hash: string;
    height: string;
    tx: string;
    tx_result: TxDetail;
}
export interface TxDetail {
    code: number;
    data: any;
    log: string;
    info: string;
    gasWanted: string;
    gasUsed: string;
    events: TxEvent[];
    codespace: string;
}
export interface TxEvent {
    type: string;
    attributes: TxEventAttribute[];
}
export interface TxEventAttribute {
    key: string;
    value: string;
}
export interface ResultBlock {
    block: Block;
    block_meta: BlockMeta;
}
export interface Block {
    data: Data;
}
export interface BlockMeta {
}
export interface Data {
    txs: string[];
}
export interface ResultStatus {
    node_info: NodeInfo;
    sync_info: SyncInfo;
}
export interface NodeInfo {
    channels: string;
    id: string;
    listen_addr: string;
    moniker: string;
    network: string;
    version: string;
}
export interface SyncInfo {
    catching_up: boolean;
    latest_app_hash: string;
    latest_block_hash: string;
    latest_block_height: string;
    latest_block_time: string;
}
export interface ResultABCIQuery {
    response: ResponseQuery;
}
export interface ResponseQuery {
    code: number;
    log: string;
    info: string;
    index: number;
    key: string;
    value: any;
    proof: string;
    height: number;
}
export interface ResultBroadcastTx {
    code: number;
    data: any;
    log: string;
    hash: any;
}
export declare class Rpc {
    private _nodeUrl;
    constructor(nodeUrl: string);
    block(height: number): Promise<ResultBlock>;
    status(): Promise<ResultStatus>;
    abciQuery(path: string, key: string, opts?: {
        height: string;
        trusted: boolean;
    }): Promise<ResultABCIQuery>;
    broadcastTxSync(tx: string): Promise<ResultBroadcastTx>;
    tx(hash: string): Promise<ResultTx>;
}
