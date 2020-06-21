import { Coin } from '../../transport/codec'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    TransferMsgType: 'cosmos-sdk/MsgSend',
}

export const Bank = {
    makeTransferMsg(fromAddress: string, toAddress: string, amount: Types.SDKCoin[]): any[] {
        const msg = new Codec[_types.TransferMsgType](
            fromAddress,
            toAddress,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return [msg]
    },
}
