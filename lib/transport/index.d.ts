import { ResultBlock, ResultStatus } from './rpc';
export interface ITransport {
    block(height: number): Promise<ResultBlock>;
    status(): Promise<ResultStatus>;
}
export interface ITransportOptions {
    nodeUrl: string;
    chainId?: string;
    timeout?: number;
    maxAttempts?: number;
    txConfirmInterval?: number;
    txConfirmMaxAttempts?: number;
}
export declare class Transport implements ITransport {
    private _rpc;
    constructor(opt: ITransportOptions);
    block(height: number): Promise<ResultBlock>;
    status(): Promise<ResultStatus>;
}
