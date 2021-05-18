/* eslint-disable */
import Long from 'long'
import _m0 from 'protobufjs/minimal'
import { Any } from '../../../google/protobuf/any'

export const protobufPackage = 'mele.control.v1beta1'

/** Params defines the set of params for the control module. */
export interface Params {
    enabled: boolean
    managers: string[]
}

export interface Execution {
    content?: Any
    id: Long
    submitTime: string
    executor: string
}

const baseParams: object = { enabled: false, managers: '' }

export const Params = {
    encode(
        message: Params,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.enabled === true) {
            writer.uint32(8).bool(message.enabled)
        }
        for (const v of message.managers) {
            writer.uint32(18).string(v!)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseParams } as Params
        message.managers = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.enabled = reader.bool()
                    break
                case 2:
                    message.managers.push(reader.string())
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
        if (object.enabled !== undefined && object.enabled !== null) {
            message.enabled = Boolean(object.enabled)
        } else {
            message.enabled = false
        }
        if (object.managers !== undefined && object.managers !== null) {
            for (const e of object.managers) {
                message.managers.push(String(e))
            }
        }
        return message
    },

    toJSON(message: Params): unknown {
        const obj: any = {}
        message.enabled !== undefined && (obj.enabled = message.enabled)
        if (message.managers) {
            obj.managers = message.managers.map(e => e)
        } else {
            obj.managers = []
        }
        return obj
    },

    fromPartial(object: DeepPartial<Params>): Params {
        const message = { ...baseParams } as Params
        message.managers = []
        if (object.enabled !== undefined && object.enabled !== null) {
            message.enabled = object.enabled
        } else {
            message.enabled = false
        }
        if (object.managers !== undefined && object.managers !== null) {
            for (const e of object.managers) {
                message.managers.push(e)
            }
        }
        return message
    },
}

const baseExecution: object = { id: Long.UZERO, submitTime: '', executor: '' }

export const Execution = {
    encode(
        message: Execution,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.content !== undefined) {
            Any.encode(message.content, writer.uint32(10).fork()).ldelim()
        }
        if (!message.id.isZero()) {
            writer.uint32(16).uint64(message.id)
        }
        if (message.submitTime !== '') {
            writer.uint32(26).string(message.submitTime)
        }
        if (message.executor !== '') {
            writer.uint32(34).string(message.executor)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Execution {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseExecution } as Execution
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.content = Any.decode(reader, reader.uint32())
                    break
                case 2:
                    message.id = reader.uint64() as Long
                    break
                case 3:
                    message.submitTime = reader.string()
                    break
                case 4:
                    message.executor = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): Execution {
        const message = { ...baseExecution } as Execution
        if (object.content !== undefined && object.content !== null) {
            message.content = Any.fromJSON(object.content)
        } else {
            message.content = undefined
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = Long.fromString(object.id)
        } else {
            message.id = Long.UZERO
        }
        if (object.submitTime !== undefined && object.submitTime !== null) {
            message.submitTime = String(object.submitTime)
        } else {
            message.submitTime = ''
        }
        if (object.executor !== undefined && object.executor !== null) {
            message.executor = String(object.executor)
        } else {
            message.executor = ''
        }
        return message
    },

    toJSON(message: Execution): unknown {
        const obj: any = {}
        message.content !== undefined &&
            (obj.content = message.content
                ? Any.toJSON(message.content)
                : undefined)
        message.id !== undefined &&
            (obj.id = (message.id || Long.UZERO).toString())
        message.submitTime !== undefined &&
            (obj.submitTime = message.submitTime)
        message.executor !== undefined && (obj.executor = message.executor)
        return obj
    },

    fromPartial(object: DeepPartial<Execution>): Execution {
        const message = { ...baseExecution } as Execution
        if (object.content !== undefined && object.content !== null) {
            message.content = Any.fromPartial(object.content)
        } else {
            message.content = undefined
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id as Long
        } else {
            message.id = Long.UZERO
        }
        if (object.submitTime !== undefined && object.submitTime !== null) {
            message.submitTime = object.submitTime
        } else {
            message.submitTime = ''
        }
        if (object.executor !== undefined && object.executor !== null) {
            message.executor = object.executor
        } else {
            message.executor = ''
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
