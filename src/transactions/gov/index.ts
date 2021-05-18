import { Coin } from '../../transport/codec/cosmos/base/v1beta1/coin'
import { ParamChange } from '../../transport/codec/cosmos/params/v1beta1/params'
import { Plan } from '../../transport/codec/cosmos/upgrade/v1beta1/upgrade'
import { getRegistry } from '../../transport/registry'
import { Transaction, TransactionApi } from '../index'
import Long from 'long'

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
     vote(proposalId: number, option: number): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgVote',
                value: {
                    proposalId: Long.fromNumber(proposalId),
                    voter: senderAddress,
                    option: option,
                },
            },
        ]

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
    deposit(proposalId: number, amount: Coin[]): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgDeposit',
                value: {
                    proposalId: Long.fromNumber(proposalId),
                    depositor: senderAddress,
                    amount: amount,
                },
            },
        ]

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
        initialDeposit: Coin[],
        title: string,
        description: string
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgSubmitProposal',
                value: {
                    proposer: senderAddress,
                    initialDeposit: initialDeposit,
                    content: {
                        typeUrl: '/mele.gov.v1beta1.TextProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.gov.v1beta1.TextProposal',
                            value: {
                                title: title,
                                description: description,
                            }
                        })
                    },
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.gov.**submitParameterChangeProposal**
     *
     * Submit a parameter proposal.
     *
     * @param {[SDKCoin]} initialDeposit - Initial deposit
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {[ParamChange]} changes - Parameter changes
     *
     * @memberof mele.gov
     * @inner
     *
     * @name ParameterChangeProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitParameterChangeProposal(
        initialDeposit: Coin[],
        title: string,
        description: string,
        changes: ParamChange[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgSubmitProposal',
                value: {
                    proposer: senderAddress,
                    initialDeposit: initialDeposit,
                    content: {
                        typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
                        value: getRegistry().encode({
                            typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
                            value: {
                                title: title,
                                description: description,
                                changes: changes,
                            }
                        })
                    },
                },
            },
        ]

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
        initialDeposit: Coin[],
        title: string,
        description: string,
        recipient: string,
        amount: Coin[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgSubmitProposal',
                value: {
                    proposer: senderAddress,
                    initialDeposit: initialDeposit,
                    content: {
                        typeUrl: '/mele.distribution.v1beta1.CommunityPoolSpendProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.distribution.v1beta1.CommunityPoolSpendProposal',
                            value: {
                                title: title,
                                description: description,
                                recipient: recipient,
                                amount: amount,
                            }
                        })
                    },
                },
            },
        ]

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
        initialDeposit: Coin[],
        title: string,
        description: string,
        recipient: string,
        amount: Coin[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgSubmitProposal',
                value: {
                    proposer: senderAddress,
                    initialDeposit: initialDeposit,
                    content: {
                        typeUrl: '/mele.distribution.v1beta1.BurnedPoolSpendProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.distribution.v1beta1.BurnedPoolSpendProposal',
                            value: {
                                title: title,
                                description: description,
                                recipient: recipient,
                                amount: amount,
                            }
                        },)
                    },
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.gov.**submitMintTreasurySupplyProposal**
     *
     * Submit a mint treasury supply proposal.
     *
     * @param {[SDKCoin]} initialDeposit - Initial deposit
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {[SDKCoin]} amount - Amount of tokens to transfer.
     *
     * @memberof mele.gov
     * @inner
     *
     * @name MintTreasurySupplyProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitMintTreasurySupplyProposal(
        initialDeposit: Coin[],
        title: string,
        description: string,
        amount: Coin[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgSubmitProposal',
                value: {
                    proposer: senderAddress,
                    initialDeposit: initialDeposit,
                    content: {
                        typeUrl: '/mele.treasury.v1beta1.MintTreasurySupplyProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.treasury.v1beta1.MintTreasurySupplyProposal',
                            value: {
                                title: title,
                                description: description,
                                amount: amount,
                            }
                        })
                    },
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.gov.**submitBurnTreasurySupplyProposal**
     *
     * Submit a burn treasury supply proposal.
     *
     * @param {[SDKCoin]} initialDeposit - Initial deposit
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {[SDKCoin]} amount - Amount of tokens to transfer.
     *
     * @memberof mele.gov
     * @inner
     *
     * @name BurnTreasurySupplyProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitBurnTreasurySupplyProposal(
        initialDeposit: Coin[],
        title: string,
        description: string,
        amount: Coin[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgSubmitProposal',
                value: {
                    proposer: senderAddress,
                    initialDeposit: initialDeposit,
                    content: {
                        typeUrl: '/mele.treasury.v1beta1.BurnTreasurySupplyProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.treasury.v1beta1.BurnTreasurySupplyProposal',
                            value: {
                                title: title,
                                description: description,
                                amount: amount,
                            }
                        })
                    },
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.gov.**submitSoftwareUpgradeProposal**
     *
     * Submit a software upgrade proposal.
     *
     * @param {[SDKCoin]} initialDeposit - Initial deposit
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {UpgradePlan} plan - Upgrade plan.
     *
     * @memberof mele.gov
     * @inner
     *
     * @name SoftwareUpgradeProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitSoftwareUpgradeProposal(
        initialDeposit: Coin[],
        title: string,
        description: string,
        plan: Plan,
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgSubmitProposal',
                value: {
                    proposer: senderAddress,
                    initialDeposit: initialDeposit,
                    content: {
                        typeUrl: '/mele.upgrade.v1beta1.SoftwareUpgradeProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.upgrade.v1beta1.SoftwareUpgradeProposal',
                            value: {
                                title: title,
                                description: description,
                                plan: {
                                    name: plan.name,
                                    height: plan.height,
                                    info: plan.info,
                                }
                            }
                        })
                    },
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
    /**
     * mele.gov.**submitCancelSoftwareUpgradeProposal**
     *
     * Submit a cancel software upgrade proposal.
     *
     * @param {[SDKCoin]} initialDeposit - Initial deposit
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     *
     * @memberof mele.gov
     * @inner
     *
     * @name CancelSoftwareUpgradeProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitCancelSoftwareUpgradeProposal(
        initialDeposit: Coin[],
        title: string,
        description: string
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.gov.v1beta1.MsgSubmitProposal',
                value: {
                    proposer: senderAddress,
                    initialDeposit: initialDeposit,
                    content: {
                        typeUrl: '/mele.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
                            value: {
                                title: title,
                                description: description,
                            }
                        })
                    },
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs))
    }
}
