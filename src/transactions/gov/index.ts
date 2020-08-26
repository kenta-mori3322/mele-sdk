import { Coin } from '../../transport/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    SubmitProposalMsgType: 'cosmos-sdk/MsgSubmitProposal',
    DepositMsgType: 'cosmos-sdk/MsgDeposit',
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
    makeDepositMsg(proposalId: number, depositor: string, amount: Types.SDKCoin[]): any[] {
        const msg = new Codec[_types.DepositMsgType](
            proposalId,
            depositor,
            amount.map(am => new Coin(am.denom, am.amount))
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
    /**
     * mele.gov.**deposit**
     *
     * Deposit an arbitrary amount of tokens to a given proposal.
     *
     * @param {number} proposalId - Proposal ID
     * @param {[SDKCoin]} amount - Amount of tokens
     *
     * @memberof mele.gov
     * @inner
     *
     * @name Deposit
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    deposit(proposalId: number, amount: Types.SDKCoin[]): Transaction {
        const msgs = Msgs.makeDepositMsg(proposalId, this.broadcast.signer.getAddress(), amount)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
