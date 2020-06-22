import { TransactionEvents } from './events';
import Broadcast from './broadcast';
export declare class Transaction {
    private _msgs;
    private _sendTransaction;
    constructor(msgs: any[], sendTransaction: Function);
    sendTransaction(): TransactionEvents;
}
export declare class TransactionApi {
    private _broadcast;
    constructor(broadcast: Broadcast);
    readonly broadcast: Broadcast;
}
