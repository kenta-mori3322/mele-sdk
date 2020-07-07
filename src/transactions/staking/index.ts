import { Coin } from '../../transport/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    CreateValidatorMsgType: 'cosmos-sdk/MsgCreateValidator',
    EditValidatorMsgType: 'cosmos-sdk/MsgEditValidator',
    DelegateMsgType: 'cosmos-sdk/MsgDelegate',
    UndelegateMsgType: 'cosmos-sdk/MsgUndelegate',
    BeginRedelegateMsgType: 'cosmos-sdk/MsgBeginRedelegate',

    Description: 'Description',
    Commission: 'Commission',
}

export const Msgs = {
    makeDelegateMsg(delegator: string, validator: string, amount: Types.SDKCoin): any[] {
        const msg = new Codec[_types.DelegateMsgType](
            delegator,
            validator,
            new Coin(amount.denom, amount.amount)
        )

        return [msg]
    },
    makeUndelegateMsg(delegator: string, validator: string, amount: Types.SDKCoin): any[] {
        const msg = new Codec[_types.UndelegateMsgType](
            delegator,
            validator,
            new Coin(amount.denom, amount.amount)
        )

        return [msg]
    },
    makeBeginRedelegateMsg(
        delegator: string,
        srcValidator: string,
        dstValidator: string,
        amount: Types.SDKCoin
    ): any[] {
        const msg = new Codec[_types.BeginRedelegateMsgType](
            delegator,
            srcValidator,
            dstValidator,
            new Coin(amount.denom, amount.amount)
        )

        return [msg]
    },
    makeCreateValidatorMsg(
        description: Types.Description,
        commission: Types.Commission,
        minSelfDelegation: string,
        delegator: string,
        validator: string,
        pubkey: string,
        value: Types.SDKCoin
    ): any[] {
        let desc = new Codec[_types.Description](
            description.moniker,
            description.identity,
            description.website,
            description.securityContact,
            description.details
        )

        let comm = new Codec[_types.Commission](
            commission.rate,
            commission.maxRate,
            commission.maxChangeRate
        )

        const msg = new Codec[_types.CreateValidatorMsgType](
            desc,
            comm,
            minSelfDelegation,
            delegator,
            validator,
            pubkey,
            new Coin(value.denom, value.amount)
        )

        return [msg]
    },
    makeEditValidatorMsg(
        description: Types.Description,
        address: string,
        commissionRate: string,
        minSelfDelegation: string
    ): any[] {
        let desc = new Codec[_types.Description](
            description.moniker,
            description.identity,
            description.website,
            description.securityContact,
            description.details
        )

        const msg = new Codec[_types.EditValidatorMsgType](
            desc,
            address,
            commissionRate,
            minSelfDelegation
        )

        return [msg]
    },
}

/**
 * Staking
 * @namespace mele.staking
 * @type {object}
 * @memberof mele
 */

export default class Staking extends TransactionApi {
    /**
     * mele.staking.**createValidator**
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
     * @memberof mele.staking
     * @inner
     *
     * @name CreateValidator
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    createValidator(
        description: Types.Description,
        commission: Types.Commission,
        minSelfDelegation: string,
        delegator: string,
        validator: string,
        pubkey: string,
        value: Types.SDKCoin
    ): Transaction {
        const msgs = Msgs.makeCreateValidatorMsg(
            description,
            commission,
            minSelfDelegation,
            this.broadcast.signer.getAddress(),
            validator,
            pubkey,
            value
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.staking.**editValidator**
     *
     * Edit validator description, commission rate and minimum self delegation.
     *
     * @param {Description} description - Validator description
     * @param {string} address - Validator address
     * @param {string} commissionRate - New commission rate
     * @param {string} minSelfDelegation - New minimum self delegation
     *
     * @memberof mele.staking
     * @inner
     *
     * @name EditValidator
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    editValidator(
        description: Types.Description,
        address: string,
        commissionRate: string,
        minSelfDelegation: string
    ): Transaction {
        const msgs = Msgs.makeEditValidatorMsg(
            description,
            address,
            commissionRate,
            minSelfDelegation
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.staking.**delegate**
     *
     * Delegate an arbitrary amount of tokens to the receiving validator.
     *
     * @param {string} validator - Receiving validator address
     * @param {SDKCoin} amount - Amount of tokens to delegate
     *
     * @memberof mele.staking
     * @inner
     *
     * @name Delegate
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    delegate(validator: string, amount: Types.SDKCoin): Transaction {
        const msgs = Msgs.makeDelegateMsg(this.broadcast.signer.getAddress(), validator, amount)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.staking.**undelegate**
     *
     * Undelegate an arbitrary amount of tokens from the validator.
     *
     * @param {string} validator - Validator address
     * @param {SDKCoin} amount - Amount of tokens to undelegate
     *
     * @memberof mele.staking
     * @inner
     *
     * @name Undelegate
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    undelegate(validator: string, amount: Types.SDKCoin): Transaction {
        const msgs = Msgs.makeUndelegateMsg(this.broadcast.signer.getAddress(), validator, amount)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.staking.**beginRedelegate**
     *
     * Redelegate an arbitrary amount of tokens to the one validator to another validator.
     *
     * @param {string} srcValidator - Source validator address
     * @param {string} dstValidator - Destination validator address
     * @param {SDKCoin} amount - Amount of tokens to redelegate
     *
     * @memberof mele.staking
     * @inner
     *
     * @name BeginRedelegate
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    beginRedelegate(
        srcValidator: string,
        dstValidator: string,
        amount: Types.SDKCoin
    ): Transaction {
        const msgs = Msgs.makeBeginRedelegateMsg(
            this.broadcast.signer.getAddress(),
            srcValidator,
            dstValidator,
            amount
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
