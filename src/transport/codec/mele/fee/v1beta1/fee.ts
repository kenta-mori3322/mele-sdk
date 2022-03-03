/* eslint-disable */
import Long from 'long'
import _m0 from 'protobufjs/minimal'
import { Coin } from '../../../cosmos/base/v1beta1/coin'

export const protobufPackage = 'mele.fee.v1beta1'

/** Params defines the set of params for the fee module. */
export interface Params {
    feePercentage: string
    minimumFee: Coin[]
    maximumFee: Coin[]
}

export interface AddFeeExcludedMessageProposal {
    title: string
    description: string
    messageType: string
}

export interface AddFeeExcludedMessageProposalWithDeposit {
    title: string
    description: string
    messageType: string
    deposit: string
}

export interface RemoveFeeExcludedMessageProposal {
    title: string
    description: string
    messageType: string
}

export interface RemoveFeeExcludedMessageProposalWithDeposit {
    title: string
    description: string
    messageType: string
    deposit: string
}

const baseParams: object = { feePercentage: '' }

export const Params = {
    encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.feePercentage !== '') {
            writer.uint32(10).string(message.feePercentage)
        }
        for (const v of message.minimumFee) {
            Coin.encode(v!, writer.uint32(18).fork()).ldelim()
        }
        for (const v of message.maximumFee) {
            Coin.encode(v!, writer.uint32(26).fork()).ldelim()
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseParams } as Params
        message.minimumFee = []
        message.maximumFee = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.feePercentage = reader.string()
                    break
                case 2:
                    message.minimumFee.push(Coin.decode(reader, reader.uint32()))
                    break
                case 3:
                    message.maximumFee.push(Coin.decode(reader, reader.uint32()))
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
        message.minimumFee = []
        message.maximumFee = []
        if (object.feePercentage !== undefined && object.feePercentage !== null) {
            message.feePercentage = String(object.feePercentage)
        } else {
            message.feePercentage = ''
        }
        if (object.minimumFee !== undefined && object.minimumFee !== null) {
            for (const e of object.minimumFee) {
                message.minimumFee.push(Coin.fromJSON(e))
            }
        }
        if (object.maximumFee !== undefined && object.maximumFee !== null) {
            for (const e of object.maximumFee) {
                message.maximumFee.push(Coin.fromJSON(e))
            }
        }
        return message
    },

    toJSON(message: Params): unknown {
        const obj: any = {}
        message.feePercentage !== undefined && (obj.feePercentage = message.feePercentage)
        if (message.minimumFee) {
            obj.minimumFee = message.minimumFee.map(e => (e ? Coin.toJSON(e) : undefined))
        } else {
            obj.minimumFee = []
        }
        if (message.maximumFee) {
            obj.maximumFee = message.maximumFee.map(e => (e ? Coin.toJSON(e) : undefined))
        } else {
            obj.maximumFee = []
        }
        return obj
    },

    fromPartial(object: DeepPartial<Params>): Params {
        const message = { ...baseParams } as Params
        message.minimumFee = []
        message.maximumFee = []
        if (object.feePercentage !== undefined && object.feePercentage !== null) {
            message.feePercentage = object.feePercentage
        } else {
            message.feePercentage = ''
        }
        if (object.minimumFee !== undefined && object.minimumFee !== null) {
            for (const e of object.minimumFee) {
                message.minimumFee.push(Coin.fromPartial(e))
            }
        }
        if (object.maximumFee !== undefined && object.maximumFee !== null) {
            for (const e of object.maximumFee) {
                message.maximumFee.push(Coin.fromPartial(e))
            }
        }
        return message
    },
}

const baseAddFeeExcludedMessageProposal: object = {
    title: '',
    description: '',
    messageType: '',
}

