import { Transaction, TransactionApi } from '../index';
export declare const Msgs: {
    makeUnjailMsg(address: string): any[];
};
export default class Slashing extends TransactionApi {
    unjail(address: string): Transaction;
}
