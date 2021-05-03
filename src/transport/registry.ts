import { GeneratedType, Registry } from '@cosmjs/proto-signing'

import { MsgMultiSend } from './codec/cosmos/bank/v1beta1/tx'
import {
    MsgFundCommunityPool,
    MsgSetWithdrawAddress,
    MsgWithdrawDelegatorReward,
    MsgWithdrawValidatorCommission,
  } from "./codec/cosmos/distribution/v1beta1/tx";
import {
    MsgBeginRedelegate,
    MsgCreateValidator,
    MsgDelegate,
    MsgEditValidator,
    MsgUndelegate,
} from "./codec/cosmos/staking/v1beta1/tx";

import {
  MsgAddOperator,
  MsgRemoveOperator,
  MsgDisburse,
  MsgCancelDisbursement,
  MsgApproveDisbursement,
  MsgBurn,
  MsgCancelBurn,
  MsgApproveBurn,
} from "./codec/mele/treasury/v1beta1/tx";

export const defaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ['/cosmos.bank.v1beta1.MsgMultiSend', MsgMultiSend],
    ["/mele.distribution.v1beta1.MsgFundCommunityPool", MsgFundCommunityPool],
    ["/mele.distribution.v1beta1.MsgSetWithdrawAddress", MsgSetWithdrawAddress],
    ["/mele.distribution.v1beta1.MsgWithdrawDelegatorReward", MsgWithdrawDelegatorReward],
    ["/mele.distribution.v1beta1.MsgWithdrawValidatorCommission", MsgWithdrawValidatorCommission],
    ["/mele.staking.v1beta1.MsgBeginRedelegate", MsgBeginRedelegate],
    ["/mele.staking.v1beta1.MsgCreateValidator", MsgCreateValidator],
    ["/mele.staking.v1beta1.MsgDelegate", MsgDelegate],
    ["/mele.staking.v1beta1.MsgEditValidator", MsgEditValidator],
    ["/mele.staking.v1beta1.MsgUndelegate", MsgUndelegate],
    ["/mele.treasury.v1beta1.MsgAddOperator", MsgAddOperator],
    ["/mele.treasury.v1beta1.MsgRemoveOperator", MsgRemoveOperator],
    ["/mele.treasury.v1beta1.MsgDisburse", MsgDisburse],
    ["/mele.treasury.v1beta1.MsgCancelDisbursement", MsgCancelDisbursement],
    ["/mele.treasury.v1beta1.MsgApproveDisbursement", MsgApproveDisbursement],
    ["/mele.treasury.v1beta1.MsgBurn", MsgBurn],
    ["/mele.treasury.v1beta1.MsgCancelBurn", MsgCancelBurn],
    ["/mele.treasury.v1beta1.MsgApproveBurn", MsgApproveBurn],
]

function createDefaultRegistry(): Registry {
    return new Registry(defaultRegistryTypes)
}

const registry = createDefaultRegistry()

export const getRegistry = () => {
    return registry
}
