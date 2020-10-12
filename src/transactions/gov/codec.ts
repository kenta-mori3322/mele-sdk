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
    'cosmos-sdk/TextProposal': TypeFactory.create('TextProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/ParameterChangeProposal': TypeFactory.create('ParameterChangeProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'changes',
            type: Types.ArrayStruct,
        },
    ]),
    ParamChange: TypeFactory.create('ParamChange', [
        {
            name: 'subspace',
            type: Types.String,
        },
        {
            name: 'key',
            type: Types.String,
        },
        {
            name: 'value',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/CommunityPoolSpendProposal': TypeFactory.create('CommunityPoolSpendProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
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
    ]),
    'cosmos-sdk/BurnedPoolSpendProposal': TypeFactory.create('BurnedPoolSpendProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
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
    ]),
    'treasury/MintTreasurySupplyProposal': TypeFactory.create('MintTreasurySupplyProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'treasury/BurnTreasurySupplyProposal': TypeFactory.create('BurnTreasurySupplyProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'cosmos-sdk/SoftwareUpgradeProposal': TypeFactory.create('SoftwareUpgradeProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'plan',
            type: Types.Struct,
        },
    ]),
    UpgradePlan: TypeFactory.create('UpgradePlan', [
        {
            name: 'name',
            type: Types.String,
        },
        {
            name: 'height',
            type: Types.Int64,
        },
        {
            name: 'planInfo',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/CancelSoftwareUpgradeProposal': TypeFactory.create('CancelSoftwareUpgradeProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
    ]),
}

Object.keys(Codec).forEach(codec => registerConcrete(codec, Codec[codec]))
