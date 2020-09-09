import * as Types from '../../common';
import { ITransport } from '../../transport';
export default class MintQuery {
    private _transport;
    constructor(transport: ITransport);
    getParameters(): Promise<Types.MintParams>;
    getInflation(): Promise<number>;
    getAnnualProvisions(): Promise<number>;
}
