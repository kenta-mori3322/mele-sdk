import { TypeFactory, Types } from 'js-amino'
import { registerConcrete } from '../../transport/codec'

export const Codec = {
    'cosmos-sdk/MsgSubmitProposal': TypeFactory.create('MsgSubmitProposal', [
        {
            name: 'content',
            type: Types.Interface,
        },
        {
            name: 'initial_deposit',
            type: Types.ArrayStruct,
        },
        {
            name: 'proposer',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgDeposit': TypeFactory.create('MsgDeposit', [
        {
            name: 'proposal_id',
            type: Types.Int64,
        },
        {
            name: 'depositor',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'cosmos-sdk/MsgVote': TypeFactory.create('MsgVote', [
        {
            name: 'proposal_id',
            type: Types.Int64,
        },
        {
            name: 'voter',
            type: Types.String,
        },
        {
            name: 'option',
            type: Types.Int32,
        },
    ]),
}

Object.keys(Codec).forEach(codec => registerConcrete(codec, Codec[codec]))
