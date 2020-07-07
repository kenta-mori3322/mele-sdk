import * as Types from '../../common'
import { ITransport } from '../../transport'

namespace Keys {
    export const Query = {
        QueryPath: 'staking',

        ValidatorsPath: 'validators',
        ValidatorPath: 'validator',
        DelegatorDelegationsPath: 'delegatorDelegations',
        DelegatorUnbondingDelegationsPath: 'delegatorUnbondingDelegations',
        RedelegationsPath: 'redelegations',
        ValidatorDelegationsPath: 'validatorDelegations',
        ValidatorRedelegationsPath: 'validatorRedelegations',
        ValidatorUnbondingDelegationsPath: 'validatorUnbondingDelegations',
        DelegationPath: 'delegation',
        UnbondingDelegationPath: 'unbondingDelegation',
        DelegatorValidatorsPath: 'delegatorValidators',
        DelegatorValidatorPath: 'delegatorValidator',
        PoolPath: 'pool',
        ParametersPath: 'parameters',
        HistoricalInfoPath: 'historicalInfo',
    }
}

/**
 * Staking Query
 * @namespace mele.query.staking
 * @type {object}
 * @memberof mele
 */

export default class StakingQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    getValidators(): Promise<Types.Validator[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorsPath = Keys.Query.ValidatorsPath

        return this._transport.query<Types.Validator[]>(
            [],
            JSON.stringify({
                Status: 'Bonded',
                Page: '1',
                Limit: '1000',
            }),
            QueryPath,
            ValidatorsPath
        )
    }

    getValidator(address: string): Promise<Types.Validator> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorPath = Keys.Query.ValidatorPath

        return this._transport.query<Types.Validator>(
            [],
            JSON.stringify({ ValidatorAddr: address }),
            QueryPath,
            ValidatorPath
        )
    }

    getValidatorDelegations(address: string): Promise<Types.Delegation[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorDelegationsPath = Keys.Query.ValidatorDelegationsPath

        return this._transport.query<Types.Delegation[]>(
            [],
            JSON.stringify({ ValidatorAddr: address }),
            QueryPath,
            ValidatorDelegationsPath
        )
    }

    getValidatorUnbondingDelegations(address: string): Promise<Types.Delegation[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorUnbondingDelegationsPath = Keys.Query.ValidatorUnbondingDelegationsPath

        return this._transport.query<Types.Delegation[]>(
            [],
            JSON.stringify({ ValidatorAddr: address }),
            QueryPath,
            ValidatorUnbondingDelegationsPath
        )
    }

    getDelegation(
        delegatorAddress: string,
        validatorAddress: string
    ): Promise<Types.DelegationRes> {
        const QueryPath = Keys.Query.QueryPath
        const DelegationPath = Keys.Query.DelegationPath

        return this._transport.query<Types.DelegationRes>(
            [],
            JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }),
            QueryPath,
            DelegationPath
        )
    }

    getUnbondingDelegation(
        delegatorAddress: string,
        validatorAddress: string
    ): Promise<Types.UnbondingDelegation> {
        const QueryPath = Keys.Query.QueryPath
        const UnbondingDelegationPath = Keys.Query.UnbondingDelegationPath

        return this._transport.query<Types.UnbondingDelegation>(
            [],
            JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }),
            QueryPath,
            UnbondingDelegationPath
        )
    }

    getDelegatorDelegations(delegatorAddress: string): Promise<Types.Delegation[]> {
        const QueryPath = Keys.Query.QueryPath
        const DelegatorDelegationsPath = Keys.Query.DelegatorDelegationsPath

        return this._transport.query<Types.Delegation[]>(
            [],
            JSON.stringify({ DelegatorAddr: delegatorAddress }),
            QueryPath,
            DelegatorDelegationsPath
        )
    }

    getDelegatorUnbondingDelegations(
        delegatorAddress: string
    ): Promise<Types.UnbondingDelegation[]> {
        const QueryPath = Keys.Query.QueryPath
        const DelegatorUnbondingDelegationsPath = Keys.Query.DelegatorUnbondingDelegationsPath

        return this._transport.query<Types.UnbondingDelegation[]>(
            [],
            JSON.stringify({ DelegatorAddr: delegatorAddress }),
            QueryPath,
            DelegatorUnbondingDelegationsPath
        )
    }

    getRedelegations(
        delegatorAddress: string,
        srcValidatorAddress: string,
        dstValidatorAddress: string
    ): Promise<Types.Redelegation[]> {
        const QueryPath = Keys.Query.QueryPath
        const RedelegationsPath = Keys.Query.RedelegationsPath

        return this._transport.query<Types.Redelegation[]>(
            [],
            JSON.stringify({
                DelegatorAddr: delegatorAddress,
                SrcValidatorAddr: srcValidatorAddress,
                DstValidatorAddr: dstValidatorAddress,
            }),
            QueryPath,
            RedelegationsPath
        )
    }

    getDelegatorValidators(delegatorAddress: string): Promise<Types.Validator[]> {
        const QueryPath = Keys.Query.QueryPath
        const DelegatorValidatorsPath = Keys.Query.DelegatorValidatorsPath

        return this._transport.query<Types.Validator[]>(
            [],
            JSON.stringify({ DelegatorAddr: delegatorAddress }),
            QueryPath,
            DelegatorValidatorsPath
        )
    }

    getDelegatorValidator(
        delegatorAddress: string,
        validatorAddress: string
    ): Promise<Types.Validator> {
        const QueryPath = Keys.Query.QueryPath
        const DelegatorValidatorPath = Keys.Query.DelegatorValidatorPath

        return this._transport.query<Types.Validator>(
            [],
            JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }),
            QueryPath,
            DelegatorValidatorPath
        )
    }

    getHistoricalInfo(height: number): Promise<Types.HistoricalInfo> {
        const QueryPath = Keys.Query.QueryPath
        const HistoricalInfoPath = Keys.Query.HistoricalInfoPath

        return this._transport.query<Types.HistoricalInfo>(
            [],
            JSON.stringify({ Height: String(height) }),
            QueryPath,
            HistoricalInfoPath
        )
    }

    getParameters(): Promise<Types.StakingParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        return this._transport.query<Types.StakingParams>([], '', QueryPath, ParametersPath)
    }

    getPool(): Promise<Types.StakingPool> {
        const QueryPath = Keys.Query.QueryPath
        const PoolPath = Keys.Query.PoolPath

        return this._transport.query<Types.StakingPool>([], '', QueryPath, PoolPath)
    }
}
