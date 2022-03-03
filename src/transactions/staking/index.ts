import { Coin } from '../../transport/codec/cosmos/base/v1beta1/coin'
import { CommissionRates, Description } from '../../transport/codec/cosmos/staking/v1beta1/staking'
import { Transaction, TransactionApi } from '../index'

/**
 * Staking
 * @namespace cosmos.staking
 * @type {object}
 * @memberof mele
 */

export default class Staking extends TransactionApi {
    /**
     * cosmos.staking.**createValidator**
     *
     * Create a new validator.
     *
     * @param {Description} description - Validator description
     * @param {Commission} commission - Validator commission information
     * @param {string} minSelfDelegation - Minimum self delegation
     * @param {string} validator - Validator address
     * @param {string} pubkey - Validator public key
     * @param {SDKCoin} value - Amount of tokens to delegate
     *
     * @memberof cosmos.staking
     * @inner
     *
     * @name CreateValidator
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    createValidator(
        description: Description,
        commission: CommissionRates,
        minSelfDelegation: string,
        validator: string,
        pubkey: string,
        value: Coin
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/cosmos.staking.v1beta1.MsgCreateValidator',
                value: {
                    description: description,
                    commission: commission,
                    minSelfDelegation: minSelfDelegation,
                    delegatorAddress: senderAddress,
                    validatorAddress: validator,
                    pubkey: pubkey,
                    value: value,
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
     * cosmos.staking.**editValidator**
     *
     * Edit validator description, commission rate and minimum self delegation.
     *
     * @param {Description} description - Validator description
     * @param {string} address - Validator address
     * @param {string} commissionRate - New commission rate
     * @param {string} minSelfDelegation - New minimum self delegation
     *
     * @memberof cosmos.staking
     * @inner
     *
     * @name EditValidator
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    editValidator(
        description: Description,
        address: string,
        commissionRate: string,
        minSelfDelegation: string
    ): Transaction {
        const msgs = [
            {
                typeUrl: '/cosmos.staking.v1beta1.MsgEditValidator',
                value: {
                    description: description,
                    validatorAddress: address,
                    commissionRate: commissionRate,
                    minSelfDelegation: minSelfDelegation,
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
     * cosmos.staking.**delegate**
     *
     * Delegate an arbitrary amount of tokens to the receiving validator.
     *
     * @param {string} validator - Receiving validator address
     * @param {SDKCoin} amount - Amount of tokens to delegate
     *
     * @memberof cosmos.staking
     * @inner
     *
     * @name Delegate
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    delegate(validator: string, amount: Coin): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
                value: {
                    delegatorAddress: senderAddress,
                    validatorAddress: validator,
                    amount: amount,
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
     * cosmos.staking.**undelegate**
     *
     * Undelegate an arbitrary amount of tokens from the validator.
     *
     * @param {string} validator - Validator address
     * @param {SDKCoin} amount - Amount of tokens to undelegate
     *
     * @memberof cosmos.staking
     * @inner
     *
     * @name Undelegate
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    undelegate(validator: string, amount: Coin): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
                value: {
                    delegatorAddress: senderAddress,
                    validatorAddress: validator,
                    amount: amount,
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
     * cosmos.staking.**beginRedelegate**
     *
     * Redelegate an arbitrary amount of tokens to the one validator to another validator.
     *
     * @param {string} srcValidator - Source validator address
     * @param {string} dstValidator - Destination validator address
     * @param {SDKCoin} amount - Amount of tokens to redelegate
     *
     * @memberof cosmos.staking
     * @inner
     *
     * @name BeginRedelegate
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    beginRedelegate(srcValidator: string, dstValidator: string, amount: Coin): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
                value: {
                    delegatorAddress: senderAddress,
                    validatorSrcAddress: srcValidator,
                    validatorDstAddress: dstValidator,
                    amount: amount,
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
