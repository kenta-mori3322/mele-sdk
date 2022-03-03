/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  Pool,
  PoolMetadata,
  PoolBatch,
  DepositMsgState,
  WithdrawMsgState,
  SwapMsgState,
  Params,
} from "../../../mele/liquidity/v1beta1/liquidity";

export const protobufPackage = "mele.liquidity.v1beta1";

/**
 * records the state of each pool after genesis export or import, used to check
 * variables
 */
export interface PoolRecord {
  pool: Pool | undefined;
  poolMetadata: PoolMetadata | undefined;
  poolBatch: PoolBatch | undefined;
  depositMsgStates: DepositMsgState[];
  withdrawMsgStates: WithdrawMsgState[];
  swapMsgStates: SwapMsgState[];
}

/** GenesisState defines the liquidity module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters for the liquidity module. */
  params: Params | undefined;
  poolRecords: PoolRecord[];
}

function createBasePoolRecord(): PoolRecord {
  return {
    pool: undefined,
    poolMetadata: undefined,
    poolBatch: undefined,
    depositMsgStates: [],
    withdrawMsgStates: [],
    swapMsgStates: [],
  };
}

export const PoolRecord = {
  encode(
    message: PoolRecord,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.poolMetadata !== undefined) {
      PoolMetadata.encode(
        message.poolMetadata,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.poolBatch !== undefined) {
      PoolBatch.encode(message.poolBatch, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.depositMsgStates) {
      DepositMsgState.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.withdrawMsgStates) {
      WithdrawMsgState.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.swapMsgStates) {
      SwapMsgState.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        case 2:
          message.poolMetadata = PoolMetadata.decode(reader, reader.uint32());
          break;
        case 3:
          message.poolBatch = PoolBatch.decode(reader, reader.uint32());
          break;
        case 4:
          message.depositMsgStates.push(
            DepositMsgState.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.withdrawMsgStates.push(
            WithdrawMsgState.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.swapMsgStates.push(
            SwapMsgState.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolRecord {
    return {
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
      poolMetadata: isSet(object.poolMetadata)
        ? PoolMetadata.fromJSON(object.poolMetadata)
        : undefined,
      poolBatch: isSet(object.poolBatch)
        ? PoolBatch.fromJSON(object.poolBatch)
        : undefined,
      depositMsgStates: Array.isArray(object?.depositMsgStates)
        ? object.depositMsgStates.map((e: any) => DepositMsgState.fromJSON(e))
        : [],
      withdrawMsgStates: Array.isArray(object?.withdrawMsgStates)
        ? object.withdrawMsgStates.map((e: any) => WithdrawMsgState.fromJSON(e))
        : [],
      swapMsgStates: Array.isArray(object?.swapMsgStates)
        ? object.swapMsgStates.map((e: any) => SwapMsgState.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PoolRecord): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    message.poolMetadata !== undefined &&
      (obj.poolMetadata = message.poolMetadata
        ? PoolMetadata.toJSON(message.poolMetadata)
        : undefined);
    message.poolBatch !== undefined &&
      (obj.poolBatch = message.poolBatch
        ? PoolBatch.toJSON(message.poolBatch)
        : undefined);
    if (message.depositMsgStates) {
      obj.depositMsgStates = message.depositMsgStates.map((e) =>
        e ? DepositMsgState.toJSON(e) : undefined
      );
    } else {
      obj.depositMsgStates = [];
    }
    if (message.withdrawMsgStates) {
      obj.withdrawMsgStates = message.withdrawMsgStates.map((e) =>
        e ? WithdrawMsgState.toJSON(e) : undefined
      );
    } else {
      obj.withdrawMsgStates = [];
    }
    if (message.swapMsgStates) {
      obj.swapMsgStates = message.swapMsgStates.map((e) =>
        e ? SwapMsgState.toJSON(e) : undefined
      );
    } else {
      obj.swapMsgStates = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoolRecord>, I>>(
    object: I
  ): PoolRecord {
    const message = createBasePoolRecord();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    message.poolMetadata =
      object.poolMetadata !== undefined && object.poolMetadata !== null
        ? PoolMetadata.fromPartial(object.poolMetadata)
        : undefined;
    message.poolBatch =
      object.poolBatch !== undefined && object.poolBatch !== null
        ? PoolBatch.fromPartial(object.poolBatch)
        : undefined;
    message.depositMsgStates =
      object.depositMsgStates?.map((e) => DepositMsgState.fromPartial(e)) || [];
    message.withdrawMsgStates =
      object.withdrawMsgStates?.map((e) => WithdrawMsgState.fromPartial(e)) ||
      [];
    message.swapMsgStates =
      object.swapMsgStates?.map((e) => SwapMsgState.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return { params: undefined, poolRecords: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.poolRecords) {
      PoolRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.poolRecords.push(PoolRecord.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      poolRecords: Array.isArray(object?.poolRecords)
        ? object.poolRecords.map((e: any) => PoolRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.poolRecords) {
      obj.poolRecords = message.poolRecords.map((e) =>
        e ? PoolRecord.toJSON(e) : undefined
      );
    } else {
      obj.poolRecords = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.poolRecords =
      object.poolRecords?.map((e) => PoolRecord.fromPartial(e)) || [];
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
