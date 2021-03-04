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
interface ProposalVotes {
    proposalId: string;
    option: string;
    timestamp: string;
    voter: string;
}
interface ValidatorUptime {
    uptime: number;
    address: string;
    total_blocks_count: number;
    missed_blocks_count: number;
}
interface History {
    data: any;
    address: string;
    module: string;
    name: string;
    timestamp: Date;
}
interface Burn {
    invoker: string;
    amount: string;
    timestamp: string;
}
interface Disbursement {
    invoker: string;
    recipient: string;
    amount: string;
    reference: string;
    timestamp: string;
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
    proposalVotes(id: string): Promise<ProposalVotes[]>;
    validatorUptime(pubkey: string): Promise<ValidatorUptime>;
    history(query?: any): Promise<History[]>;
    disbursements(query?: any): Promise<Disbursement[]>;
    burns(query?: any): Promise<Burn[]>;
}
export {};
