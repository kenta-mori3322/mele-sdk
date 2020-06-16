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
export declare class Rpc {
    private _nodeUrl;
    constructor(nodeUrl: string);
    block(height: number): Promise<ResultBlock>;
    status(): Promise<ResultStatus>;
}
