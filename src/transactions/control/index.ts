import Long from 'long'
import { Coin } from '../../transport/codec/cosmos/base/v1beta1/coin'
import { ParamChange } from '../../transport/codec/cosmos/params/v1beta1/params'
import { Plan } from '../../transport/codec/cosmos/upgrade/v1beta1/upgrade'
import { getRegistry } from '../../transport/registry'
import { Transaction, TransactionApi } from '../index'

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
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    executor: senderAddress,
                    content: {
                        typeUrl: '/cosmos.gov.v1beta1.TextProposal',
                        value: getRegistry().encode({
                            typeUrl: '/cosmos.gov.v1beta1.TextProposal',
                            value: {
                                title: title,
                                description: description,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
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
        changes: ParamChange[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    executor: senderAddress,
                    content: {
                        typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
                        value: getRegistry().encode({
                            typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
                            value: {
                                title: title,
                                description: description,
                                changes: changes,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
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
        amount: Coin[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    executor: senderAddress,
                    content: {
                        typeUrl: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
                        value: getRegistry().encode({
                            typeUrl: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
                            value: {
                                title: title,
                                description: description,
                                recipient: recipient,
                                amount: amount,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
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
        amount: Coin[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    executor: senderAddress,
                    content: {
                        typeUrl: '/cosmos.distribution.v1beta1.BurnedPoolSpendProposal',
                        value: getRegistry().encode({
                            typeUrl: '/cosmos.distribution.v1beta1.BurnedPoolSpendProposal',
                            value: {
                                title: title,
                                description: description,
                                recipient: recipient,
                                amount: amount,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
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
        amount: Coin[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    executor: senderAddress,
                    content: {
                        typeUrl: '/mele.treasury.v1beta1.MintTreasurySupplyProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.treasury.v1beta1.MintTreasurySupplyProposal',
                            value: {
                                title: title,
                                description: description,
                                amount: amount,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
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
        amount: Coin[]
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    executor: senderAddress,
                    content: {
                        typeUrl: '/mele.treasury.v1beta1.BurnTreasurySupplyProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.treasury.v1beta1.BurnTreasurySupplyProposal',
                            value: {
                                title: title,
                                description: description,
                                amount: amount,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
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
    submitSoftwareUpgradeProposal(title: string, description: string, plan: Plan): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    executor: senderAddress,
                    content: {
                        typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
                        value: getRegistry().encode({
                            typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
                            value: {
                                title: title,
                                description: description,
                                plan: {
                                    name: plan.name,
                                    height: plan.height,
                                    info: plan.info,
                                },
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
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
    submitCancelSoftwareUpgradeProposal(title: string, description: string): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    executor: senderAddress,
                    content: {
                        typeUrl: '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
                        value: getRegistry().encode({
                            typeUrl: '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
                            value: {
                                title: title,
                                description: description,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
    }
    /**
     * mele.control.**submitAddFeeExcludedMessageProposal**
     *
     * Submit an add fee excluded message proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {string} messageType - Type of the message.
     *
     * @memberof mele.control
     * @inner
     *
     * @name AddFeeExcludedMessageProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitAddFeeExcludedMessageProposal(
        title: string,
        description: string,
        messageType: string
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    proposer: senderAddress,
                    content: {
                        typeUrl: '/mele.fee.v1beta1.AddFeeExcludedMessageProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.fee.v1beta1.AddFeeExcludedMessageProposal',
                            value: {
                                title: title,
                                description: description,
                                messageType: messageType,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
    }
    /**
     * mele.control.**submitRemoveFeeExcludedMessageProposal**
     *
     * Submit a remove fee excluded message proposal.
     *
     * @param {string} title - Text proposal title
     * @param {string} description - Text proposal description
     * @param {string} messageType - Type of the message.
     *
     * @memberof mele.control
     * @inner
     *
     * @name RemoveFeeExcludedMessageProposal
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    submitRemoveFeeExcludedMessageProposal(
        title: string,
        description: string,
        messageType: string
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.control.v1beta1.MsgSubmitExecution',
                value: {
                    proposer: senderAddress,
                    content: {
                        typeUrl: '/mele.fee.v1beta1.RemoveFeeExcludedMessageProposal',
                        value: getRegistry().encode({
                            typeUrl: '/mele.fee.v1beta1.RemoveFeeExcludedMessageProposal',
                            value: {
                                title: title,
                                description: description,
                                messageType: messageType,
                            },
                        }),
                    },
                },
            },
        ]

        return new Transaction(
            msgs,
            msgs => this.broadcast.sendTransaction(msgs),
            msgs => this.broadcast.calculateFees(msgs)
        )
    }
}
