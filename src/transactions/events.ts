import { EventEmitter } from 'events'

import { ResultBroadcastTx, ResultTx } from '../transport/rpc'

import { BroadcastError } from './errors'

export declare interface TransactionEvents {
    on(event: 'hash', listener: (hash: string) => void): this
    on(event: 'receipt', listener: (receipt: ResultBroadcastTx) => void): this
    on(event: 'confirmation', listener: (tx: ResultTx) => void): this
    on(event: 'error', listener: (error: BroadcastError) => void): this

    on(event: string, listener: Function): this
}

export class TransactionEvents extends EventEmitter {
    emitHash(hash: string) {
        this.emit('hash', hash)
    }

    emitReceipt(receipt: ResultBroadcastTx) {
        this.emit('receipt', receipt)
    }

    emitConfirmation(tx: ResultTx) {
        this.emit('confirmation', tx)
    }

    emitError(error: BroadcastError) {
        this.emit('error', error)
    }
}
