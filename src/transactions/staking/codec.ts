import { TypeFactory, Types } from 'js-amino'
import { registerConcrete } from '../../transport/codec'

export const Codec = {
    'cosmos-sdk/MsgCreateValidator': TypeFactory.create('MsgCreateValidator', [
        {
            name: 'description',
            type: Types.Struct,
        },
        {
            name: 'commission',
            type: Types.Struct,
        },
        {
            name: 'min_self_delegation',
            type: Types.String,
        },
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_address',
            type: Types.String,
        },
        {
            name: 'pubkey',
            type: Types.String,
        },
        {
            name: 'value',
            type: Types.Struct,
        },
    ]),
    Commission: TypeFactory.create('Commission', [
        {
            name: 'rate',
            type: Types.String,
        },
        {
            name: 'max_rate',
            type: Types.String,
        },
        {
            name: 'max_change_rate',
            type: Types.String,
        },
    ]),
    Description: TypeFactory.create('Description', [
        {
            name: 'moniker',
            type: Types.String,
        },
        {
            name: 'identity',
            type: Types.String,
        },
        {
            name: 'website',
            type: Types.String,
        },
        {
            name: 'security_contact',
            type: Types.String,
        },
        {
            name: 'details',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgEditValidator': TypeFactory.create('MsgEditValidator', [
        {
            name: 'description',
            type: Types.Struct,
        },
        {
            name: 'address',
            type: Types.String,
        },
        {
            name: 'commission_rate',
            type: Types.String,
        },
        {
            name: 'min_self_delegation',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgDelegate': TypeFactory.create('MsgDelegate', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_address',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.Struct,
        },
    ]),
    'cosmos-sdk/MsgUndelegate': TypeFactory.create('MsgUndelegate', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_address',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.Struct,
        },
    ]),
    'cosmos-sdk/MsgBeginRedelegate': TypeFactory.create('MsgBeginRedelegate', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_src_address',
            type: Types.String,
        },
        {
            name: 'validator_dst_address',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.Struct,
        },
    ]),
}

Object.keys(Codec).forEach(codec => registerConcrete(codec, Codec[codec]))
