import Broadcast from './broadcast'
import { TransactionEvents } from './events'

export class Transaction {
    private _msgs: any[]
    private _sendTransaction: Function
    private _calculateFees: Function

    constructor(msgs: any[], sendTransaction: Function, calculateFees: Function) {
        this._msgs = msgs

        this._sendTransaction = sendTransaction
        this._calculateFees = calculateFees
    }

    sendTransaction(): TransactionEvents {
        return this._sendTransaction(this._msgs)
    }

    async calculateFees(): Promise<number> {
        return this._calculateFees(this._msgs)
    }
}

export class TransactionApi {
    private _broadcast: Broadcast

    constructor(broadcast: Broadcast) {
        this._broadcast = broadcast
    }

    get broadcast(): Broadcast {
        return this._broadcast
    }
}
