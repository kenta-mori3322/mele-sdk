/* eslint-disable */
import Long from 'long'
import _m0 from 'protobufjs/minimal'
import { Coin } from '../../../cosmos/base/v1beta1/coin'

export const protobufPackage = 'mele.treasury.v1beta1'

/** MsgAddOperator */
export interface MsgAddOperator {
    sender: string
    operator: string
}

export interface MsgAddOperatorResponse {}

/** MsgRemoveOperator */
export interface MsgRemoveOperator {
    sender: string
    operator: string
}

export interface MsgRemoveOperatorResponse {}

/** MsgDisburse */
export interface MsgDisburse {
    operator: string
    recipient: string
    amount: Coin[]
    reference: string
}

export interface MsgDisburseResponse {}

/** MsgCancelDisbursement */
export interface MsgCancelDisbursement {
    manager: string
    recipient: string
    scheduledFor: string
}

export interface MsgCancelDisbursementResponse {}

/** MsgApproveDisbursement */
export interface MsgApproveDisbursement {
    manager: string
    recipient: string
    scheduledFor: string
}

export interface MsgApproveDisbursementResponse {}

/** MsgBurn */
export interface MsgBurn {
    operator: string
    amount: Coin[]
}

export interface MsgBurnResponse {}

/** MsgCancelBurn */
export interface MsgCancelBurn {
    manager: string
    scheduledFor: string
}

export interface MsgCancelBurnResponse {}

/** MsgApproveBurn */
export interface MsgApproveBurn {
    manager: string
    scheduledFor: string
}

export interface MsgApproveBurnResponse {}

const baseMsgAddOperator: object = { sender: '', operator: '' }

export const MsgAddOperator = {
    encode(message: MsgAddOperator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.sender !== '') {
            writer.uint32(10).string(message.sender)
        }
        if (message.operator !== '') {
            writer.uint32(18).string(message.operator)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddOperator {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgAddOperator } as MsgAddOperator
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string()
                    break
                case 2:
                    message.operator = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgAddOperator {
        const message = { ...baseMsgAddOperator } as MsgAddOperator
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender)
        } else {
            message.sender = ''
        }
        if (object.operator !== undefined && object.operator !== null) {
            message.operator = String(object.operator)
        } else {
            message.operator = ''
        }
        return message
    },

    toJSON(message: MsgAddOperator): unknown {
        const obj: any = {}
        message.sender !== undefined && (obj.sender = message.sender)
        message.operator !== undefined && (obj.operator = message.operator)
        return obj
    },

    fromPartial(object: DeepPartial<MsgAddOperator>): MsgAddOperator {
        const message = { ...baseMsgAddOperator } as MsgAddOperator
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender
        } else {
            message.sender = ''
        }
        if (object.operator !== undefined && object.operator !== null) {
            message.operator = object.operator
        } else {
            message.operator = ''
        }
        return message
    },
}

const baseMsgAddOperatorResponse: object = {}

export const MsgAddOperatorResponse = {
    encode(_: MsgAddOperatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddOperatorResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgAddOperatorResponse,
        } as MsgAddOperatorResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(_: any): MsgAddOperatorResponse {
        const message = {
            ...baseMsgAddOperatorResponse,
        } as MsgAddOperatorResponse
        return message
    },

    toJSON(_: MsgAddOperatorResponse): unknown {
        const obj: any = {}
        return obj
    },

    fromPartial(_: DeepPartial<MsgAddOperatorResponse>): MsgAddOperatorResponse {
        const message = {
            ...baseMsgAddOperatorResponse,
        } as MsgAddOperatorResponse
        return message
    },
}

const baseMsgRemoveOperator: object = { sender: '', operator: '' }

