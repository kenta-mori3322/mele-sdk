import Query from './query';
import * as Types from './common';
import { ITransportOptions } from './transport';
import { ResultBroadcastTx } from './transport/rpc';
export declare class Mele {
    private _options;
    private _transport;
    private _query;
    private _broadcast;
    constructor(opt: ITransportOptions);
    readonly query: Query;
    transfer(fromAddress: string, toAddress: string, amount: Types.SDKCoin[], privKeyHex: string): Promise<ResultBroadcastTx>;
    _safeBroadcast(signers: string[], makeTxFunc: Function): Promise<ResultBroadcastTx>;
}
