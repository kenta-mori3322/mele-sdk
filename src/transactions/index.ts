import Broadcast from './broadcast'
import { TransactionEvents } from './events'

export class Transaction {
    private _msgs: any[]
    private _sendTransaction: Function

    constructor(msgs: any[], sendTransaction: Function) {
        this._msgs = msgs

        this._sendTransaction = sendTransaction
    }

    sendTransaction(): TransactionEvents {
        return this._sendTransaction(this._msgs)
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
