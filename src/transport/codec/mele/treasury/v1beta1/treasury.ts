/* eslint-disable */
import Long from 'long'
import _m0 from 'protobufjs/minimal'
import { Coin } from '../../../cosmos/base/v1beta1/coin'

export const protobufPackage = 'mele.treasury.v1beta1'

/** Params defines the set of params for the treasury module. */
export interface Params {
    managers: string[]
    disbursementDelayThresholdAmount: Coin[]
    disbursementDelayDuration: string
    mintEnabled: boolean
}

export interface Treasury {
    mintGenesisSupply: boolean
    targetSupply: Coin[]
    distributed: Coin[]
    burned: Coin[]
}

export interface Disbursement {
    operator: string
    recipient: string
    amount: Coin[]
    scheduledAt: string
    scheduledFor: string
    reference: string
    executed: boolean
}

export interface Burn {
    operator: string
    amount: Coin[]
    scheduledAt: string
    scheduledFor: string
}

export interface ReferenceAmountInfo {
    reference: string
    amount: string
}

export interface MintTreasurySupplyProposal {
    title: string
    description: string
    amount: Coin[]
}

export interface MintTreasurySupplyProposalWithDeposit {
    title: string
    description: string
    amount: string
    deposit: string
}

export interface BurnTreasurySupplyProposal {
    title: string
    description: string
    amount: Coin[]
}

export interface BurnTreasurySupplyProposalWithDeposit {
    title: string
    description: string
    amount: string
    deposit: string
}

const baseParams: object = {
    managers: '',
    disbursementDelayDuration: '',
    mintEnabled: false,
}

export const Params = {
    encode(
        message: Params,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        for (const v of message.managers) {
            writer.uint32(10).string(v!)
        }
        for (const v of message.disbursementDelayThresholdAmount) {
            Coin.encode(v!, writer.uint32(18).fork()).ldelim()
        }
        if (message.disbursementDelayDuration !== '') {
            writer.uint32(26).string(message.disbursementDelayDuration)
        }
        if (message.mintEnabled === true) {
            writer.uint32(32).bool(message.mintEnabled)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseParams } as Params
        message.managers = []
        message.disbursementDelayThresholdAmount = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.managers.push(reader.string())
                    break
                case 2:
                    message.disbursementDelayThresholdAmount.push(
                        Coin.decode(reader, reader.uint32())
                    )
                    break
                case 3:
                    message.disbursementDelayDuration = reader.string()
                    break
                case 4:
                    message.mintEnabled = reader.bool()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): Params {
        const message = { ...baseParams } as Params
        message.managers = []
        message.disbursementDelayThresholdAmount = []
        if (object.managers !== undefined && object.managers !== null) {
            for (const e of object.managers) {
                message.managers.push(String(e))
            }
        }
        if (
            object.disbursementDelayThresholdAmount !== undefined &&
            object.disbursementDelayThresholdAmount !== null
        ) {
            for (const e of object.disbursementDelayThresholdAmount) {
                message.disbursementDelayThresholdAmount.push(Coin.fromJSON(e))
            }
        }
        if (
            object.disbursementDelayDuration !== undefined &&
            object.disbursementDelayDuration !== null
        ) {
            message.disbursementDelayDuration = String(
                object.disbursementDelayDuration
            )
        } else {
            message.disbursementDelayDuration = ''
        }
        if (object.mintEnabled !== undefined && object.mintEnabled !== null) {
            message.mintEnabled = Boolean(object.mintEnabled)
        } else {
            message.mintEnabled = false
        }
        return message
    },

    toJSON(message: Params): unknown {
        const obj: any = {}
        if (message.managers) {
            obj.managers = message.managers.map(e => e)
        } else {
            obj.managers = []
        }
        if (message.disbursementDelayThresholdAmount) {
            obj.disbursementDelayThresholdAmount = message.disbursementDelayThresholdAmount.map(
                e => (e ? Coin.toJSON(e) : undefined)
            )
        } else {
            obj.disbursementDelayThresholdAmount = []
        }
        message.disbursementDelayDuration !== undefined &&
            (obj.disbursementDelayDuration = message.disbursementDelayDuration)
        message.mintEnabled !== undefined &&
            (obj.mintEnabled = message.mintEnabled)
        return obj
    },

    fromPartial(object: DeepPartial<Params>): Params {
        const message = { ...baseParams } as Params
        message.managers = []
        message.disbursementDelayThresholdAmount = []
        if (object.managers !== undefined && object.managers !== null) {
            for (const e of object.managers) {
                message.managers.push(e)
            }
        }
        if (
            object.disbursementDelayThresholdAmount !== undefined &&
            object.disbursementDelayThresholdAmount !== null
        ) {
            for (const e of object.disbursementDelayThresholdAmount) {
                message.disbursementDelayThresholdAmount.push(
                    Coin.fromPartial(e)
                )
            }
        }
        if (
            object.disbursementDelayDuration !== undefined &&
            object.disbursementDelayDuration !== null
        ) {
            message.disbursementDelayDuration = object.disbursementDelayDuration
        } else {
            message.disbursementDelayDuration = ''
        }
        if (object.mintEnabled !== undefined && object.mintEnabled !== null) {
            message.mintEnabled = object.mintEnabled
        } else {
            message.mintEnabled = false
        }
        return message
    },
}

