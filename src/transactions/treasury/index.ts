import { Coin } from '../../transport/codec/cosmos/base/v1beta1/coin'
import { Transaction, TransactionApi } from '../index'

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
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.treasury.v1beta1.MsgAddOperator',
                value: {
                    sender: senderAddress,
                    operator: operator,
                },
            },
        ]

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
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.treasury.v1beta1.MsgRemoveOperator',
                value: {
                    sender: senderAddress,
                    operator: operator,
                },
            },
        ]

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
    disburse(recipient: string, amount: Coin[], reference: string): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.treasury.v1beta1.MsgDisburse',
                value: {
                    operator: senderAddress,
                    recipient: recipient,
                    amount: amount,
                    reference: reference,
                },
            },
        ]

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
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.treasury.v1beta1.MsgApproveDisbursement',
                value: {
                    manager: senderAddress,
                    recipient: recipient,
                    scheduledFor: scheduled_for,
                },
            },
        ]

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
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.treasury.v1beta1.MsgCancelDisbursement',
                value: {
                    manager: senderAddress,
                    recipient: recipient,
                    scheduledFor: scheduled_for,
                },
            },
        ]

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
    burn(amount: Coin[]): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.treasury.v1beta1.MsgBurn',
                value: {
                    operator: senderAddress,
                    amount: amount,
                },
            },
        ]

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
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.treasury.v1beta1.MsgApproveBurn',
                value: {
                    manager: senderAddress,
                    scheduledFor: scheduled_for,
                },
            },
        ]

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
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.treasury.v1beta1.MsgCancelBurn',
                value: {
                    manager: senderAddress,
                    scheduledFor: scheduled_for,
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}