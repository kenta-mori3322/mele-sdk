import { TypeFactory, Types } from 'js-amino'
import { registerConcrete } from '../../transport/codec'

export const Codec = {
    'treasury/AddOperator': TypeFactory.create('AddOperator', [
        {
            name: 'sender',
            type: Types.String,
        },
        {
            name: 'operator',
            type: Types.String,
        },
    ]),
    'treasury/RemoveOperator': TypeFactory.create('RemoveOperator', [
        {
            name: 'sender',
            type: Types.String,
        },
        {
            name: 'operator',
            type: Types.String,
        },
    ]),
    'treasury/Disburse': TypeFactory.create('Disburse', [
        {
            name: 'operator',
            type: Types.String,
        },
        {
            name: 'recipient',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
        {
            name: 'reference',
            type: Types.String,
        },
    ]),
    'treasury/ApproveDisbursement': TypeFactory.create('ApproveDisbursement', [
        {
            name: 'manager',
            type: Types.String,
        },
        {
            name: 'recipient',
            type: Types.String,
        },
        {
            name: 'scheduled_for',
            type: Types.String,
        },
    ]),
    'treasury/CancelDisbursement': TypeFactory.create('CancelDisbursement', [
        {
            name: 'manager',
            type: Types.String,
        },
        {
            name: 'recipient',
            type: Types.String,
        },
        {
            name: 'scheduled_for',
            type: Types.String,
        },
    ]),
    'treasury/Burn': TypeFactory.create('Burn', [
        {
            name: 'operator',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'treasury/ApproveBurn': TypeFactory.create('ApproveBurn', [
        {
            name: 'manager',
            type: Types.String,
        },
        {
            name: 'scheduled_for',
            type: Types.String,
        },
    ]),
    'treasury/CancelBurn': TypeFactory.create('CancelBurn', [
        {
            name: 'manager',
            type: Types.String,
        },
        {
            name: 'scheduled_for',
            type: Types.String,
        },
    ]),
}

Object.keys(Codec).forEach(codec => registerConcrete(codec, Codec[codec]))
