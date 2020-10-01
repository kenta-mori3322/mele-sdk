import { Coin } from '../../transport/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    AddOperatorMsgType: 'treasury/AddOperator',
    RemoveOperatorMsgType: 'treasury/RemoveOperator',
    DisburseMsgType: 'treasury/Disburse',
    ApproveDisbursementMsgType: 'treasury/ApproveDisbursement',
    CancelDisbursementMsgType: 'treasury/CancelDisbursement',
    BurnMsgType: 'treasury/Burn',
    ApproveBurnMsgType: 'treasury/ApproveBurn',
    CancelBurnMsgType: 'treasury/CancelBurn',
}

export const Msgs = {
    makeAddOperatorMsg(sender: string, operator: string): any[] {
        const msg = new Codec[_types.AddOperatorMsgType](sender, operator)

        return [msg]
    },
    makeRemoveOperatorMsg(sender: string, operator: string): any[] {
        const msg = new Codec[_types.RemoveOperatorMsgType](sender, operator)

        return [msg]
    },
    makeDisburseMsg(
        operator: string,
        recipient: string,
        amount: Types.SDKCoin[],
        reference: string
    ): any[] {
        const msg = new Codec[_types.DisburseMsgType](
            operator,
            recipient,
            amount.map(am => new Coin(am.denom, am.amount)),
            reference
        )

        return [msg]
    },
    makeApproveDisbursementMsg(mananger: string, recipient: string, scheduled_for: string): any[] {
        const msg = new Codec[_types.ApproveDisbursementMsgType](mananger, recipient, scheduled_for)

        return [msg]
    },
    makeCancelDisbursementMsg(mananger: string, recipient: string, scheduled_for: string): any[] {
        const msg = new Codec[_types.CancelDisbursementMsgType](mananger, recipient, scheduled_for)

        return [msg]
    },
    makeBurnMsg(operator: string, amount: Types.SDKCoin[]): any[] {
        const msg = new Codec[_types.BurnMsgType](
            operator,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return [msg]
    },
    makeApproveBurnMsg(mananger: string, scheduled_for: string): any[] {
        const msg = new Codec[_types.ApproveBurnMsgType](mananger, scheduled_for)

        return [msg]
    },
    makeCancelBurnMsg(mananger: string, scheduled_for: string): any[] {
        const msg = new Codec[_types.CancelBurnMsgType](mananger, scheduled_for)

        return [msg]
    },
}

/**
 * Treasury
 * @namespace mele.treasury
 * @type {object}
 * @memberof mele
 */

export default class Treasury extends TransactionApi {
    /**
     * mele.treasury.**addOperator**
     *
     * Add a treasury operator.
     *
     * @param {string} operator - New operator address
     *
     * @memberof mele.treasury
     * @inner
     *
     * @name AddOperator
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    addOperator(operator: string): Transaction {
        const msgs = Msgs.makeAddOperatorMsg(this.broadcast.signer.getAddress(), operator)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.treasury.**removeOperator**
     *
     * Remove a treasury operator.
     *
     * @param {string} operator - Operator address
     *
     * @memberof mele.treasury
     * @inner
     *
     * @name RemoveOperator
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    removeOperator(operator: string): Transaction {
        const msgs = Msgs.makeRemoveOperatorMsg(this.broadcast.signer.getAddress(), operator)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.treasury.**disburse**
     *
     * Disburse funds from the treasury.
     *
     * @param {string} recipient - Disbursement recipient
     * @param {[SDKCoin]} amount - Disbursement amount
     * @param {string} reference - Reference
     *
     * @memberof mele.treasury
     * @inner
     *
     * @name Disburse
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    disburse(recipient: string, amount: Types.SDKCoin[], reference: string): Transaction {
        const msgs = Msgs.makeDisburseMsg(
            this.broadcast.signer.getAddress(),
            recipient,
            amount,
            reference
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.treasury.**approveDisbursement**
     *
     * Approve treasury disbursement.
     *
     * @param {string} recipient - Disbursement recipient
     * @param {string} scheduled_for - Scheduled for
     *
     * @memberof mele.treasury
     * @inner
     *
     * @name ApproveDisbursement
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    approveDisbursement(recipient: string, scheduled_for: string): Transaction {
        const msgs = Msgs.makeApproveDisbursementMsg(
            this.broadcast.signer.getAddress(),
            recipient,
            scheduled_for
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.treasury.**cancelDisbursement**
     *
     * Cancel treasury disbursement.
     *
     * @param {string} recipient - Disbursement recipient
     * @param {string} scheduled_for - Scheduled for
     *
     * @memberof mele.treasury
     * @inner
     *
     * @name CancelDisbursement
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    cancelDisbursement(recipient: string, scheduled_for: string): Transaction {
        const msgs = Msgs.makeCancelDisbursementMsg(
            this.broadcast.signer.getAddress(),
            recipient,
            scheduled_for
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.treasury.**burn**
     *
     * Burn funds from the treasury.
     *
     * @param {[SDKCoin]} amount - Burn amount
     *
     * @memberof mele.treasury
     * @inner
     *
     * @name Burn
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    burn(amount: Types.SDKCoin[]): Transaction {
        const msgs = Msgs.makeBurnMsg(this.broadcast.signer.getAddress(), amount)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.treasury.**approveBurn**
     *
     * Approve treasury burn.
     *
     * @param {string} scheduled_for - Scheduled for
     *
     * @memberof mele.treasury
     * @inner
     *
     * @name ApproveBurn
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    approveBurn(scheduled_for: string): Transaction {
        const msgs = Msgs.makeApproveBurnMsg(this.broadcast.signer.getAddress(), scheduled_for)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }

    /**
     * mele.treasury.**cancelBurn**
     *
     * Cancel treasury burn.
     *
     * @param {string} scheduled_for - Scheduled for
     *
     * @memberof mele.treasury
     * @inner
     *
     * @name CancelBurn
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    cancelBurn(scheduled_for: string): Transaction {
        const msgs = Msgs.makeCancelBurnMsg(this.broadcast.signer.getAddress(), scheduled_for)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
