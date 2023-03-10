import { Coin } from '../../transport/codec/cosmos/base/v1beta1/coin'
import { Transaction, TransactionApi } from '../index'

/**
 * Distribution
 * @namespace cosmos.distribution
 * @type {object}
 * @memberof mele
 */

export default class Distribution extends TransactionApi {
    /**
     * cosmos.distribution.**withdrawDelegationReward**
     *
     * Withdraw delegator reward from given validator.
     *
     * @param {string} validator - Validator address
     *
     * @memberof cosmos.distribution
     * @inner
     *
     * @name WithdrawDelegationReward
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    withdrawDelegationReward(validator: string): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
                value: {
                    delegatorAddress: senderAddress,
                    validatorAddress: validator,
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
    }

    /**
     * cosmos.distribution.**withdrawValidatorCommission**
     *
     * Withdraw validator commission.
     *
     * @param {string} validator - Validator address
     *
     * @memberof cosmos.distribution
     * @inner
     *
     * @name WithdrawValidatorCommission
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    withdrawValidatorCommission(validator: string): Transaction {
        const msgs = [
            {
                typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
                value: {
                    validatorAddress: validator,
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
    }

    /**
     * cosmos.distribution.**modifyWithdrawAddress**
     *
     * Modify delegator's withdraw address.
     *
     * @param {string} withdrawAddress - Withdraw address
     *
     * @memberof cosmos.distribution
     * @inner
     *
     * @name ModifyWithdrawAddress
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    modifyWithdrawAddress(withdrawAddress: string): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
                value: {
                    delegatorAddress: senderAddress,
                    withdrawAddress: withdrawAddress,
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
    }

    /**
     * cosmos.distribution.**fundCommunityPool**
     *
     * Send tokens to the community pool.
     *
     * @param {string} amount - Amount to send
     *
     * @memberof cosmos.distribution
     * @inner
     *
     * @name FundCommunityPool
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    fundCommunityPool(amount: Coin[]): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
                value: {
                    amount: amount,
                    depositor: senderAddress,
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
    }
}
