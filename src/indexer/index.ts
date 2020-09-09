import IndexerApi from './api'
import { convertValidatorPubKey } from '../utils'

interface IndexerOptions {
    endpoint: string
}

interface TransactionMsg {
    action: string
    data: object
    module: string
    sender: string
    meta: any[]
    addresses: string[]
    log: string
}

interface Transaction {
    _id: string
    hash: string
    height: string
    msgs: TransactionMsg[]
    log: string
    info: string
    code: string
    codespace: string
    gas_wanted: string
    gas_used: string
    timestamp: string
    valid: boolean
}

interface Block {
    height: number
    hash: string
    transNum: string
    time: Date
    lastBlockHash: string
    proposerAddress: string
    precommitsCount: number
    validatorsCount: number
}

interface BlockEvent {
    height: number
    action: string
    data: object
    addresses: string[]
    eventType: string
}

interface BlockData {
    block: Block
    txs: Transaction[]
    events: BlockEvent[]
}

interface TxCount {
    count: number
}

interface ProposalVotes {
    proposalId: string
    option: string
    timestamp: string
    voter: string
}

interface ValidatorUptime {
    uptime: number
    address: string
    total_blocks_count: number
    missed_blocks_count: number
}

interface History {
    data: any
    address: string
    module: string
    name: string
    timestamp: Date
}

export default class Indexer {
    private _opts: IndexerOptions

    constructor(opts: IndexerOptions) {
        this._opts = opts
    }

    async transactions(query: any = {}): Promise<Transaction[]> {
        return IndexerApi.get(this._opts.endpoint, 'txs', query)
    }

    async transaction(hash: string): Promise<Transaction> {
        return IndexerApi.get(this._opts.endpoint, `tx/${hash}`)
    }

    async transactionCount(): Promise<TxCount> {
        return IndexerApi.get(this._opts.endpoint, `txs/count`)
    }

    async latestBlock(): Promise<BlockData> {
        return IndexerApi.get(this._opts.endpoint, 'block/latest')
    }

    async block(height: string): Promise<BlockData> {
        return IndexerApi.get(this._opts.endpoint, `block/${height}`)
    }

    async chain(): Promise<any> {
        return IndexerApi.get(this._opts.endpoint, 'chain/info')
    }

    async blockEvents(query: any = {}): Promise<BlockEvent[]> {
        return IndexerApi.get(this._opts.endpoint, 'block_events', query)
    }

    async blocks(query: any = {}): Promise<Block[]> {
        return IndexerApi.get(this._opts.endpoint, 'blocks', query)
    }

    async proposalVotes(id: string): Promise<ProposalVotes[]> {
        return IndexerApi.get(this._opts.endpoint, `proposal_votes/${id}`)
    }

    async validatorUptime(pubkey: string): Promise<ValidatorUptime> {
        let valAddress = convertValidatorPubKey(pubkey)

        return IndexerApi.get(this._opts.endpoint, `validator/${valAddress}`)
    }

    async history(query: any = {}): Promise<History[]> {
        return IndexerApi.get(this._opts.endpoint, 'history', query)
    }
}
