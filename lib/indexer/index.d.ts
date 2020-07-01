interface IndexerOptions {
    endpoint: string;
}
interface TransactionMsg {
    action: string;
    data: object;
    module: string;
    sender: string;
    meta: any[];
    addresses: string[];
    log: string;
}
interface Transaction {
    _id: string;
    hash: string;
    height: string;
    msgs: TransactionMsg[];
    log: string;
    info: string;
    code: string;
    codespace: string;
    gas_wanted: string;
    gas_used: string;
    timestamp: string;
    valid: boolean;
}
interface Block {
    height: number;
    hash: string;
    transNum: string;
    time: Date;
    lastBlockHash: string;
    proposerAddress: string;
    precommitsCount: number;
    validatorsCount: number;
}
interface BlockEvent {
    height: number;
    action: string;
    data: object;
    addresses: string[];
    eventType: string;
}
interface BlockData {
    block: Block;
    txs: Transaction[];
    events: BlockEvent[];
}
interface TxCount {
    count: number;
}
export default class Indexer {
    private _opts;
    constructor(opts: IndexerOptions);
    transactions(query?: any): Promise<Transaction[]>;
    transaction(hash: string): Promise<Transaction>;
    transactionCount(): Promise<TxCount>;
    latestBlock(): Promise<BlockData>;
    block(height: string): Promise<BlockData>;
    chain(): Promise<any>;
    blockEvents(query?: any): Promise<BlockEvent[]>;
    blocks(query?: any): Promise<Block[]>;
}
export {};
