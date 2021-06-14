/* eslint-disable */
import Long from 'long'
import _m0 from 'protobufjs/minimal'
import { Params } from '../../../mele/fee/v1beta1/fee'

export const protobufPackage = 'mele.fee.v1beta1'

/** GenesisState defines the fee module's genesis state. */
export interface GenesisState {
    params?: Params
    feeExcludedMessages: string[]
}

const baseGenesisState: object = { feeExcludedMessages: '' }

export const GenesisState = {
    encode(
        message: GenesisState,
        writer: _m0.Writer = _m0.Writer.create()
    ): _m0.Writer {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim()
        }
        for (const v of message.feeExcludedMessages) {
            writer.uint32(18).string(v!)
        }
        return writer
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
        const reader =
            input instanceof _m0.Reader ? input : new _m0.Reader(input)
        let end = length === undefined ? reader.len : reader.pos + length
        const message = { ...baseGenesisState } as GenesisState
        message.feeExcludedMessages = []
        while (reader.pos < end) {
            const tag = reader.uint32()
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32())
                    break
                case 2:
                    message.feeExcludedMessages.push(reader.string())
                    break
                default:
                    reader.skipType(tag & 7)
                    break
            }
        }
        return message
    },

    fromJSON(object: any): GenesisState {
        const message = { ...baseGenesisState } as GenesisState
        message.feeExcludedMessages = []
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params)
        } else {
            message.params = undefined
        }
        if (
            object.feeExcludedMessages !== undefined &&
            object.feeExcludedMessages !== null
        ) {
            for (const e of object.feeExcludedMessages) {
                message.feeExcludedMessages.push(String(e))
            }
        }
        return message
    },

    toJSON(message: GenesisState): unknown {
        const obj: any = {}
        message.params !== undefined &&
            (obj.params = message.params
                ? Params.toJSON(message.params)
                : undefined)
        if (message.feeExcludedMessages) {
            obj.feeExcludedMessages = message.feeExcludedMessages.map(e => e)
        } else {
            obj.feeExcludedMessages = []
        }
        return obj
    },

    fromPartial(object: DeepPartial<GenesisState>): GenesisState {
        const message = { ...baseGenesisState } as GenesisState
        message.feeExcludedMessages = []
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params)
        } else {
            message.params = undefined
        }
        if (
            object.feeExcludedMessages !== undefined &&
            object.feeExcludedMessages !== null
        ) {
            for (const e of object.feeExcludedMessages) {
                message.feeExcludedMessages.push(e)
            }
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
