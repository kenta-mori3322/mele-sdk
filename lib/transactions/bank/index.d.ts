import { TransactionApi, Transaction } from '../index';
import * as Types from '../../common';
export declare const Msgs: {
    makeTransferMsg(fromAddress: string, toAddress: string, amount: Types.SDKCoin[]): any[];
};
export default class Bank extends TransactionApi {
    transfer(toAddress: string, amount: Types.SDKCoin[]): Transaction;
}
