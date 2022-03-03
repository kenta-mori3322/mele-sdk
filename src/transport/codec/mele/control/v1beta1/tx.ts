/* eslint-disable */
import Long from 'long'
import _m0 from 'protobufjs/minimal'
import { Any } from '../../../google/protobuf/any'

export const protobufPackage = 'mele.control.v1beta1'

export interface MsgSubmitExecution {
    content?: Any
    executor: string
}

export interface MsgSubmitExecutionResponse {
    ExecutionID: Long
}

const baseMsgSubmitExecution: object = { executor: '' }

export const MsgSubmitExecution = {
    encode(message: MsgSubmitExecution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.content !== undefined) {
            Any.encode(message.content, writer.uint32(10).fork()).ldelim()
        }
        if (message.executor !== '') {
            writer.uint32(18).string(message.executor)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitExecution {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseMsgSubmitExecution } as MsgSubmitExecution
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.content = Any.decode(reader, reader.uint32())
                    break
                case 2:
                    message.executor = reader.string()
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgSubmitExecution {
        const message = { ...baseMsgSubmitExecution } as MsgSubmitExecution
        if (object.content !== undefined && object.content !== null) {
            message.content = Any.fromJSON(object.content)
        } else {
            message.content = undefined
        }
        if (object.executor !== undefined && object.executor !== null) {
            message.executor = String(object.executor)
        } else {
            message.executor = ''
        }
        return message
    },

    toJSON(message: MsgSubmitExecution): unknown {
        const obj: any = {}
        message.content !== undefined &&
            (obj.content = message.content ? Any.toJSON(message.content) : undefined)
        message.executor !== undefined && (obj.executor = message.executor)
        return obj
    },

    fromPartial(object: DeepPartial<MsgSubmitExecution>): MsgSubmitExecution {
        const message = { ...baseMsgSubmitExecution } as MsgSubmitExecution
        if (object.content !== undefined && object.content !== null) {
            message.content = Any.fromPartial(object.content)
        } else {
            message.content = undefined
        }
        if (object.executor !== undefined && object.executor !== null) {
            message.executor = object.executor
        } else {
            message.executor = ''
        }
        return message
    },
}

const baseMsgSubmitExecutionResponse: object = { ExecutionID: Long.UZERO }

export const MsgSubmitExecutionResponse = {
    encode(
        message: MsgSubmitExecutionResponse,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (!message.ExecutionID.isZero()) {
            writer.uint32(16).uint64(message.ExecutionID)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitExecutionResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = {
            ...baseMsgSubmitExecutionResponse,
        } as MsgSubmitExecutionResponse
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 2:
                    message.ExecutionID = reader.uint64() as Long
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): MsgSubmitExecutionResponse {
        const message = {
            ...baseMsgSubmitExecutionResponse,
        } as MsgSubmitExecutionResponse
        if (object.ExecutionID !== undefined && object.ExecutionID !== null) {
            message.ExecutionID = Long.fromString(object.ExecutionID)
        } else {
            message.ExecutionID = Long.UZERO
        }
        return message
    },

    toJSON(message: MsgSubmitExecutionResponse): unknown {
        const obj: any = {}
        message.ExecutionID !== undefined &&
            (obj.ExecutionID = (message.ExecutionID || Long.UZERO).toString())
        return obj
    },

    fromPartial(object: DeepPartial<MsgSubmitExecutionResponse>): MsgSubmitExecutionResponse {
        const message = {
            ...baseMsgSubmitExecutionResponse,
        } as MsgSubmitExecutionResponse
        if (object.ExecutionID !== undefined && object.ExecutionID !== null) {
            message.ExecutionID = object.ExecutionID as Long
        } else {
            message.ExecutionID = Long.UZERO
        }
        return message
    },
}

/** Msg defines the distribution Msg service. */
export interface Msg {
    SubmitExecution(request: MsgSubmitExecution): Promise<MsgSubmitExecutionResponse>
}

export class MsgClientImpl implements Msg {
    private readonly rpc: Rpc
    constructor(rpc: Rpc) {
        this.rpc = rpc
    }
    SubmitExecution(request: MsgSubmitExecution): Promise<MsgSubmitExecutionResponse> {
        const data = MsgSubmitExecution.encode(request).finish()
        const promise = this.rpc.request('mele.control.v1beta1.Msg', 'SubmitExecution', data)
        return promise.then(data => MsgSubmitExecutionResponse.decode(new _m0.Reader(data)))
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