const baseTreasury: object = { mintGenesisSupply: false }

export const Treasury = {
    encode(
        message: Treasury,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.mintGenesisSupply === true) {
            writer.uint32(8).bool(message.mintGenesisSupply)
        }
        for (const v of message.targetSupply) {
            Coin.encode(v!, writer.uint32(18).fork()).ldelim()
        }
        for (const v of message.distributed) {
            Coin.encode(v!, writer.uint32(26).fork()).ldelim()
        }
        for (const v of message.burned) {
            Coin.encode(v!, writer.uint32(34).fork()).ldelim()
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Treasury {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseTreasury } as Treasury
        message.targetSupply = []
        message.distributed = []
        message.burned = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.mintGenesisSupply = reader.bool()
                    break
                case 2:
                    message.targetSupply.push(
                        Coin.decode(reader, reader.uint32())
                    )
                    break
                case 3:
                    message.distributed.push(
                        Coin.decode(reader, reader.uint32())
                    )
                    break
                case 4:
                    message.burned.push(Coin.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): Treasury {
        const message = { ...baseTreasury } as Treasury
        message.targetSupply = []
        message.distributed = []
        message.burned = []
        if (
            object.mintGenesisSupply !== undefined &&
            object.mintGenesisSupply !== null
        ) {
            message.mintGenesisSupply = Boolean(object.mintGenesisSupply)
        } else {
            message.mintGenesisSupply = false
        }
        if (object.targetSupply !== undefined && object.targetSupply !== null) {
            for (const e of object.targetSupply) {
                message.targetSupply.push(Coin.fromJSON(e))
            }
        }
        if (object.distributed !== undefined && object.distributed !== null) {
            for (const e of object.distributed) {
                message.distributed.push(Coin.fromJSON(e))
            }
        }
        if (object.burned !== undefined && object.burned !== null) {
            for (const e of object.burned) {
                message.burned.push(Coin.fromJSON(e))
            }
        }
        return message
    },

    toJSON(message: Treasury): unknown {
        const obj: any = {}
        message.mintGenesisSupply !== undefined &&
            (obj.mintGenesisSupply = message.mintGenesisSupply)
        if (message.targetSupply) {
            obj.targetSupply = message.targetSupply.map(e =>
                e ? Coin.toJSON(e) : undefined
            )
        } else {
            obj.targetSupply = []
        }
        if (message.distributed) {
            obj.distributed = message.distributed.map(e =>
                e ? Coin.toJSON(e) : undefined
            )
        } else {
            obj.distributed = []
        }
        if (message.burned) {
            obj.burned = message.burned.map(e =>
                e ? Coin.toJSON(e) : undefined
            )
        } else {
            obj.burned = []
        }
        return obj
    },

    fromPartial(object: DeepPartial<Treasury>): Treasury {
        const message = { ...baseTreasury } as Treasury
        message.targetSupply = []
        message.distributed = []
        message.burned = []
        if (
            object.mintGenesisSupply !== undefined &&
            object.mintGenesisSupply !== null
        ) {
            message.mintGenesisSupply = object.mintGenesisSupply
        } else {
            message.mintGenesisSupply = false
        }
        if (object.targetSupply !== undefined && object.targetSupply !== null) {
            for (const e of object.targetSupply) {
                message.targetSupply.push(Coin.fromPartial(e))
            }
        }
        if (object.distributed !== undefined && object.distributed !== null) {
            for (const e of object.distributed) {
                message.distributed.push(Coin.fromPartial(e))
            }
        }
        if (object.burned !== undefined && object.burned !== null) {
            for (const e of object.burned) {
                message.burned.push(Coin.fromPartial(e))
            }
        }
        return message
    },
}

const baseDisbursement: object = {
    operator: '',
    recipient: '',
    scheduledAt: '',
    scheduledFor: '',
    reference: '',
    executed: false,
}

export const Disbursement = {
    encode(
        message: Disbursement,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.operator !== '') {
            writer.uint32(10).string(message.operator)
        }
        if (message.recipient !== '') {
            writer.uint32(18).string(message.recipient)
        }
        for (const v of message.amount) {
            Coin.encode(v!, writer.uint32(26).fork()).ldelim()
        }
        if (message.scheduledAt !== '') {
            writer.uint32(34).string(message.scheduledAt)
        }
        if (message.scheduledFor !== '') {
            writer.uint32(42).string(message.scheduledFor)
        }
        if (message.reference !== '') {
            writer.uint32(50).string(message.reference)
        }
        if (message.executed === true) {
            writer.uint32(56).bool(message.executed)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Disbursement {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseDisbursement } as Disbursement
        message.amount = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.operator = reader.string()
                    break
                case 2:
                    message.recipient = reader.string()
                    break
                case 3:
                    message.amount.push(Coin.decode(reader, reader.uint32()))
                    break
                case 4:
                    message.scheduledAt = reader.string()
                    break
                case 5:
                    message.scheduledFor = reader.string()
                    break
                case 6:
                    message.reference = reader.string()
                    break
                case 7:
                    message.executed = reader.bool()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): Disbursement {
        const message = { ...baseDisbursement } as Disbursement
        message.amount = []
        if (object.operator !== undefined && object.operator !== null) {
            message.operator = String(object.operator)
        } else {
            message.operator = ''
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient)
        } else {
            message.recipient = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromJSON(e))
            }
        }
        if (object.scheduledAt !== undefined && object.scheduledAt !== null) {
            message.scheduledAt = String(object.scheduledAt)
        } else {
            message.scheduledAt = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = String(object.scheduledFor)
        } else {
            message.scheduledFor = ''
        }
        if (object.reference !== undefined && object.reference !== null) {
            message.reference = String(object.reference)
        } else {
            message.reference = ''
        }
        if (object.executed !== undefined && object.executed !== null) {
            message.executed = Boolean(object.executed)
        } else {
            message.executed = false
        }
        return message
    },

    toJSON(message: Disbursement): unknown {
        const obj: any = {}
        message.operator !== undefined && (obj.operator = message.operator)
        message.recipient !== undefined && (obj.recipient = message.recipient)
        if (message.amount) {
            obj.amount = message.amount.map(e =>
                e ? Coin.toJSON(e) : undefined
            )
        } else {
            obj.amount = []
        }
        message.scheduledAt !== undefined &&
            (obj.scheduledAt = message.scheduledAt)
        message.scheduledFor !== undefined &&
            (obj.scheduledFor = message.scheduledFor)
        message.reference !== undefined && (obj.reference = message.reference)
        message.executed !== undefined && (obj.executed = message.executed)
        return obj
    },

    fromPartial(object: DeepPartial<Disbursement>): Disbursement {
        const message = { ...baseDisbursement } as Disbursement
        message.amount = []
        if (object.operator !== undefined && object.operator !== null) {
            message.operator = object.operator
        } else {
            message.operator = ''
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient
        } else {
            message.recipient = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromPartial(e))
            }
        }
        if (object.scheduledAt !== undefined && object.scheduledAt !== null) {
            message.scheduledAt = object.scheduledAt
        } else {
            message.scheduledAt = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = object.scheduledFor
        } else {
            message.scheduledFor = ''
        }
        if (object.reference !== undefined && object.reference !== null) {
            message.reference = object.reference
        } else {
            message.reference = ''
        }
        if (object.executed !== undefined && object.executed !== null) {
            message.executed = object.executed
        } else {
            message.executed = false
        }
        return message
    },
}