export const MsgRemoveOperator = {
    encode(message: MsgRemoveOperator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.sender !== '') {
            writer.uint32(10).string(message.sender)
        }
        if (message.operator !== '') {
            writer.uint32(18).string(message.operator)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveOperator {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgRemoveOperator } as MsgRemoveOperator
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string()
                    break
                case 2:
                    message.operator = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgRemoveOperator {
        const message = { ...baseMsgRemoveOperator } as MsgRemoveOperator
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender)
        } else {
            message.sender = ''
        }
        if (object.operator !== undefined && object.operator !== null) {
            message.operator = String(object.operator)
        } else {
            message.operator = ''
        }
        return message
    },

    toJSON(message: MsgRemoveOperator): unknown {
        const obj: any = {}
        message.sender !== undefined && (obj.sender = message.sender)
        message.operator !== undefined && (obj.operator = message.operator)
        return obj
    },

    fromPartial(object: DeepPartial<MsgRemoveOperator>): MsgRemoveOperator {
        const message = { ...baseMsgRemoveOperator } as MsgRemoveOperator
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender
        } else {
            message.sender = ''
        }
        if (object.operator !== undefined && object.operator !== null) {
            message.operator = object.operator
        } else {
            message.operator = ''
        }
        return message
    },
}

const baseMsgRemoveOperatorResponse: object = {}

export const MsgRemoveOperatorResponse = {
    encode(_: MsgRemoveOperatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveOperatorResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgRemoveOperatorResponse,
        } as MsgRemoveOperatorResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(_: any): MsgRemoveOperatorResponse {
        const message = {
            ...baseMsgRemoveOperatorResponse,
        } as MsgRemoveOperatorResponse
        return message
    },

    toJSON(_: MsgRemoveOperatorResponse): unknown {
        const obj: any = {}
        return obj
    },

    fromPartial(_: DeepPartial<MsgRemoveOperatorResponse>): MsgRemoveOperatorResponse {
        const message = {
            ...baseMsgRemoveOperatorResponse,
        } as MsgRemoveOperatorResponse
        return message
    },
}

const baseMsgDisburse: object = { operator: '', recipient: '', reference: '' }

export const MsgDisburse = {
    encode(message: MsgDisburse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.operator !== '') {
            writer.uint32(10).string(message.operator)
        }
        if (message.recipient !== '') {
            writer.uint32(18).string(message.recipient)
        }
        for (const v of message.amount) {
            Coin.encode(v!, writer.uint32(26).fork()).ldelim()
        }
        if (message.reference !== '') {
            writer.uint32(34).string(message.reference)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDisburse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgDisburse } as MsgDisburse
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
                    message.reference = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgDisburse {
        const message = { ...baseMsgDisburse } as MsgDisburse
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
        if (object.reference !== undefined && object.reference !== null) {
            message.reference = String(object.reference)
        } else {
            message.reference = ''
        }
        return message
    },

    toJSON(message: MsgDisburse): unknown {
        const obj: any = {}
        message.operator !== undefined && (obj.operator = message.operator)
        message.recipient !== undefined && (obj.recipient = message.recipient)
        if (message.amount) {
            obj.amount = message.amount.map(e => (e ? Coin.toJSON(e) : undefined))
        } else {
            obj.amount = []
        }
        message.reference !== undefined && (obj.reference = message.reference)
        return obj
    },

    fromPartial(object: DeepPartial<MsgDisburse>): MsgDisburse {
        const message = { ...baseMsgDisburse } as MsgDisburse
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
        if (object.reference !== undefined && object.reference !== null) {
            message.reference = object.reference
        } else {
            message.reference = ''
        }
        return message
    },
}

const baseMsgDisburseResponse: object = {}

export const MsgDisburseResponse = {
    encode(_: MsgDisburseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDisburseResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgDisburseResponse } as MsgDisburseResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(_: any): MsgDisburseResponse {
        const message = { ...baseMsgDisburseResponse } as MsgDisburseResponse
        return message
    },

    toJSON(_: MsgDisburseResponse): unknown {
        const obj: any = {}
        return obj
    },

    fromPartial(_: DeepPartial<MsgDisburseResponse>): MsgDisburseResponse {
        const message = { ...baseMsgDisburseResponse } as MsgDisburseResponse
        return message
    },
}

