import { Codec, TypeFactory, Types } from 'js-amino'

import { Msgs } from './msgs'

export const StdTx = TypeFactory.create('StdTx', [
    {
        name: 'msg',
        type: Types.ArrayInterface,
    },
    {
        name: 'fee',
        type: Types.Struct,
    },
    {
        name: 'signatures',
        type: Types.ArrayStruct,
    },
    {
        name: 'memo',
        type: Types.String,
    },
])

export const Coin = TypeFactory.create('coin', [
    {
        name: 'denom',
        type: Types.String,
    },
    {
        name: 'amount',
        type: Types.String,
    },
])

export const Fee = TypeFactory.create('fee', [
    {
        name: 'amount',
        type: Types.ArrayStruct,
    },
    {
        name: 'gas',
        type: Types.Int64,
    },
])

export const PubKeySecp256k1 = TypeFactory.create(
    'PubKeySecp256k1',
    [
        {
            name: 's',
            type: Types.ByteSlice,
        },
    ],
    Types.ByteSlice
)

export const Signature = TypeFactory.create('signature', [
    {
        name: 'pub_key',
        type: Types.Interface,
    },
    {
        name: 'signature',
        type: Types.ByteSlice,
    },
])

const codec = new Codec()

codec.registerConcrete(new StdTx(), 'cosmos-sdk/StdTx', {})
codec.registerConcrete(new PubKeySecp256k1(), 'tendermint/PubKeySecp256k1', {})
Object.keys(Msgs).forEach((msg) => {
    codec.registerConcrete(new Msgs[msg](), msg, {})
})

export const marshalBinary = (tx) => {
    return Buffer.from(codec.marshalBinary(tx)).toString('base64')
}