const baseBurn: object = { operator: '', scheduledAt: '', scheduledFor: '' }

export const Burn = {
    encode(
        message: Burn,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.operator !== '') {
            writer.uint32(10).string(message.operator)
        }
        for (const v of message.amount) {
            Coin.encode(v!, writer.uint32(18).fork()).ldelim()
        }
        if (message.scheduledAt !== '') {
            writer.uint32(34).string(message.scheduledAt)
        }
        if (message.scheduledFor !== '') {
            writer.uint32(42).string(message.scheduledFor)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Burn {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseBurn } as Burn
        message.amount = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.operator = reader.string()
                    break
                case 2:
                    message.amount.push(Coin.decode(reader, reader.uint32()))
                    break
                case 4:
                    message.scheduledAt = reader.string()
                    break
                case 5:
                    message.scheduledFor = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): Burn {
        const message = { ...baseBurn } as Burn
        message.amount = []
        if (object.operator !== undefined && object.operator !== null) {
            message.operator = String(object.operator)
        } else {
            message.operator = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromJSON(e))
            }
        }
        if (object.scheduledAt !== undefined && object.scheduledAt !== null) {
            message.scheduledAt = String(object.scheduledAt)
        } else {
            message.scheduledAt = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = String(object.scheduledFor)
        } else {
            message.scheduledFor = ''
        }
        return message
    },

    toJSON(message: Burn): unknown {
        const obj: any = {}
        message.operator !== undefined && (obj.operator = message.operator)
        if (message.amount) {
            obj.amount = message.amount.map(e =>
                e ? Coin.toJSON(e) : undefined
            )
        } else {
            obj.amount = []
        }
        message.scheduledAt !== undefined &&
            (obj.scheduledAt = message.scheduledAt)
        message.scheduledFor !== undefined &&
            (obj.scheduledFor = message.scheduledFor)
        return obj
    },

    fromPartial(object: DeepPartial<Burn>): Burn {
        const message = { ...baseBurn } as Burn
        message.amount = []
        if (object.operator !== undefined && object.operator !== null) {
            message.operator = object.operator
        } else {
            message.operator = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromPartial(e))
            }
        }
        if (object.scheduledAt !== undefined && object.scheduledAt !== null) {
            message.scheduledAt = object.scheduledAt
        } else {
            message.scheduledAt = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = object.scheduledFor
        } else {
            message.scheduledFor = ''
        }
        return message
    },
}