export const AddFeeExcludedMessageProposal = {
    encode(
        message: AddFeeExcludedMessageProposal,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.title !== '') {
            writer.uint32(10).string(message.title)
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description)
        }
        if (message.messageType !== '') {
            writer.uint32(26).string(message.messageType)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): AddFeeExcludedMessageProposal {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseAddFeeExcludedMessageProposal,
        } as AddFeeExcludedMessageProposal
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
                    message.messageType = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): AddFeeExcludedMessageProposal {
        const message = {
            ...baseAddFeeExcludedMessageProposal,
        } as AddFeeExcludedMessageProposal
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
        if (object.messageType !== undefined && object.messageType !== null) {
            message.messageType = String(object.messageType)
        } else {
            message.messageType = ''
        }
        return message
    },

    toJSON(message: AddFeeExcludedMessageProposal): unknown {
        const obj: any = {}
        message.title !== undefined && (obj.title = message.title)
        message.description !== undefined && (obj.description = message.description)
        message.messageType !== undefined && (obj.messageType = message.messageType)
        return obj
    },

    fromPartial(object: DeepPartial<AddFeeExcludedMessageProposal>): AddFeeExcludedMessageProposal {
        const message = {
            ...baseAddFeeExcludedMessageProposal,
        } as AddFeeExcludedMessageProposal
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
        if (object.messageType !== undefined && object.messageType !== null) {
            message.messageType = object.messageType
        } else {
            message.messageType = ''
        }
        return message
    },
}

const baseAddFeeExcludedMessageProposalWithDeposit: object = {
    title: '',
    description: '',
    messageType: '',
    deposit: '',
}

export const AddFeeExcludedMessageProposalWithDeposit = {
    encode(
        message: AddFeeExcludedMessageProposalWithDeposit,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.title !== '') {
            writer.uint32(10).string(message.title)
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description)
        }
        if (message.messageType !== '') {
            writer.uint32(26).string(message.messageType)
        }
        if (message.deposit !== '') {
            writer.uint32(34).string(message.deposit)
        }
        return writer
    },

    decode(
        input: _m0.Reader | Uint8Array,
        length?: number
    ): AddFeeExcludedMessageProposalWithDeposit {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseAddFeeExcludedMessageProposalWithDeposit,
        } as AddFeeExcludedMessageProposalWithDeposit
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
                    message.messageType = reader.string()
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

    fromJSON(object: any): AddFeeExcludedMessageProposalWithDeposit {
        const message = {
            ...baseAddFeeExcludedMessageProposalWithDeposit,
        } as AddFeeExcludedMessageProposalWithDeposit
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
        if (object.messageType !== undefined && object.messageType !== null) {
            message.messageType = String(object.messageType)
        } else {
            message.messageType = ''
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = String(object.deposit)
        } else {
            message.deposit = ''
        }
        return message
    },

    toJSON(message: AddFeeExcludedMessageProposalWithDeposit): unknown {
        const obj: any = {}
        message.title !== undefined && (obj.title = message.title)
        message.description !== undefined && (obj.description = message.description)
        message.messageType !== undefined && (obj.messageType = message.messageType)
        message.deposit !== undefined && (obj.deposit = message.deposit)
        return obj
    },

    fromPartial(
        object: DeepPartial<AddFeeExcludedMessageProposalWithDeposit>
    ): AddFeeExcludedMessageProposalWithDeposit {
        const message = {
            ...baseAddFeeExcludedMessageProposalWithDeposit,
        } as AddFeeExcludedMessageProposalWithDeposit
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
        if (object.messageType !== undefined && object.messageType !== null) {
            message.messageType = object.messageType
        } else {
            message.messageType = ''
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = object.deposit
        } else {
            message.deposit = ''
        }
        return message
    },
}

const baseRemoveFeeExcludedMessageProposal: object = {
    title: '',
    description: '',
    messageType: '',
}

