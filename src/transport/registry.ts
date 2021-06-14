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

import {
    MsgSubmitProposal,
    MsgVote,
    MsgDeposit,
} from "./codec/cosmos/gov/v1beta1/tx";

import {
    MsgSubmitExecution,
} from "./codec/mele/control/v1beta1/tx";

import {
    TextProposal,
} from "./codec/cosmos/gov/v1beta1/gov";

import {
    CommunityPoolSpendProposal,
    BurnedPoolSpendProposal
} from "./codec/cosmos/distribution/v1beta1/distribution"

import {
    BurnTreasurySupplyProposal,
    MintTreasurySupplyProposal,
} from "./codec/mele/treasury/v1beta1/treasury"

import {
    ParameterChangeProposal,
} from "./codec/cosmos/params/v1beta1/params"

import {
    SoftwareUpgradeProposal,
    CancelSoftwareUpgradeProposal,
    Plan,
} from "./codec/cosmos/upgrade/v1beta1/upgrade"

import {
    AddFeeExcludedMessageProposal,
    RemoveFeeExcludedMessageProposal,
} from "./codec/mele/fee/v1beta1/fee"

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
    ["/mele.gov.v1beta1.TextProposal", TextProposal],
    ["/mele.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposal],
    ["/mele.gov.v1beta1.MsgVote", MsgVote],
    ["/mele.gov.v1beta1.MsgDeposit", MsgDeposit],
    ["/mele.control.v1beta1.MsgSubmitExecution", MsgSubmitExecution],
    ["/mele.distribution.v1beta1.CommunityPoolSpendProposal", CommunityPoolSpendProposal],
    ["/mele.distribution.v1beta1.BurnedPoolSpendProposal", BurnedPoolSpendProposal],
    ["/mele.treasury.v1beta1.BurnTreasurySupplyProposal", BurnTreasurySupplyProposal],
    ["/mele.treasury.v1beta1.MintTreasurySupplyProposal", MintTreasurySupplyProposal],
    ["/cosmos.params.v1beta1.ParameterChangeProposal", ParameterChangeProposal],
    ["/mele.upgrade.v1beta1.SoftwareUpgradeProposal", SoftwareUpgradeProposal],
    ["/mele.upgrade.v1beta1.CancelSoftwareUpgradeProposal", CancelSoftwareUpgradeProposal],
    ["/mele.upgrade.v1beta1.Plan", Plan],
    ["/mele.fee.v1beta1.AddFeeExcludedMessageProposal", AddFeeExcludedMessageProposal],
    ["/mele.fee.v1beta1.RemoveFeeExcludedMessageProposal", RemoveFeeExcludedMessageProposal],
]

function createDefaultRegistry(): Registry {
    return new Registry(defaultRegistryTypes)
}

const registry = createDefaultRegistry()

export const getRegistry = () => {
    return registry
}
