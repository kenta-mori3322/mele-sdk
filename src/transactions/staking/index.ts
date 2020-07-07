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
            delegator,
            validator,
            pubkey,
            value
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

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

    delegate(validator: string, amount: Types.SDKCoin): Transaction {
        const msgs = Msgs.makeDelegateMsg(this.broadcast.signer.getAddress(), validator, amount)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    undelegate(validator: string, amount: Types.SDKCoin): Transaction {
        const msgs = Msgs.makeUndelegateMsg(this.broadcast.signer.getAddress(), validator, amount)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

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
