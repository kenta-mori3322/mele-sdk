  
import * as Types from '../common'

import { ITransport } from '../transport'
import { Coin } from '../transport/codec'
import { Msgs } from '../transport/msgs'

const _types = {
    // bank
    TransferMsgType: 'cosmos-sdk/MsgSend',
}

export default class Broadcast {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    makeTransferMsg(
        fromAddress: string,
        toAddress: string,
        amount: Types.SDKCoin[],
    ): any[] {
        const msg = new Msgs[_types.TransferMsgType](
            fromAddress,
            toAddress,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        const msgs = [
            {
                type: _types.TransferMsgType,
                value: msg,
            },
        ]

        return msgs
    }

}