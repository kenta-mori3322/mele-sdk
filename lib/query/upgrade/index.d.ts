import * as Types from '../../common';
import { ITransport } from '../../transport';
export default class UpgradeQuery {
    private _transport;
    constructor(transport: ITransport);
    getCurrent(): Promise<Types.UpgradePlan>;
    getApplied(name: string): Promise<number>;
}