const baseMsgCancelDisbursement: object = {
    manager: '',
    recipient: '',
    scheduledFor: '',
}

export const MsgCancelDisbursement = {
    encode(message: MsgCancelDisbursement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.manager !== '') {
            writer.uint32(10).string(message.manager)
        }
        if (message.recipient !== '') {
            writer.uint32(18).string(message.recipient)
        }
        if (message.scheduledFor !== '') {
            writer.uint32(26).string(message.scheduledFor)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelDisbursement {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgCancelDisbursement,
        } as MsgCancelDisbursement
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.manager = reader.string()
                    break
                case 2:
                    message.recipient = reader.string()
                    break
                case 3:
                    message.scheduledFor = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgCancelDisbursement {
        const message = {
            ...baseMsgCancelDisbursement,
        } as MsgCancelDisbursement
        if (object.manager !== undefined && object.manager !== null) {
            message.manager = String(object.manager)
        } else {
            message.manager = ''
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient)
        } else {
            message.recipient = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = String(object.scheduledFor)
        } else {
            message.scheduledFor = ''
        }
        return message
    },

    toJSON(message: MsgCancelDisbursement): unknown {
        const obj: any = {}
        message.manager !== undefined && (obj.manager = message.manager)
        message.recipient !== undefined && (obj.recipient = message.recipient)
        message.scheduledFor !== undefined && (obj.scheduledFor = message.scheduledFor)
        return obj
    },

    fromPartial(object: DeepPartial<MsgCancelDisbursement>): MsgCancelDisbursement {
        const message = {
            ...baseMsgCancelDisbursement,
        } as MsgCancelDisbursement
        if (object.manager !== undefined && object.manager !== null) {
            message.manager = object.manager
        } else {
            message.manager = ''
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient
        } else {
            message.recipient = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = object.scheduledFor
        } else {
            message.scheduledFor = ''
        }
        return message
    },
}

const baseMsgCancelDisbursementResponse: object = {}

export const MsgCancelDisbursementResponse = {
    encode(_: MsgCancelDisbursementResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelDisbursementResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgCancelDisbursementResponse,
        } as MsgCancelDisbursementResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(_: any): MsgCancelDisbursementResponse {
        const message = {
            ...baseMsgCancelDisbursementResponse,
        } as MsgCancelDisbursementResponse
        return message
    },

    toJSON(_: MsgCancelDisbursementResponse): unknown {
        const obj: any = {}
        return obj
    },

    fromPartial(_: DeepPartial<MsgCancelDisbursementResponse>): MsgCancelDisbursementResponse {
        const message = {
            ...baseMsgCancelDisbursementResponse,
        } as MsgCancelDisbursementResponse
        return message
    },
}

const baseMsgApproveDisbursement: object = {
    manager: '',
    recipient: '',
    scheduledFor: '',
}

