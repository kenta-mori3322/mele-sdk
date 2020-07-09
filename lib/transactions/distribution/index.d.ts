import { Transaction, TransactionApi } from '../index';
export declare const Msgs: {
    makeWithdrawDelegationRewardMsg(delegator: string, validator: string): any[];
    makeWithdrawValidatorCommissionMsg(validator: string): any[];
    makeModifyWithdrawAddressMsg(delegator: string, withdrawAddress: string): any[];
};
export default class Distribution extends TransactionApi {
    withdrawDelegationReward(validator: string): Transaction;
    withdrawValidatorCommission(validator: string): Transaction;
    modifyWithdrawAddress(withdrawAddress: string): Transaction;
}
