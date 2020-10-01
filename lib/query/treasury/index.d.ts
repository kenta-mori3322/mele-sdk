import * as Types from '../../common';
import { ITransport } from '../../transport';
export default class TreasuryQuery {
    private _transport;
    constructor(transport: ITransport);
    getParameters(): Promise<Types.TreasuryParams>;
    getTreasury(): Promise<Types.Treasury>;
    getOperators(): Promise<string[]>;
    getDisbursements(): Promise<Types.Disbursement[]>;
    getBurns(): Promise<Types.Burn[]>;
}
