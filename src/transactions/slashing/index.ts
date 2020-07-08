import { Coin } from '../../transport/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    UnjailMsgType: 'cosmos-sdk/MsgUnjail',
}

export const Msgs = {
    makeUnjailMsg(address: string): any[] {
        const msg = new Codec[_types.UnjailMsgType](address)

        return [msg]
    },
}

/**
 * Slashing
 * @namespace mele.slashing
 * @type {object}
 * @memberof mele
 */

export default class Slashing extends TransactionApi {
    /**
     * mele.slashing.**unjail**
     *
     * Unjail a jailed validator.
     *
     * @param {string} address - Validator address
     *
     * @memberof mele.slashing
     * @inner
     *
     * @name Unjail
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    unjail(address: string): Transaction {
        const msgs = Msgs.makeUnjailMsg(address)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
