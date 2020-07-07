import { Transaction, TransactionApi } from '../index';
import * as Types from '../../common';
export declare const Msgs: {
    makeDelegateMsg(delegator: string, validator: string, amount: Types.SDKCoin): any[];
    makeUndelegateMsg(delegator: string, validator: string, amount: Types.SDKCoin): any[];
    makeBeginRedelegateMsg(delegator: string, srcValidator: string, dstValidator: string, amount: Types.SDKCoin): any[];
    makeCreateValidatorMsg(description: Types.Description, commission: Types.Commission, minSelfDelegation: string, delegator: string, validator: string, pubkey: string, value: Types.SDKCoin): any[];
    makeEditValidatorMsg(description: Types.Description, address: string, commissionRate: string, minSelfDelegation: string): any[];
};
export default class Staking extends TransactionApi {
    createValidator(description: Types.Description, commission: Types.Commission, minSelfDelegation: string, delegator: string, validator: string, pubkey: string, value: Types.SDKCoin): Transaction;
    editValidator(description: Types.Description, address: string, commissionRate: string, minSelfDelegation: string): Transaction;
    delegate(validator: string, amount: Types.SDKCoin): Transaction;
    undelegate(validator: string, amount: Types.SDKCoin): Transaction;
    beginRedelegate(srcValidator: string, dstValidator: string, amount: Types.SDKCoin): Transaction;
}
