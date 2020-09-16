import { Coin } from '../../transport/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    WithdrawDelegationRewardMsgType: 'cosmos-sdk/MsgWithdrawDelegationReward',
    WithdrawValidatorCommissionMsgType: 'cosmos-sdk/MsgWithdrawValidatorCommission',
    ModifyWithdrawAddressMsgType: 'cosmos-sdk/MsgModifyWithdrawAddress',
    FundCommunityPoolMsgType: 'cosmos-sdk/MsgFundCommunityPool',
}

export const Msgs = {
    makeWithdrawDelegationRewardMsg(delegator: string, validator: string): any[] {
        const msg = new Codec[_types.WithdrawDelegationRewardMsgType](delegator, validator)

        return [msg]
    },
    makeWithdrawValidatorCommissionMsg(validator: string): any[] {
        const msg = new Codec[_types.WithdrawValidatorCommissionMsgType](validator)

        return [msg]
    },
    makeModifyWithdrawAddressMsg(delegator: string, withdrawAddress: string): any[] {
        const msg = new Codec[_types.ModifyWithdrawAddressMsgType](delegator, withdrawAddress)

        return [msg]
    },
    makeFundCommunityPool(amount: Types.SDKCoin[], depositor: string): any[] {
        const msg = new Codec[_types.FundCommunityPoolMsgType](
            amount.map(am => new Coin(am.denom, am.amount)),
            depositor
        )

        return [msg]
    },
}

/**
 * Distribution
 * @namespace mele.distribution
 * @type {object}
 * @memberof mele
 */

export default class Distribution extends TransactionApi {
    /**
     * mele.distribution.**withdrawDelegationReward**
     *
     * Withdraw delegator reward from given validator.
     *
     * @param {string} validator - Validator address
     *
     * @memberof mele.distribution
     * @inner
     *
     * @name WithdrawDelegationReward
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    withdrawDelegationReward(validator: string): Transaction {
        const msgs = Msgs.makeWithdrawDelegationRewardMsg(
            this.broadcast.signer.getAddress(),
            validator
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.distribution.**withdrawValidatorCommission**
     *
     * Withdraw validator commission.
     *
     * @param {string} validator - Validator address
     *
     * @memberof mele.distribution
     * @inner
     *
     * @name WithdrawValidatorCommission
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    withdrawValidatorCommission(validator: string): Transaction {
        const msgs = Msgs.makeWithdrawValidatorCommissionMsg(validator)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.distribution.**modifyWithdrawAddress**
     *
     * Modify delegator's withdraw address.
     *
     * @param {string} withdrawAddress - Withdraw address
     *
     * @memberof mele.distribution
     * @inner
     *
     * @name ModifyWithdrawAddress
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    modifyWithdrawAddress(withdrawAddress: string): Transaction {
        const msgs = Msgs.makeModifyWithdrawAddressMsg(
            this.broadcast.signer.getAddress(),
            withdrawAddress
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.distribution.**fundCommunityPool**
     *
     * Send tokens to the community pool.
     *
     * @param {string} amount - Amount to send
     *
     * @memberof mele.distribution
     * @inner
     *
     * @name FundCommunityPool
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    fundCommunityPool(amount: Types.SDKCoin[]): Transaction {
        const msgs = Msgs.makeFundCommunityPool(amount, this.broadcast.signer.getAddress())

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