export const MsgApproveDisbursement = {
    encode(message: MsgApproveDisbursement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.manager !== '') {
            writer.uint32(10).string(message.manager)
        }
        if (message.recipient !== '') {
            writer.uint32(18).string(message.recipient)
        }
        if (message.scheduledFor !== '') {
            writer.uint32(26).string(message.scheduledFor)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveDisbursement {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgApproveDisbursement,
        } as MsgApproveDisbursement
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.manager = reader.string()
                    break
                case 2:
                    message.recipient = reader.string()
                    break
                case 3:
                    message.scheduledFor = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgApproveDisbursement {
        const message = {
            ...baseMsgApproveDisbursement,
        } as MsgApproveDisbursement
        if (object.manager !== undefined && object.manager !== null) {
            message.manager = String(object.manager)
        } else {
            message.manager = ''
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = String(object.recipient)
        } else {
            message.recipient = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = String(object.scheduledFor)
        } else {
            message.scheduledFor = ''
        }
        return message
    },

    toJSON(message: MsgApproveDisbursement): unknown {
        const obj: any = {}
        message.manager !== undefined && (obj.manager = message.manager)
        message.recipient !== undefined && (obj.recipient = message.recipient)
        message.scheduledFor !== undefined && (obj.scheduledFor = message.scheduledFor)
        return obj
    },

    fromPartial(object: DeepPartial<MsgApproveDisbursement>): MsgApproveDisbursement {
        const message = {
            ...baseMsgApproveDisbursement,
        } as MsgApproveDisbursement
        if (object.manager !== undefined && object.manager !== null) {
            message.manager = object.manager
        } else {
            message.manager = ''
        }
        if (object.recipient !== undefined && object.recipient !== null) {
            message.recipient = object.recipient
        } else {
            message.recipient = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = object.scheduledFor
        } else {
            message.scheduledFor = ''
        }
        return message
    },
}

const baseMsgApproveDisbursementResponse: object = {}

export const MsgApproveDisbursementResponse = {
    encode(
        _: MsgApproveDisbursementResponse,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveDisbursementResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgApproveDisbursementResponse,
        } as MsgApproveDisbursementResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(_: any): MsgApproveDisbursementResponse {
        const message = {
            ...baseMsgApproveDisbursementResponse,
        } as MsgApproveDisbursementResponse
        return message
    },

    toJSON(_: MsgApproveDisbursementResponse): unknown {
        const obj: any = {}
        return obj
    },

    fromPartial(_: DeepPartial<MsgApproveDisbursementResponse>): MsgApproveDisbursementResponse {
        const message = {
            ...baseMsgApproveDisbursementResponse,
        } as MsgApproveDisbursementResponse
        return message
    },
}

const baseMsgBurn: object = { operator: '' }

export const MsgBurn = {
    encode(message: MsgBurn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.operator !== '') {
            writer.uint32(10).string(message.operator)
        }
        for (const v of message.amount) {
            Coin.encode(v!, writer.uint32(18).fork()).ldelim()
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurn {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgBurn } as MsgBurn
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
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgBurn {
        const message = { ...baseMsgBurn } as MsgBurn
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
        return message
    },

    toJSON(message: MsgBurn): unknown {
        const obj: any = {}
        message.operator !== undefined && (obj.operator = message.operator)
        if (message.amount) {
            obj.amount = message.amount.map(e => (e ? Coin.toJSON(e) : undefined))
        } else {
            obj.amount = []
        }
        return obj
    },

    fromPartial(object: DeepPartial<MsgBurn>): MsgBurn {
        const message = { ...baseMsgBurn } as MsgBurn
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
        return message
    },
}

const baseMsgBurnResponse: object = {}

export const MsgBurnResponse = {
    encode(_: MsgBurnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgBurnResponse } as MsgBurnResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(_: any): MsgBurnResponse {
        const message = { ...baseMsgBurnResponse } as MsgBurnResponse
        return message
    },

    toJSON(_: MsgBurnResponse): unknown {
        const obj: any = {}
        return obj
    },

    fromPartial(_: DeepPartial<MsgBurnResponse>): MsgBurnResponse {
        const message = { ...baseMsgBurnResponse } as MsgBurnResponse
        return message
    },
}

const baseMsgCancelBurn: object = { manager: '', scheduledFor: '' }

export const MsgCancelBurn = {
    encode(message: MsgCancelBurn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.manager !== '') {
            writer.uint32(10).string(message.manager)
        }
        if (message.scheduledFor !== '') {
            writer.uint32(18).string(message.scheduledFor)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelBurn {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgCancelBurn } as MsgCancelBurn
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.manager = reader.string()
                    break
                case 2:
                    message.scheduledFor = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgCancelBurn {
        const message = { ...baseMsgCancelBurn } as MsgCancelBurn
        if (object.manager !== undefined && object.manager !== null) {
            message.manager = String(object.manager)
        } else {
            message.manager = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = String(object.scheduledFor)
        } else {
            message.scheduledFor = ''
        }
        return message
    },

    toJSON(message: MsgCancelBurn): unknown {
        const obj: any = {}
        message.manager !== undefined && (obj.manager = message.manager)
        message.scheduledFor !== undefined && (obj.scheduledFor = message.scheduledFor)
        return obj
    },

    fromPartial(object: DeepPartial<MsgCancelBurn>): MsgCancelBurn {
        const message = { ...baseMsgCancelBurn } as MsgCancelBurn
        if (object.manager !== undefined && object.manager !== null) {
            message.manager = object.manager
        } else {
            message.manager = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = object.scheduledFor
        } else {
            message.scheduledFor = ''
        }
        return message
    },
}

const baseMsgCancelBurnResponse: object = {}

export const MsgCancelBurnResponse = {
    encode(_: MsgCancelBurnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelBurnResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgCancelBurnResponse,
        } as MsgCancelBurnResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(_: any): MsgCancelBurnResponse {
        const message = {
            ...baseMsgCancelBurnResponse,
        } as MsgCancelBurnResponse
        return message
    },

    toJSON(_: MsgCancelBurnResponse): unknown {
        const obj: any = {}
        return obj
    },

    fromPartial(_: DeepPartial<MsgCancelBurnResponse>): MsgCancelBurnResponse {
        const message = {
            ...baseMsgCancelBurnResponse,
        } as MsgCancelBurnResponse
        return message
    },
}

const baseMsgApproveBurn: object = { manager: '', scheduledFor: '' }

export const MsgApproveBurn = {
    encode(message: MsgApproveBurn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.manager !== '') {
            writer.uint32(10).string(message.manager)
        }
        if (message.scheduledFor !== '') {
            writer.uint32(18).string(message.scheduledFor)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveBurn {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgApproveBurn } as MsgApproveBurn
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.manager = reader.string()
                    break
                case 2:
                    message.scheduledFor = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgApproveBurn {
        const message = { ...baseMsgApproveBurn } as MsgApproveBurn
        if (object.manager !== undefined && object.manager !== null) {
            message.manager = String(object.manager)
        } else {
            message.manager = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = String(object.scheduledFor)
        } else {
            message.scheduledFor = ''
        }
        return message
    },

    toJSON(message: MsgApproveBurn): unknown {
        const obj: any = {}
        message.manager !== undefined && (obj.manager = message.manager)
        message.scheduledFor !== undefined && (obj.scheduledFor = message.scheduledFor)
        return obj
    },

    fromPartial(object: DeepPartial<MsgApproveBurn>): MsgApproveBurn {
        const message = { ...baseMsgApproveBurn } as MsgApproveBurn
        if (object.manager !== undefined && object.manager !== null) {
            message.manager = object.manager
        } else {
            message.manager = ''
        }
        if (object.scheduledFor !== undefined && object.scheduledFor !== null) {
            message.scheduledFor = object.scheduledFor
        } else {
            message.scheduledFor = ''
        }
        return message
    },
}

const baseMsgApproveBurnResponse: object = {}

export const MsgApproveBurnResponse = {
    encode(_: MsgApproveBurnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveBurnResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgApproveBurnResponse,
        } as MsgApproveBurnResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(_: any): MsgApproveBurnResponse {
        const message = {
            ...baseMsgApproveBurnResponse,
        } as MsgApproveBurnResponse
        return message
    },

    toJSON(_: MsgApproveBurnResponse): unknown {
        const obj: any = {}
        return obj
    },

    fromPartial(_: DeepPartial<MsgApproveBurnResponse>): MsgApproveBurnResponse {
        const message = {
            ...baseMsgApproveBurnResponse,
        } as MsgApproveBurnResponse
        return message
    },
}

/** Msg defines the distribution Msg service. */
export interface Msg {
    AddOperator(request: MsgAddOperator): Promise<MsgAddOperatorResponse>
    RemoveOperator(request: MsgRemoveOperator): Promise<MsgRemoveOperatorResponse>
    Disburse(request: MsgDisburse): Promise<MsgDisburseResponse>
    CancelDisbursement(request: MsgCancelDisbursement): Promise<MsgCancelDisbursementResponse>
    ApproveDisbursement(request: MsgApproveDisbursement): Promise<MsgApproveDisbursementResponse>
    Burn(request: MsgBurn): Promise<MsgBurnResponse>
    CancelBurn(request: MsgCancelBurn): Promise<MsgCancelBurnResponse>
    ApproveBurn(request: MsgApproveBurn): Promise<MsgApproveBurnResponse>
}

export class MsgClientImpl implements Msg {
    private readonly rpc: Rpc
    constructor(rpc: Rpc) {
        this.rpc = rpc
    }
    AddOperator(request: MsgAddOperator): Promise<MsgAddOperatorResponse> {
        const data = MsgAddOperator.encode(request).finish()
        const promise = this.rpc.request('mele.treasury.v1beta1.Msg', 'AddOperator', data)
        return promise.then(data => MsgAddOperatorResponse.decode(new _m0.Reader(data)))
    }

    RemoveOperator(request: MsgRemoveOperator): Promise<MsgRemoveOperatorResponse> {
        const data = MsgRemoveOperator.encode(request).finish()
        const promise = this.rpc.request('mele.treasury.v1beta1.Msg', 'RemoveOperator', data)
        return promise.then(data => MsgRemoveOperatorResponse.decode(new _m0.Reader(data)))
    }

    Disburse(request: MsgDisburse): Promise<MsgDisburseResponse> {
        const data = MsgDisburse.encode(request).finish()
        const promise = this.rpc.request('mele.treasury.v1beta1.Msg', 'Disburse', data)
        return promise.then(data => MsgDisburseResponse.decode(new _m0.Reader(data)))
    }

    CancelDisbursement(request: MsgCancelDisbursement): Promise<MsgCancelDisbursementResponse> {
        const data = MsgCancelDisbursement.encode(request).finish()
        const promise = this.rpc.request('mele.treasury.v1beta1.Msg', 'CancelDisbursement', data)
        return promise.then(data => MsgCancelDisbursementResponse.decode(new _m0.Reader(data)))
    }

    ApproveDisbursement(request: MsgApproveDisbursement): Promise<MsgApproveDisbursementResponse> {
        const data = MsgApproveDisbursement.encode(request).finish()
        const promise = this.rpc.request('mele.treasury.v1beta1.Msg', 'ApproveDisbursement', data)
        return promise.then(data => MsgApproveDisbursementResponse.decode(new _m0.Reader(data)))
    }

    Burn(request: MsgBurn): Promise<MsgBurnResponse> {
        const data = MsgBurn.encode(request).finish()
        const promise = this.rpc.request('mele.treasury.v1beta1.Msg', 'Burn', data)
        return promise.then(data => MsgBurnResponse.decode(new _m0.Reader(data)))
    }

    CancelBurn(request: MsgCancelBurn): Promise<MsgCancelBurnResponse> {
        const data = MsgCancelBurn.encode(request).finish()
        const promise = this.rpc.request('mele.treasury.v1beta1.Msg', 'CancelBurn', data)
        return promise.then(data => MsgCancelBurnResponse.decode(new _m0.Reader(data)))
    }

    ApproveBurn(request: MsgApproveBurn): Promise<MsgApproveBurnResponse> {
        const data = MsgApproveBurn.encode(request).finish()
        const promise = this.rpc.request('mele.treasury.v1beta1.Msg', 'ApproveBurn', data)
        return promise.then(data => MsgApproveBurnResponse.decode(new _m0.Reader(data)))
    }
}

interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
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
