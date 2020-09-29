import { Transaction, TransactionApi } from '../index';
import * as Types from '../../common';
export declare const Msgs: {
    makeAddOperatorMsg(sender: string, operator: string): any[];
    makeRemoveOperatorMsg(sender: string, operator: string): any[];
    makeDisburseMsg(operator: string, recipient: string, amount: Types.SDKCoin[], reference: string): any[];
    makeApproveDisbursementMsg(mananger: string, recipient: string, scheduled_for: string): any[];
    makeCancelDisbursementMsg(mananger: string, recipient: string, scheduled_for: string): any[];
    makeBurnMsg(operator: string, amount: Types.SDKCoin[]): any[];
    makeApproveBurnMsg(mananger: string, scheduled_for: string): any[];
    makeCancelBurnMsg(mananger: string, scheduled_for: string): any[];
};
export default class Treasury extends TransactionApi {
    addOperator(operator: string): Transaction;
    removeOperator(operator: string): Transaction;
    disburse(recipient: string, amount: Types.SDKCoin[], reference: string): Transaction;
    approveDisbursement(recipient: string, scheduled_for: string): Transaction;
    cancelDisbursement(recipient: string, scheduled_for: string): Transaction;
    burn(amount: Types.SDKCoin[]): Transaction;
    approveBurn(scheduled_for: string): Transaction;
    cancelBurn(scheduled_for: string): Transaction;
}
