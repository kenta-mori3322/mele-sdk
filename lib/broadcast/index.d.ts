import * as Types from '../common';
import { ITransport } from '../transport';
export default class Broadcast {
    private _transport;
    constructor(transport: ITransport);
    makeTransferMsg(fromAddress: string, toAddress: string, amount: Types.SDKCoin[]): any[];
}
