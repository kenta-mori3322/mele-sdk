import { Coin } from '../../transport/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    SubmitProposalMsgType: 'cosmos-sdk/MsgSubmitProposal',
    DepositMsgType: 'cosmos-sdk/MsgDeposit',
    VoteMsgType: 'cosmos-sdk/MsgVote',

    TextProposalMsgType: 'cosmos-sdk/TextProposal',
    CommunityPoolSpendProposalMsgType: 'cosmos-sdk/CommunityPoolSpendProposal',
    BurnedPoolSpendProposalMsgType: 'cosmos-sdk/BurnedPoolSpendProposal',
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
    makeVoteMsg(proposalId: number, voter: string, option: string): any[] {
        let voteOption = option.toLowerCase()
        let numOption = 0

        switch (voteOption) {
            case 'yes':
                numOption = 1

                break
            case 'abstain':
                numOption = 2

                break
            case 'no':
                numOption = 3

                break
            case 'no_with_veto':
            case 'nowithveto':
                numOption = 4

                break
        }

        const msg = new Codec[_types.VoteMsgType](proposalId, voter, voteOption)

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
    makeTextProposal(
        proposer: string,
        initialDeposit: Types.SDKCoin[],
        title: string,
        description: string
    ): any[] {
        const content = new Codec[_types.TextProposalMsgType](title, description)

        return this.makeSubmitProposalMsg(proposer, initialDeposit, content)
    },
    makeCommunityPoolSpendProposal(
        proposer: string,
        initialDeposit: Types.SDKCoin[],
        title: string,
        description: string,
        recipient: string,
        amount: Types.SDKCoin[]
    ): any[] {
        const content = new Codec[_types.CommunityPoolSpendProposalMsgType](
            title,
            description,
            recipient,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return this.makeSubmitProposalMsg(proposer, initialDeposit, content)
    },
    makeBurnedPoolSpendProposal(
        proposer: string,
        initialDeposit: Types.SDKCoin[],
        title: string,
        description: string,
        recipient: string,
        amount: Types.SDKCoin[]
    ): any[] {
        const content = new Codec[_types.BurnedPoolSpendProposalMsgType](
            title,
            description,
            recipient,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return this.makeSubmitProposalMsg(proposer, initialDeposit, content)
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
     * mele.gov.**vote**
     *
     * Vote for a given proposal.
     *
     * @param {number} proposalId - Proposal ID
     * @param {string} option - Vote option (yes | no | no_with_veto | abstain)
     *
     * @memberof mele.gov
     * @inner
     *
     * @name Vote
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    vote(proposalId: number, option: string): Transaction {
        const msgs = Msgs.makeVoteMsg(proposalId, this.broadcast.signer.getAddress(), option)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
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
    /**
     * mele.gov.**submitTextProposal**
     *
     * Submit a text proposal.
     *
     * @param {[SDKCoin]} initialDeposit - Initial deposit
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     *
     * @memberof mele.gov
     * @inner
     *
     * @name TextProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitTextProposal(
        initialDeposit: Types.SDKCoin[],
        title: string,
        description: string
    ): Transaction {
        const msgs = Msgs.makeTextProposal(
            this.broadcast.signer.getAddress(),
            initialDeposit,
            title,
            description
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.gov.**submitCommunityPoolSpendProposal**
     *
     * Submit a community pool spend proposal.
     *
     * @param {[SDKCoin]} initialDeposit - Initial deposit
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {string} recipient - Recipient address
     * @param {[SDKCoin]} amount - Amount of tokens to transfer.
     *
     * @memberof mele.gov
     * @inner
     *
     * @name CommunityPoolSpendProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitCommunityPoolSpendProposal(
        initialDeposit: Types.SDKCoin[],
        title: string,
        description: string,
        recipient: string,
        amount: Types.SDKCoin[]
    ): Transaction {
        const msgs = Msgs.makeCommunityPoolSpendProposal(
            this.broadcast.signer.getAddress(),
            initialDeposit,
            title,
            description,
            recipient,
            amount
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.gov.**submitBurnedPoolSpendProposal**
     *
     * Submit a burned pool spend proposal.
     *
     * @param {[SDKCoin]} initialDeposit - Initial deposit
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {string} recipient - Recipient address
     * @param {[SDKCoin]} amount - Amount of tokens to transfer.
     *
     * @memberof mele.gov
     * @inner
     *
     * @name BurnedPoolSpendProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitBurnedPoolSpendProposal(
        initialDeposit: Types.SDKCoin[],
        title: string,
        description: string,
        recipient: string,
        amount: Types.SDKCoin[]
    ): Transaction {
        const msgs = Msgs.makeBurnedPoolSpendProposal(
            this.broadcast.signer.getAddress(),
            initialDeposit,
            title,
            description,
            recipient,
            amount
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
