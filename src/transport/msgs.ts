import { TypeFactory, Types } from 'js-amino'

export const Msgs = {
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