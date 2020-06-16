import Query from './query';
import { ITransportOptions } from './transport';
export declare class Mele {
    private _options;
    private _transport;
    private _query;
    constructor(opt: ITransportOptions);
    readonly query: Query;
}