const baseReferenceAmountInfo: object = { reference: '', amount: '' }

export const ReferenceAmountInfo = {
    encode(
        message: ReferenceAmountInfo,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.reference !== '') {
            writer.uint32(10).string(message.reference)
        }
        if (message.amount !== '') {
            writer.uint32(18).string(message.amount)
        }
        return writer
    },

    decode(
        input: _m0.Reader | Uint8Array,
        length?: number
    ): ReferenceAmountInfo {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseReferenceAmountInfo } as ReferenceAmountInfo
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.reference = reader.string()
                    break
                case 2:
                    message.amount = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): ReferenceAmountInfo {
        const message = { ...baseReferenceAmountInfo } as ReferenceAmountInfo
        if (object.reference !== undefined && object.reference !== null) {
            message.reference = String(object.reference)
        } else {
            message.reference = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = String(object.amount)
        } else {
            message.amount = ''
        }
        return message
    },

    toJSON(message: ReferenceAmountInfo): unknown {
        const obj: any = {}
        message.reference !== undefined && (obj.reference = message.reference)
        message.amount !== undefined && (obj.amount = message.amount)
        return obj
    },

    fromPartial(object: DeepPartial<ReferenceAmountInfo>): ReferenceAmountInfo {
        const message = { ...baseReferenceAmountInfo } as ReferenceAmountInfo
        if (object.reference !== undefined && object.reference !== null) {
            message.reference = object.reference
        } else {
            message.reference = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount
        } else {
            message.amount = ''
        }
        return message
    },
}

const baseMintTreasurySupplyProposal: object = { title: '', description: '' }

