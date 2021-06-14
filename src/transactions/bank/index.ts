import { Coin } from '../../transport/codec/cosmos/base/v1beta1/coin'
import { Transaction, TransactionApi } from '../index'

/**
 * Bank
 * @namespace mele.bank
 * @type {object}
 * @memberof mele
 */

export default class Bank extends TransactionApi {
    /**
     * mele.bank.**transfer**
     *
     * Transfer an arbitrary amount of tokens to the receiving account.
     *
     * @param {string} toAddress - Receiving account address
     * @param {[SDKCoin]} amount - Amount of tokens to send
     *
     * @memberof mele.bank
     * @inner
     *
     * @name Transfer
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    transfer(toAddress: string, amount: readonly Coin[]): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/cosmos.bank.v1beta1.MsgSend',
                value: {
                    fromAddress: senderAddress,
                    toAddress: toAddress,
                    amount: amount,
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs), msgs => this.broadcast.calculateFees(msgs))
    }
}
