import { Coin } from '../../transport/codec'
import { Codec as GovCodec } from '../gov/codec'
import { Transaction, TransactionApi } from '../index'
import { Codec } from './codec'

import * as Types from '../../common'

const _types = {
    SubmitExecutionMsgType: 'cosmos-sdk/MsgSubmitExecution',

    TextProposalMsgType: 'cosmos-sdk/TextProposal',
    ParameterChangeProposalMsgType: 'cosmos-sdk/ParameterChangeProposal',
    CommunityPoolSpendProposalMsgType: 'cosmos-sdk/CommunityPoolSpendProposal',
    BurnedPoolSpendProposalMsgType: 'cosmos-sdk/BurnedPoolSpendProposal',
    MintTreasurySupplyProposalMsgType: 'treasury/MintTreasurySupplyProposal',
    BurnTreasurySupplyProposalMsgType: 'treasury/BurnTreasurySupplyProposal',
    SoftwareUpgradeProposalMsgType: 'cosmos-sdk/SoftwareUpgradeProposal',
    CancelSoftwareUpgradeProposalMsgType: 'cosmos-sdk/CancelSoftwareUpgradeProposal',
}

export const Msgs = {
    makeSubmitExecutionMsg(executor: string, content: any): any[] {
        const msg = new Codec[_types.SubmitExecutionMsgType](content, executor)

        return [msg]
    },
    makeTextProposal(proposer: string, title: string, description: string): any[] {
        const content = new GovCodec[_types.TextProposalMsgType](title, description)

        return this.makeSubmitExecutionMsg(proposer, content)
    },
    makeParameterChangeProposal(
        proposer: string,
        title: string,
        description: string,
        changes: Types.ParamChange[]
    ): any[] {
        const codecChanges = changes.map(
            change => new GovCodec['ParamChange'](change.subspace, change.key, change.value)
        )

        const content = new GovCodec[_types.ParameterChangeProposalMsgType](
            title,
            description,
            codecChanges
        )

        return this.makeSubmitExecutionMsg(proposer, content)
    },
    makeCommunityPoolSpendProposal(
        proposer: string,
        title: string,
        description: string,
        recipient: string,
        amount: Types.SDKCoin[]
    ): any[] {
        const content = new GovCodec[_types.CommunityPoolSpendProposalMsgType](
            title,
            description,
            recipient,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return this.makeSubmitExecutionMsg(proposer, content)
    },
    makeBurnedPoolSpendProposal(
        proposer: string,
        title: string,
        description: string,
        recipient: string,
        amount: Types.SDKCoin[]
    ): any[] {
        const content = new GovCodec[_types.BurnedPoolSpendProposalMsgType](
            title,
            description,
            recipient,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return this.makeSubmitExecutionMsg(proposer, content)
    },
    makeMintTreasurySupplyProposal(
        proposer: string,
        title: string,
        description: string,
        amount: Types.SDKCoin[]
    ): any[] {
        const content = new GovCodec[_types.MintTreasurySupplyProposalMsgType](
            title,
            description,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return this.makeSubmitExecutionMsg(proposer, content)
    },
    makeBurnTreasurySupplyProposal(
        proposer: string,
        title: string,
        description: string,
        amount: Types.SDKCoin[]
    ): any[] {
        const content = new GovCodec[_types.BurnTreasurySupplyProposalMsgType](
            title,
            description,
            amount.map(am => new Coin(am.denom, am.amount))
        )

        return this.makeSubmitExecutionMsg(proposer, content)
    },
    makeSoftwareUpgradeProposal(
        proposer: string,
        title: string,
        description: string,
        plan: Types.UpgradePlan
    ): any[] {
        const cPlan = new GovCodec['UpgradePlan'](plan.name, plan.height, plan.info)

        const content = new GovCodec[_types.SoftwareUpgradeProposalMsgType](
            title,
            description,
            cPlan
        )

        return this.makeSubmitExecutionMsg(proposer, content)
    },
    makeCancelSoftwareUpgradeProposal(
        proposer: string,
        title: string,
        description: string,
    ): any[] {
        const content = new GovCodec[_types.CancelSoftwareUpgradeProposalMsgType](
            title,
            description
        )

        return this.makeSubmitExecutionMsg(proposer, content)
    },
}

/**
 * Control
 * @namespace mele.control
 * @type {object}
 * @memberof mele
 */

export default class Control extends TransactionApi {
    /**
     * mele.control.**submitTextProposal**
     *
     * Submit a text proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     *
     * @memberof mele.control
     * @inner
     *
     * @name TextProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitTextProposal(title: string, description: string): Transaction {
        const msgs = Msgs.makeTextProposal(this.broadcast.signer.getAddress(), title, description)

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.control.**submitParameterChangeProposal**
     *
     * Submit a parameter proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {[ParamChange]} changes - Parameter changes
     *
     * @memberof mele.control
     * @inner
     *
     * @name ParameterChangeProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitParameterChangeProposal(
        title: string,
        description: string,
        changes: Types.ParamChange[]
    ): Transaction {
        const msgs = Msgs.makeParameterChangeProposal(
            this.broadcast.signer.getAddress(),
            title,
            description,
            changes
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.control.**submitCommunityPoolSpendProposal**
     *
     * Submit a community pool spend proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {string} recipient - Recipient address
     * @param {[SDKCoin]} amount - Amount of tokens to transfer.
     *
     * @memberof mele.control
     * @inner
     *
     * @name CommunityPoolSpendProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitCommunityPoolSpendProposal(
        title: string,
        description: string,
        recipient: string,
        amount: Types.SDKCoin[]
    ): Transaction {
        const msgs = Msgs.makeCommunityPoolSpendProposal(
            this.broadcast.signer.getAddress(),
            title,
            description,
            recipient,
            amount
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.control.**submitBurnedPoolSpendProposal**
     *
     * Submit a burned pool spend proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {string} recipient - Recipient address
     * @param {[SDKCoin]} amount - Amount of tokens to transfer.
     *
     * @memberof mele.control
     * @inner
     *
     * @name BurnedPoolSpendProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitBurnedPoolSpendProposal(
        title: string,
        description: string,
        recipient: string,
        amount: Types.SDKCoin[]
    ): Transaction {
        const msgs = Msgs.makeBurnedPoolSpendProposal(
            this.broadcast.signer.getAddress(),
            title,
            description,
            recipient,
            amount
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.control.**submitMintTreasurySupplyProposal**
     *
     * Submit a mint treasury supply proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {[SDKCoin]} amount - Amount of tokens to transfer.
     *
     * @memberof mele.control
     * @inner
     *
     * @name MintTreasurySupplyProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitMintTreasurySupplyProposal(
        title: string,
        description: string,
        amount: Types.SDKCoin[]
    ): Transaction {
        const msgs = Msgs.makeMintTreasurySupplyProposal(
            this.broadcast.signer.getAddress(),
            title,
            description,
            amount
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.control.**submitBurnTreasurySupplyProposal**
     *
     * Submit a burn treasury supply proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {[SDKCoin]} amount - Amount of tokens to transfer.
     *
     * @memberof mele.control
     * @inner
     *
     * @name BurnTreasurySupplyProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitBurnTreasurySupplyProposal(
        title: string,
        description: string,
        amount: Types.SDKCoin[]
    ): Transaction {
        const msgs = Msgs.makeBurnTreasurySupplyProposal(
            this.broadcast.signer.getAddress(),
            title,
            description,
            amount
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.control.**submitSoftwareUpgradeProposal**
     *
     * Submit a software upgrade proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {UpgradePlan} plan - Upgrade plan.
     *
     * @memberof mele.control
     * @inner
     *
     * @name SoftwareUpgradeProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitSoftwareUpgradeProposal(
        title: string,
        description: string,
        plan: Types.UpgradePlan
    ): Transaction {
        const msgs = Msgs.makeSoftwareUpgradeProposal(
            this.broadcast.signer.getAddress(),
            title,
            description,
            plan
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.control.**submitCancelSoftwareUpgradeProposal**
     *
     * Submit a cancel software upgrade proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     *
     * @memberof mele.control
     * @inner
     *
     * @name CancelSoftwareUpgradeProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitCancelSoftwareUpgradeProposal(
        title: string,
        description: string
    ): Transaction {
        const msgs = Msgs.makeCancelSoftwareUpgradeProposal(
            this.broadcast.signer.getAddress(),
            title,
            description
        )

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
