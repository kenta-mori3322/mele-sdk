import * as Types from '../../common';
import { ITransport } from '../../transport';
export default class SlashingQuery {
    private _transport;
    constructor(transport: ITransport);
    getParameters(): Promise<Types.SlashingParams>;
    getSigningInfo(consAddress: string): Promise<Types.SigningInfo>;
    getSigningInfos(): Promise<Types.SigningInfo[]>;
}
