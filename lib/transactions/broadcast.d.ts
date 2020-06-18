import { TransactionEvents } from './events';
import Query from '../query';
import { ITransport } from '../transport';
export declare function safeBroadcast(signers: string[], query: Query, transport: ITransport, options: any, makeTxFunc: Function): TransactionEvents;
