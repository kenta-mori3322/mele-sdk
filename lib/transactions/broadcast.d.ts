import Query from '../query';
import { ITransport } from '../transport';
import { TransactionEvents } from './events';
interface Options {
    txConfirmInterval: number;
    txConfirmTries: number;
}
export default class Broadcast {
    private _transport;
    private _query;
    private _options;
    constructor(transport: ITransport, query: Query, opts: Options);
    safeBroadcast(signers: string[], makeTxFunc: Function): TransactionEvents;
}
export {};
