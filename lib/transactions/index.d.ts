import { TransactionEvents } from './events';
export declare class Transaction {
    private _msgs;
    private _sendTransaction;
    constructor(msgs: any[], sendTransaction: Function);
    sendTransaction(): TransactionEvents;
}
