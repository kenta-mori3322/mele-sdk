import { TypeFactory, Types } from 'js-amino'
import { registerConcrete } from '../../transport/codec'

export const Codec = {
    'cosmos-sdk/MsgSubmitExecution': TypeFactory.create('MsgSubmitExecution', [
        {
            name: 'content',
            type: Types.Interface,
        },
        {
            name: 'executor',
            type: Types.String,
        },
    ]),
}

Object.keys(Codec).forEach(codec => registerConcrete(codec, Codec[codec]))
