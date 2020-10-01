import * as Types from '../../common';
import { ITransport } from '../../transport';
export default class SupplyQuery {
    private _transport;
    constructor(transport: ITransport);
    getTotalSupply(): Promise<Types.SDKCoin[]>;
}