export const MintTreasurySupplyProposal = {
    encode(
        message: MintTreasurySupplyProposal,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.title !== '') {
            writer.uint32(10).string(message.title)
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description)
        }
        for (const v of message.amount) {
            Coin.encode(v!, writer.uint32(26).fork()).ldelim()
        }
        return writer
    },

    decode(
        input: _m0.Reader | Uint8Array,
        length?: number
    ): MintTreasurySupplyProposal {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMintTreasurySupplyProposal,
        } as MintTreasurySupplyProposal
        message.amount = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.title = reader.string()
                    break
                case 2:
                    message.description = reader.string()
                    break
                case 3:
                    message.amount.push(Coin.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MintTreasurySupplyProposal {
        const message = {
            ...baseMintTreasurySupplyProposal,
        } as MintTreasurySupplyProposal
        message.amount = []
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title)
        } else {
            message.title = ''
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description)
        } else {
            message.description = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromJSON(e))
            }
        }
        return message
    },

    toJSON(message: MintTreasurySupplyProposal): unknown {
        const obj: any = {}
        message.title !== undefined && (obj.title = message.title)
        message.description !== undefined &&
            (obj.description = message.description)
        if (message.amount) {
            obj.amount = message.amount.map(e =>
                e ? Coin.toJSON(e) : undefined
            )
        } else {
            obj.amount = []
        }
        return obj
    },

    fromPartial(
        object: DeepPartial<MintTreasurySupplyProposal>
    ): MintTreasurySupplyProposal {
        const message = {
            ...baseMintTreasurySupplyProposal,
        } as MintTreasurySupplyProposal
        message.amount = []
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title
        } else {
            message.title = ''
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description
        } else {
            message.description = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromPartial(e))
            }
        }
        return message
    },
}

const baseMintTreasurySupplyProposalWithDeposit: object = {
    title: '',
    description: '',
    amount: '',
    deposit: '',
}

export const MintTreasurySupplyProposalWithDeposit = {
    encode(
        message: MintTreasurySupplyProposalWithDeposit,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.title !== '') {
            writer.uint32(10).string(message.title)
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description)
        }
        if (message.amount !== '') {
            writer.uint32(26).string(message.amount)
        }
        if (message.deposit !== '') {
            writer.uint32(34).string(message.deposit)
        }
        return writer
    },

    decode(
        input: _m0.Reader | Uint8Array,
        length?: number
    ): MintTreasurySupplyProposalWithDeposit {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMintTreasurySupplyProposalWithDeposit,
        } as MintTreasurySupplyProposalWithDeposit
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.title = reader.string()
                    break
                case 2:
                    message.description = reader.string()
                    break
                case 3:
                    message.amount = reader.string()
                    break
                case 4:
                    message.deposit = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MintTreasurySupplyProposalWithDeposit {
        const message = {
            ...baseMintTreasurySupplyProposalWithDeposit,
        } as MintTreasurySupplyProposalWithDeposit
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title)
        } else {
            message.title = ''
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description)
        } else {
            message.description = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = String(object.amount)
        } else {
            message.amount = ''
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = String(object.deposit)
        } else {
            message.deposit = ''
        }
        return message
    },

    toJSON(message: MintTreasurySupplyProposalWithDeposit): unknown {
        const obj: any = {}
        message.title !== undefined && (obj.title = message.title)
        message.description !== undefined &&
            (obj.description = message.description)
        message.amount !== undefined && (obj.amount = message.amount)
        message.deposit !== undefined && (obj.deposit = message.deposit)
        return obj
    },

    fromPartial(
        object: DeepPartial<MintTreasurySupplyProposalWithDeposit>
    ): MintTreasurySupplyProposalWithDeposit {
        const message = {
            ...baseMintTreasurySupplyProposalWithDeposit,
        } as MintTreasurySupplyProposalWithDeposit
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title
        } else {
            message.title = ''
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description
        } else {
            message.description = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount
        } else {
            message.amount = ''
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = object.deposit
        } else {
            message.deposit = ''
        }
        return message
    },
}

const baseBurnTreasurySupplyProposal: object = { title: '', description: '' }

