import * as Types from '../../common'
import { ITransport } from '../../transport'
import MintQuery from '../mint'

const Keys = {
    Query: {
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
    },
}

/**
 * Staking Query
 * @namespace mele.query.staking
 * @type {object}
 * @memberof mele
 */

export default class StakingQuery {
    private _transport: ITransport
    private _mint: MintQuery

    constructor(transport: ITransport, mint: MintQuery) {
        this._transport = transport
        this._mint = mint
    }

    /**
     * mele.query.staking.**getValidators**
     *
     * Fetch all currently active validators.
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name Validators
     *
     * @returns {[Validator]} validators - Validator array.
     */
    getValidators(): Promise<Types.Validator[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorsPath = Keys.Query.ValidatorsPath

        return this._transport.query<Types.Validator[]>(
            [],
            JSON.stringify({
                Status: 'BOND_STATUS_BONDED',
                Page: '1',
                Limit: '1000',
            }),
            QueryPath,
            ValidatorsPath
        )
    }

    /**
     * mele.query.staking.**getValidator**
     *
     * Fetch a single validator.
     *
     * @param {string} address - Validator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name Validator
     *
     * @returns {Validator} validator - Validator.
     */
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

    /**
     * mele.query.staking.**getValidatorDelegations**
     *
     * Fetch all validator's delegations.
     *
     * @param {string} address - Validator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name ValidatorDelegations
     *
     * @returns {[Delegation]} delegations - Delegations array.
     */
    getValidatorDelegations(address: string): Promise<Types.Delegation[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorDelegationsPath = Keys.Query.ValidatorDelegationsPath

        return this._transport.query<Types.Delegation[]>(
            [],
            JSON.stringify({ ValidatorAddr: address, Page: '1' }),
            QueryPath,
            ValidatorDelegationsPath
        )
    }

    /**
     * mele.query.staking.**getValidatorUnbondingDelegations**
     *
     * Fetch all validator's unbonding delegations.
     *
     * @param {string} address - Validator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name ValidatorUnbondingDelegations
     *
     * @returns {[Delegation]} delegations - Delegations array.
     */
    getValidatorUnbondingDelegations(address: string): Promise<Types.Delegation[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorUnbondingDelegationsPath = Keys.Query.ValidatorUnbondingDelegationsPath

        return this._transport.query<Types.Delegation[]>(
            [],
            JSON.stringify({ ValidatorAddr: address, Page: '1' }),
            QueryPath,
            ValidatorUnbondingDelegationsPath
        )
    }

    /**
     * mele.query.staking.**getDelegation**
     *
     * Fetch a single delegation.
     *
     * @param {string} delegatorAddress - Delegator address
     * @param {string} validatorAddress - Validator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name Delegation
     *
     * @returns {DelegationRes} delegation - Delegation.
     */
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

    /**
     * mele.query.staking.**getUnbondingDelegation**
     *
     * Fetch a single unbonding delegation.
     *
     * @param {string} delegatorAddress - Delegator address
     * @param {string} validatorAddress - Validator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name UnbondingDelegation
     *
     * @returns {UnbondingDelegation} unbondingDelegation - Unbonding delegation.
     */
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

    /**
     * mele.query.staking.**getDelegatorDelegations**
     *
     * Fetch all delegator's delegations.
     *
     * @param {string} delegatorAddress - Delegator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name DelegatorDelegations
     *
     * @returns {[Delegation]} delegations - Delegation array.
     */
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

    /**
     * mele.query.staking.**getDelegatorUnbondingDelegations**
     *
     * Fetch all delegator's unbonding delegations.
     *
     * @param {string} delegatorAddress - Delegator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name DelegatorUnbondingDelegations
     *
     * @returns {[UnbondingDelegation]} unbondingDelegations - Unbonding delegations array.
     */
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

    /**
     * mele.query.staking.**getRedelegations**
     *
     * Fetch all redelegations by the delegator from source validator to the destination validator.
     *
     * @param {string} delegatorAddress - Delegator address
     * @param {string} srcValidatorAddress - Source validator address
     * @param {string} dstValidatorAddress - Destination validator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name Redelegations
     *
     * @returns {[Redelegation]} redelegations - Redelegations array.
     */
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

    /**
     * mele.query.staking.**getDelegatorValidators**
     *
     * Fetch all validators that have delegations by the delegator.
     *
     * @param {string} delegatorAddress - Delegator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name DelegatorValidators
     *
     * @returns {[Validator]} validators - Validators array.
     */
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

    /**
     * mele.query.staking.**getDelegatorValidator**
     *
     * Fetch a single validators that has delegations by the delegator.
     *
     * @param {string} delegatorAddress - Delegator address
     * @param {string} validatorAddress - Validator address
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name DelegatorValidator
     *
     * @returns {Validator} validator - Validator.
     */
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

    /**
     * mele.query.staking.**getHistoricalInfo**
     *
     * Fetch historical info at given height.
     *
     * @param {number} height - Block height
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name HistoricalInfo
     *
     * @returns {HistoricalInfo} historicalInfo - Historical info.
     */
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

    /**
     * mele.query.staking.**getParameters**
     *
     * Fetch staking module parameters.
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name StakingParams
     *
     * @returns {StakingParams} stakingParams - Staking parameters.
     */
    getParameters(): Promise<Types.StakingParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        return this._transport.query<Types.StakingParams>([], '', QueryPath, ParametersPath)
    }

    /**
     * mele.query.staking.**getPool**
     *
     * Fetch staking module pool.
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name StakingPool
     *
     * @returns {StakingPool} stakingPool - Staking pool.
     */
    getPool(): Promise<Types.StakingPool> {
        const QueryPath = Keys.Query.QueryPath
        const PoolPath = Keys.Query.PoolPath

        return this._transport.query<Types.StakingPool>([], '', QueryPath, PoolPath)
    }

    /**
     * mele.query.staking.**getRewardRate**
     *
     * Fetch current reward rate.
     *
     * @memberof mele.query.staking
     * @inner
     *
     * @name RewardRate
     *
     * @returns {number} rewardRate - Reward rate.
     */
    async getRewardRate(): Promise<number> {
        let pool = await this.getPool()

        let inflation = await this._mint.getInflation()
        let mintParams = await this._mint.getParameters()

        inflation = Number(inflation) * (1 + Number(mintParams.inflation_rate_change || 0))

        let rRate =
            ((Number(pool.not_bonded_tokens) + Number(pool.bonded_tokens)) * Number(inflation)) /
            Number(pool.bonded_tokens)

        return rRate
    }
}
