import { Coin } from '../../transport/codec'
import { Codec } from './codec'
import { TransactionApi, Transaction } from '../index'

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
    }
}

export default class Bank extends TransactionApi {
    transfer(toAddress: string, amount: Types.SDKCoin[]): Transaction {
        const msgs = Msgs.makeTransferMsg(this.broadcast.signer.getAddress(), toAddress, amount)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
