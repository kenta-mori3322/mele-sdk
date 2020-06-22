import { Coin } from '../../transport/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    TransferMsgType: 'cosmos-sdk/MsgSend',
}

export const Msgs = {
    makeTransferMsg(fromAddress: string, toAddress: string, amount: Types.SDKCoin[]): any[] {
        const msg = new Codec[_types.TransferMsgType](
            fromAddress,
            toAddress,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return [msg]
    },
}

/**
 * Bank
 * @namespace mele.bank
 * @type {object}
 * @memberof mele
 */

export default class Bank extends TransactionApi {
	/**
     * mele.bank.**transfer(<toAddress>, <amount>)**
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
    transfer(toAddress: string, amount: Types.SDKCoin[]): Transaction {
        const msgs = Msgs.makeTransferMsg(this.broadcast.signer.getAddress(), toAddress, amount)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
