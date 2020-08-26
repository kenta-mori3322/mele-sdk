import Broadcast from './broadcast';
import { TransactionEvents } from './events';
export declare class Transaction {
    private _msgs;
    private _sendTransaction;
    constructor(msgs: any[], sendTransaction: Function);
    sendTransaction(): TransactionEvents;
}
export declare class TransactionApi {
    private _broadcast;
    constructor(broadcast: Broadcast);
    get broadcast(): Broadcast;
}
