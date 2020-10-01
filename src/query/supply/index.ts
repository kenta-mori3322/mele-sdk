import * as Types from '../../common'
import { ITransport } from '../../transport'

namespace Keys {
    export const Query = {
        QueryPath: 'supply',

        TotalSupplyPath: 'total_supply',
    }
}

/**
 * Supply Query
 * @namespace mele.query.supply
 * @type {object}
 * @memberof mele
 */

export default class SupplyQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.supply.**getTotalSupply**
     *
     * Fetch total supply.
     *
     * @memberof mele.query.supply
     * @inner
     *
     * @name TotalSupply
     *
     * @returns {[SDKCoin]} totalSupply - Total supply.
     */
    getTotalSupply(): Promise<Types.SDKCoin[]> {
        const QueryPath = Keys.Query.QueryPath
        const TotalSupplyPath = Keys.Query.TotalSupplyPath

        return this._transport.query<Types.SDKCoin[]>(
            [],
            JSON.stringify({
                Page: '1',
                Limit: '0',
            }),
            QueryPath,
            TotalSupplyPath
        )
    }
}
