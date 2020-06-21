import { TypeFactory, Types } from 'js-amino'
import { registerConcrete } from '../../transport/codec'

export const Codec = {
    'cosmos-sdk/MsgSend': TypeFactory.create('MsgSend', [
        {
            name: 'from_address',
            type: Types.String,
        },
        {
            name: 'to_address',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
}

Object.keys(Codec).forEach((codec) => registerConcrete(codec, Codec[codec]))
