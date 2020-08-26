import { Coin } from '../../transport/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    SubmitProposalMsgType: 'cosmos-sdk/MsgSubmitProposal',
}

export const Msgs = {
    makeSubmitProposalMsg(proposer: string, initialDeposit: Types.SDKCoin[], content: any): any[] {
        const msg = new Codec[_types.SubmitProposalMsgType](
            content,
            initialDeposit.map(am => new Coin(am.denom, am.amount)),
            proposer
        )

        return [msg]
    },
}

/**
 * Governance
 * @namespace mele.gov
 * @type {object}
 * @memberof mele
 */

export default class Gov extends TransactionApi {
}
