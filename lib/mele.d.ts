import Query from './query';
import { Signer } from './signer';
import * as Types from './common';
import { ITransportOptions } from './transport';
import { ResultBroadcastTx } from './transport/rpc';
export declare class Mele {
    private _options;
    private _transport;
    private _query;
    private _broadcast;
    private _signer;
    private _chainId;
    private _maxFeeInCoin;
    constructor(opt: ITransportOptions);
    readonly query: Query;
    readonly signer: Signer;
    transfer(toAddress: string, amount: Types.SDKCoin[]): Promise<ResultBroadcastTx>;
    sendTransaction(msgs: any[]): Promise<ResultBroadcastTx>;
    _safeBroadcast(signers: string[], makeTxFunc: Function): Promise<ResultBroadcastTx>;
}