export const BurnTreasurySupplyProposal = {
    encode(
        message: BurnTreasurySupplyProposal,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.title !== '') {
            writer.uint32(10).string(message.title)
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description)
        }
        for (const v of message.amount) {
            Coin.encode(v!, writer.uint32(26).fork()).ldelim()
        }
        return writer
    },

    decode(
        input: _m0.Reader | Uint8Array,
        length?: number
    ): BurnTreasurySupplyProposal {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseBurnTreasurySupplyProposal,
        } as BurnTreasurySupplyProposal
        message.amount = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.title = reader.string()
                    break
                case 2:
                    message.description = reader.string()
                    break
                case 3:
                    message.amount.push(Coin.decode(reader, reader.uint32()))
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): BurnTreasurySupplyProposal {
        const message = {
            ...baseBurnTreasurySupplyProposal,
        } as BurnTreasurySupplyProposal
        message.amount = []
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title)
        } else {
            message.title = ''
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description)
        } else {
            message.description = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromJSON(e))
            }
        }
        return message
    },

    toJSON(message: BurnTreasurySupplyProposal): unknown {
        const obj: any = {}
        message.title !== undefined && (obj.title = message.title)
        message.description !== undefined &&
            (obj.description = message.description)
        if (message.amount) {
            obj.amount = message.amount.map(e =>
                e ? Coin.toJSON(e) : undefined
            )
        } else {
            obj.amount = []
        }
        return obj
    },

    fromPartial(
        object: DeepPartial<BurnTreasurySupplyProposal>
    ): BurnTreasurySupplyProposal {
        const message = {
            ...baseBurnTreasurySupplyProposal,
        } as BurnTreasurySupplyProposal
        message.amount = []
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title
        } else {
            message.title = ''
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description
        } else {
            message.description = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromPartial(e))
            }
        }
        return message
    },
}

const baseBurnTreasurySupplyProposalWithDeposit: object = {
    title: '',
    description: '',
    amount: '',
    deposit: '',
}

export const BurnTreasurySupplyProposalWithDeposit = {
    encode(
        message: BurnTreasurySupplyProposalWithDeposit,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.title !== '') {
            writer.uint32(10).string(message.title)
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description)
        }
        if (message.amount !== '') {
            writer.uint32(26).string(message.amount)
        }
        if (message.deposit !== '') {
            writer.uint32(34).string(message.deposit)
        }
        return writer
    },

    decode(
        input: _m0.Reader | Uint8Array,
        length?: number
    ): BurnTreasurySupplyProposalWithDeposit {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseBurnTreasurySupplyProposalWithDeposit,
        } as BurnTreasurySupplyProposalWithDeposit
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.title = reader.string()
                    break
                case 2:
                    message.description = reader.string()
                    break
                case 3:
                    message.amount = reader.string()
                    break
                case 4:
                    message.deposit = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): BurnTreasurySupplyProposalWithDeposit {
        const message = {
            ...baseBurnTreasurySupplyProposalWithDeposit,
        } as BurnTreasurySupplyProposalWithDeposit
        if (object.title !== undefined && object.title !== null) {
            message.title = String(object.title)
        } else {
            message.title = ''
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = String(object.description)
        } else {
            message.description = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = String(object.amount)
        } else {
            message.amount = ''
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = String(object.deposit)
        } else {
            message.deposit = ''
        }
        return message
    },

    toJSON(message: BurnTreasurySupplyProposalWithDeposit): unknown {
        const obj: any = {}
        message.title !== undefined && (obj.title = message.title)
        message.description !== undefined &&
            (obj.description = message.description)
        message.amount !== undefined && (obj.amount = message.amount)
        message.deposit !== undefined && (obj.deposit = message.deposit)
        return obj
    },

    fromPartial(
        object: DeepPartial<BurnTreasurySupplyProposalWithDeposit>
    ): BurnTreasurySupplyProposalWithDeposit {
        const message = {
            ...baseBurnTreasurySupplyProposalWithDeposit,
        } as BurnTreasurySupplyProposalWithDeposit
        if (object.title !== undefined && object.title !== null) {
            message.title = object.title
        } else {
            message.title = ''
        }
        if (object.description !== undefined && object.description !== null) {
            message.description = object.description
        } else {
            message.description = ''
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount
        } else {
            message.amount = ''
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = object.deposit
        } else {
            message.deposit = ''
        }
        return message
    },
}

type Builtin =
    | Date
    | Function
    | Uint8Array
    | string
    | number
    | boolean
    | undefined
    | Long
export type DeepPartial<T> = T extends Builtin
    ? T
    : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T extends {}
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : Partial<T>

if (_m0.util.Long !== Long) {
    _m0.util.Long = Long as any
    _m0.configure()
}
