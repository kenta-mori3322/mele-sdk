import * as Types from '../../common';
import { ITransport } from '../../transport';
export default class ControlQuery {
    private _transport;
    constructor(transport: ITransport);
    getParameters(): Promise<Types.ControlParams>;
    getExecutions(): Promise<Types.Execution[]>;
    getExecution(id: string): Promise<Types.Execution>;
}
