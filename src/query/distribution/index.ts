import * as Types from '../../common'
import { ITransport } from '../../transport'

const Keys = {
    Query: {
        QueryPath: 'distribution',

        ParametersPath: 'params',
        ValidatorOutstandingRewardsPath: 'validator_outstanding_rewards',
        ValidatorCommissionPath: 'validator_commission',
        ValidatorSlashesPath: 'validator_slashes',
        DelegationRewardsPath: 'delegation_rewards',
        DelegatorTotalRewardsPath: 'delegator_total_rewards',
        DelegatorValidatorsPath: 'delegator_validators',
        WithdrawAddrPath: 'withdraw_addr',
        CommunityPoolPath: 'community_pool',
        BurnedPoolPath: 'burned_pool',
    },
}

/**
 * Distribution Query
 * @namespace mele.query.distribution
 * @type {object}
 * @memberof mele
 */

export default class DistributionQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.distribution.**getParameters**
     *
     * Fetch distribution module parameters.
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name DistributionParams
     *
     * @returns {DistributionParams} distributionParams - Distribution parameters.
     */
    getParameters(): Promise<Types.DistributionParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        return this._transport.query<Types.DistributionParams>([], '', QueryPath, ParametersPath)
    }

    /**
     * mele.query.distribution.**getValidatorOutstandingRewards**
     *
     * Fetch validator outstanding rewards.
     *
     * @param {string} validator - Validator address
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name ValidatorOutstandingRewards
     *
     * @returns {[SDKCoin]} outstandingRewards - Outstanding rewards.
     */
    getValidatorOutstandingRewards(validator: string): Promise<Types.SDKCoin[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorOutstandingRewardsPath = Keys.Query.ValidatorOutstandingRewardsPath

        return this._transport.query<Types.SDKCoin[]>(
            [],
            JSON.stringify({ validator_address: validator }),
            QueryPath,
            ValidatorOutstandingRewardsPath
        )
    }

    /**
     * mele.query.distribution.**getValidatorCommission**
     *
     * Fetch validator accumulated commission.
     *
     * @param {string} validator - Validator address
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name ValidatorCommission
     *
     * @returns {[SDKCoin]} commission - Accumulated commission.
     */
    getValidatorCommission(validator: string): Promise<Types.SDKCoin[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorCommissionPath = Keys.Query.ValidatorCommissionPath

        return this._transport.query<Types.SDKCoin[]>(
            [],
            JSON.stringify({ validator_address: validator }),
            QueryPath,
            ValidatorCommissionPath
        )
    }

    /**
     * mele.query.distribution.**getValidatorSlashes**
     *
     * Fetch validator slashes at given height range.
     *
     * @param {string} validator - Validator address
     * @param {string} startHeight - Start height
     * @param {string} endHeight - End height
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name ValidatorSlashes
     *
     * @returns {[ValidatorSlashEvent]} slashEvents - Slash events.
     */
    getValidatorSlashes(
        validator: string,
        startHeight: string,
        endHeight: string
    ): Promise<Types.ValidatorSlashEvent[]> {
        const QueryPath = Keys.Query.QueryPath
        const ValidatorSlashesPath = Keys.Query.ValidatorSlashesPath

        return this._transport.query<Types.ValidatorSlashEvent[]>(
            [],
            JSON.stringify({
                validator_address: validator,
                starting_height: startHeight,
                ending_height: endHeight,
            }),
            QueryPath,
            ValidatorSlashesPath
        )
    }

    /**
     * mele.query.distribution.**getDelegationRewards**
     *
     * Fetch delegator rewards.
     *
     * @param {string} delegator - Delegator address
     * @param {string} validator - Validator address
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name DelegationRewards
     *
     * @returns {[SDKCoin]} rewards - Rewards.
     */
    getDelegationRewards(delegator: string, validator: string): Promise<Types.SDKCoin[]> {
        const QueryPath = Keys.Query.QueryPath
        const DelegationRewardsPath = Keys.Query.DelegationRewardsPath

        return this._transport.query<Types.SDKCoin[]>(
            [],
            JSON.stringify({ delegator_address: delegator, validator_address: validator }),
            QueryPath,
            DelegationRewardsPath
        )
    }

    /**
     * mele.query.distribution.**getDelegatorTotalRewards**
     *
     * Fetch total delegator rewards.
     *
     * @param {string} delegator - Delegator address
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name DelegatorTotalRewards
     *
     * @returns {[DelegatorTotalRewardsRes]} rewards - Rewards.
     */
    getDelegatorTotalRewards(delegator: string): Promise<Types.DelegatorTotalRewardsRes[]> {
        const QueryPath = Keys.Query.QueryPath
        const DelegatorTotalRewardsPath = Keys.Query.DelegatorTotalRewardsPath

        return this._transport.query<Types.DelegatorTotalRewardsRes[]>(
            [],
            JSON.stringify({ delegator_address: delegator }),
            QueryPath,
            DelegatorTotalRewardsPath
        )
    }

    /**
     * mele.query.distribution.**getDelegatorValidators**
     *
     * Fetch all validators that delegator had delegated to.
     *
     * @param {string} delegator - Delegator address
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name DelegatorValidators
     *
     * @returns {[string]} validators - Validator address array.
     */
    getDelegatorValidators(delegator: string): Promise<string[]> {
        const QueryPath = Keys.Query.QueryPath
        const DelegatorValidatorsPath = Keys.Query.DelegatorValidatorsPath

        return this._transport.query<string[]>(
            [],
            JSON.stringify({ delegator_address: delegator }),
            QueryPath,
            DelegatorValidatorsPath
        )
    }

    /**
     * mele.query.distribution.**getWithdrawAddress**
     *
     * Fetch delegator's withdraw address.
     *
     * @param {string} delegator - Delegator address
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name WithdrawAddress
     *
     * @returns {string} withdrawAddress - Withdraw address.
     */
    getWithdrawAddress(delegator: string): Promise<string> {
        const QueryPath = Keys.Query.QueryPath
        const WithdrawAddrPath = Keys.Query.WithdrawAddrPath

        return this._transport.query<string>(
            [],
            JSON.stringify({ delegator_address: delegator }),
            QueryPath,
            WithdrawAddrPath
        )
    }

    /**
     * mele.query.distribution.**getCommunityPool**
     *
     * Fetch community pool balance.
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name CommunityPool
     *
     * @returns {[SDKCoin]} communityPool - Community pool.
     */
    getCommunityPool(): Promise<Types.SDKCoin[]> {
        const QueryPath = Keys.Query.QueryPath
        const CommunityPoolPath = Keys.Query.CommunityPoolPath

        return this._transport.query<Types.SDKCoin[]>([], '', QueryPath, CommunityPoolPath)
    }

    /**
     * mele.query.distribution.**getBurnedPool**
     *
     * Fetch burned pool balance.
     *
     * @memberof mele.query.distribution
     * @inner
     *
     * @name BurnedPool
     *
     * @returns {[SDKCoin]} burnedPool - Burned pool.
     */
    getBurnedPool(): Promise<Types.SDKCoin[]> {
        const QueryPath = Keys.Query.QueryPath
        const BurnedPoolPath = Keys.Query.BurnedPoolPath

        return this._transport.query<Types.SDKCoin[]>([], '', QueryPath, BurnedPoolPath)
    }
}