export const RemoveFeeExcludedMessageProposal = {
    encode(
        message: RemoveFeeExcludedMessageProposal,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.title !== '') {
            writer.uint32(10).string(message.title)
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description)
        }
        if (message.messageType !== '') {
            writer.uint32(26).string(message.messageType)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): RemoveFeeExcludedMessageProposal {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseRemoveFeeExcludedMessageProposal,
        } as RemoveFeeExcludedMessageProposal
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
                    message.messageType = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): RemoveFeeExcludedMessageProposal {
        const message = {
            ...baseRemoveFeeExcludedMessageProposal,
        } as RemoveFeeExcludedMessageProposal
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
        if (object.messageType !== undefined && object.messageType !== null) {
            message.messageType = String(object.messageType)
        } else {
            message.messageType = ''
        }
        return message
    },

    toJSON(message: RemoveFeeExcludedMessageProposal): unknown {
        const obj: any = {}
        message.title !== undefined && (obj.title = message.title)
        message.description !== undefined && (obj.description = message.description)
        message.messageType !== undefined && (obj.messageType = message.messageType)
        return obj
    },

    fromPartial(
        object: DeepPartial<RemoveFeeExcludedMessageProposal>
    ): RemoveFeeExcludedMessageProposal {
        const message = {
            ...baseRemoveFeeExcludedMessageProposal,
        } as RemoveFeeExcludedMessageProposal
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
        if (object.messageType !== undefined && object.messageType !== null) {
            message.messageType = object.messageType
        } else {
            message.messageType = ''
        }
        return message
    },
}

const baseRemoveFeeExcludedMessageProposalWithDeposit: object = {
    title: '',
    description: '',
    messageType: '',
    deposit: '',
}

export const RemoveFeeExcludedMessageProposalWithDeposit = {
    encode(
        message: RemoveFeeExcludedMessageProposalWithDeposit,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.title !== '') {
            writer.uint32(10).string(message.title)
        }
        if (message.description !== '') {
            writer.uint32(18).string(message.description)
        }
        if (message.messageType !== '') {
            writer.uint32(26).string(message.messageType)
        }
        if (message.deposit !== '') {
            writer.uint32(34).string(message.deposit)
        }
        return writer
    },

    decode(
        input: _m0.Reader | Uint8Array,
        length?: number
    ): RemoveFeeExcludedMessageProposalWithDeposit {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseRemoveFeeExcludedMessageProposalWithDeposit,
        } as RemoveFeeExcludedMessageProposalWithDeposit
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
                    message.messageType = reader.string()
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

    fromJSON(object: any): RemoveFeeExcludedMessageProposalWithDeposit {
        const message = {
            ...baseRemoveFeeExcludedMessageProposalWithDeposit,
        } as RemoveFeeExcludedMessageProposalWithDeposit
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
        if (object.messageType !== undefined && object.messageType !== null) {
            message.messageType = String(object.messageType)
        } else {
            message.messageType = ''
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = String(object.deposit)
        } else {
            message.deposit = ''
        }
        return message
    },

    toJSON(message: RemoveFeeExcludedMessageProposalWithDeposit): unknown {
        const obj: any = {}
        message.title !== undefined && (obj.title = message.title)
        message.description !== undefined && (obj.description = message.description)
        message.messageType !== undefined && (obj.messageType = message.messageType)
        message.deposit !== undefined && (obj.deposit = message.deposit)
        return obj
    },

    fromPartial(
        object: DeepPartial<RemoveFeeExcludedMessageProposalWithDeposit>
    ): RemoveFeeExcludedMessageProposalWithDeposit {
        const message = {
            ...baseRemoveFeeExcludedMessageProposalWithDeposit,
        } as RemoveFeeExcludedMessageProposalWithDeposit
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
        if (object.messageType !== undefined && object.messageType !== null) {
            message.messageType = object.messageType
        } else {
            message.messageType = ''
        }
        if (object.deposit !== undefined && object.deposit !== null) {
            message.deposit = object.deposit
        } else {
            message.deposit = ''
        }
        return message
    },
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long
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
