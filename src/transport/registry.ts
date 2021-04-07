import { GeneratedType, Registry } from '@cosmjs/proto-signing'

import { MsgMultiSend } from './codec/cosmos/bank/v1beta1/tx'

export const defaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ['/cosmos.bank.v1beta1.MsgMultiSend', MsgMultiSend],
]

function createDefaultRegistry(): Registry {
    return new Registry(defaultRegistryTypes)
}

const registry = createDefaultRegistry()

export const getRegistry = () => {
    return registry
}
