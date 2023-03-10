import { GeneratedType, Registry } from '@cosmjs/proto-signing'

import { MsgMultiSend } from './codec/cosmos/bank/v1beta1/tx'
import {
    MsgFundCommunityPool,
    MsgSetWithdrawAddress,
    MsgWithdrawDelegatorReward,
    MsgWithdrawValidatorCommission,
} from './codec/cosmos/distribution/v1beta1/tx'
import {
    MsgBeginRedelegate,
    MsgCreateValidator,
    MsgDelegate,
    MsgEditValidator,
    MsgUndelegate,
} from './codec/cosmos/staking/v1beta1/tx'
import {
    MsgAddOperator,
    MsgApproveBurn,
    MsgApproveDisbursement,
    MsgBurn,
    MsgCancelBurn,
    MsgCancelDisbursement,
    MsgDisburse,
    MsgRemoveOperator,
} from './codec/mele/treasury/v1beta1/tx'

import { MsgDeposit, MsgSubmitProposal, MsgVote } from './codec/cosmos/gov/v1beta1/tx'

import { MsgSubmitExecution } from './codec/mele/control/v1beta1/tx'

import { TextProposal } from './codec/cosmos/gov/v1beta1/gov'

import {
    BurnedPoolSpendProposal,
    CommunityPoolSpendProposal,
} from './codec/cosmos/distribution/v1beta1/distribution'

import {
    BurnTreasurySupplyProposal,
    MintTreasurySupplyProposal,
} from './codec/mele/treasury/v1beta1/treasury'

import { ParameterChangeProposal } from './codec/cosmos/params/v1beta1/params'

import {
    CancelSoftwareUpgradeProposal,
    Plan,
    SoftwareUpgradeProposal,
} from './codec/cosmos/upgrade/v1beta1/upgrade'

import {
    AddFeeExcludedMessageProposal,
    RemoveFeeExcludedMessageProposal,
} from './codec/mele/fee/v1beta1/fee'

import {
    MsgCreatePool,
    MsgDepositWithinBatch,
    MsgSwapWithinBatch,
    MsgWithdrawWithinBatch,
} from './codec/mele/liquidity/v1beta1/tx'

export const defaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ['/cosmos.bank.v1beta1.MsgMultiSend', MsgMultiSend],
    ['/cosmos.distribution.v1beta1.MsgFundCommunityPool', MsgFundCommunityPool],
    ['/cosmos.distribution.v1beta1.MsgSetWithdrawAddress', MsgSetWithdrawAddress],
    ['/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward', MsgWithdrawDelegatorReward],
    ['/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission', MsgWithdrawValidatorCommission],
    ['/cosmos.staking.v1beta1.MsgBeginRedelegate', MsgBeginRedelegate],
    ['/cosmos.staking.v1beta1.MsgCreateValidator', MsgCreateValidator],
    ['/cosmos.staking.v1beta1.MsgDelegate', MsgDelegate],
    ['/cosmos.staking.v1beta1.MsgEditValidator', MsgEditValidator],
    ['/cosmos.staking.v1beta1.MsgUndelegate', MsgUndelegate],
    ['/mele.treasury.v1beta1.MsgAddOperator', MsgAddOperator],
    ['/mele.treasury.v1beta1.MsgRemoveOperator', MsgRemoveOperator],
    ['/mele.treasury.v1beta1.MsgDisburse', MsgDisburse],
    ['/mele.treasury.v1beta1.MsgCancelDisbursement', MsgCancelDisbursement],
    ['/mele.treasury.v1beta1.MsgApproveDisbursement', MsgApproveDisbursement],
    ['/mele.treasury.v1beta1.MsgBurn', MsgBurn],
    ['/mele.treasury.v1beta1.MsgCancelBurn', MsgCancelBurn],
    ['/mele.treasury.v1beta1.MsgApproveBurn', MsgApproveBurn],
    ['/cosmos.gov.v1beta1.TextProposal', TextProposal],
    ['/cosmos.gov.v1beta1.MsgSubmitProposal', MsgSubmitProposal],
    ['/cosmos.gov.v1beta1.MsgVote', MsgVote],
    ['/cosmos.gov.v1beta1.MsgDeposit', MsgDeposit],
    ['/mele.control.v1beta1.MsgSubmitExecution', MsgSubmitExecution],
    ['/cosmos.distribution.v1beta1.CommunityPoolSpendProposal', CommunityPoolSpendProposal],
    ['/cosmos.distribution.v1beta1.BurnedPoolSpendProposal', BurnedPoolSpendProposal],
    ['/mele.treasury.v1beta1.BurnTreasurySupplyProposal', BurnTreasurySupplyProposal],
    ['/mele.treasury.v1beta1.MintTreasurySupplyProposal', MintTreasurySupplyProposal],
    ['/cosmos.params.v1beta1.ParameterChangeProposal', ParameterChangeProposal],
    ['/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal', SoftwareUpgradeProposal],
    ['/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal', CancelSoftwareUpgradeProposal],
    ['/cosmos.upgrade.v1beta1.Plan', Plan],
    ['/mele.fee.v1beta1.AddFeeExcludedMessageProposal', AddFeeExcludedMessageProposal],
    ['/mele.fee.v1beta1.RemoveFeeExcludedMessageProposal', RemoveFeeExcludedMessageProposal],
    ['/mele.liquidity.v1beta1.MsgCreatePool', MsgCreatePool],
    ['/mele.liquidity.v1beta1.MsgDepositWithinBatch', MsgDepositWithinBatch],
    ['/mele.liquidity.v1beta1.MsgWithdrawWithinBatch', MsgWithdrawWithinBatch],
    ['/mele.liquidity.v1beta1.MsgSwapWithinBatch', MsgSwapWithinBatch],
]

function createDefaultRegistry(): Registry {
    return new Registry(defaultRegistryTypes)
}

const registry = createDefaultRegistry()

export const getRegistry = () => {
    return registry
}
