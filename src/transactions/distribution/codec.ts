import { TypeFactory, Types } from 'js-amino'
import { registerConcrete } from '../../transport/codec'

export const Codec = {
    'cosmos-sdk/MsgWithdrawDelegationReward': TypeFactory.create('MsgWithdrawDelegationReward', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_address',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgWithdrawValidatorCommission': TypeFactory.create(
        'MsgWithdrawValidatorCommission',
        [
            {
                name: 'validator_address',
                type: Types.String,
            },
        ]
    ),
    'cosmos-sdk/MsgModifyWithdrawAddress': TypeFactory.create('MsgModifyWithdrawAddress', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'withdraw_address',
            type: Types.String,
        },
    ]),
}

Object.keys(Codec).forEach(codec => registerConcrete(codec, Codec[codec]))
