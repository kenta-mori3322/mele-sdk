import * as Types from '../../common'
import { ITransport } from '../../transport'

const Keys = {
    Query: {
        QueryPath: 'liquidity',

        ParametersPath: 'params',
        PoolsPath: 'pools',
    },
}

/**
 * liquidity Query
 * @namespace mele.query.liquidity
 * @type {object}
 * @memberof mele
 */

export default class LiquidityQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.liquidity.**getParameters**
     *
     * Fetch liquidity module parameters.
     *
     * @memberof mele.query.liquidity
     * @inner
     *
     * @name LiquidityParams
     *
     * @returns {LiquidityParams} liquidityParams - Liquidity parameters.
     */
    getParameters(): Promise<Types.LiquidityParams> {
        const path = `mele/${Keys.Query.QueryPath}/v1beta1/${Keys.Query.ParametersPath}`

        return new Promise((resolve, reject) => {
            this._transport
                .lcdQuery<any>(path)
                .then(res => resolve(res.params as Types.LiquidityParams))
                .catch(err => reject(err))
        })
    }

    /**
     * mele.query.liquidity.**getPools**
     *
     * Fetch liquidity module pools.
     *
     * @memberof mele.query.liquidity
     * @inner
     *
     * @name Pools
     *
     * @returns {[LiquidityPool]} pools - Liquidity pools.
     */
    getPools(): Promise<Types.LiquidityPool[]> {
        const path = `mele/${Keys.Query.QueryPath}/v1beta1/${Keys.Query.PoolsPath}`

        return new Promise((resolve, reject) => {
            this._transport
                .lcdQuery<any>(path)
                .then(res => resolve(res.pools as Types.LiquidityPool[]))
                .catch(err => reject(err))
        })
    }

    /**
     * mele.query.liquidity.**getPool**
     *
     * Fetch liquidity module pool.
     *
     * @memberof mele.query.liquidity
     * @inner
     *
     * @name Pool
     *
     * @returns {LiquidityPool} pool - Liquidity pool.
     */
    getPool(id: string): Promise<Types.LiquidityPool> {
        const path = `mele/${Keys.Query.QueryPath}/v1beta1/${Keys.Query.PoolsPath}/${id}`

        return new Promise((resolve, reject) => {
            this._transport
                .lcdQuery<any>(path)
                .then(res => resolve(res.pool as Types.LiquidityPool))
                .catch(err => reject(err))
        })
    }
}
