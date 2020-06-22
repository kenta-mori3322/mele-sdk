import Query from '../query';
import { Signer } from '../signer';
import { ITransport } from '../transport';
import { TransactionEvents } from './events';
interface Options {
    txConfirmInterval: number;
    txConfirmTries: number;
    chainId: string;
    maxFeeInCoin: number;
}
export default class Broadcast {
    private _transport;
    private _query;
    private _options;
    private _signer;
    constructor(transport: ITransport, query: Query, signer: Signer, opts: Options);
    readonly signer: Signer;
    safeBroadcast(signers: string[], makeTxFunc: Function): TransactionEvents;
    sendTransaction(msgs: any[]): TransactionEvents;
}
export {};
