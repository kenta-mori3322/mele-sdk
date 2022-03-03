import * as Types from '../../common'
import { ITransport } from '../../transport'

const Keys = {
    Query: {
        QueryPath: 'bank',

        TotalSupplyPath: 'total_supply',
        SupplyOfPath: 'supply_of',
    },
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
     * Fetch the total supply.
     *
     * @memberof mele.query.supply
     * @inner
     *
     * @name TotalSupply
     *
     * @returns {[Types.SDKCoin]} totalSupply - Total supply.
     */
    getTotalSupply(): Promise<Types.SDKCoin[]> {
        const QueryPath = Keys.Query.QueryPath
        const TotalSupplyPath = Keys.Query.TotalSupplyPath

        return this._transport.query<Types.SDKCoin[]>([], '', QueryPath, TotalSupplyPath)
    }

    /**
     * mele.query.supply.**getSupplyOf**
     *
     * Fetch supply of.
     *
     * @param {string} denom - Coin denom
     *
     * @memberof mele.query.supply
     * @inner
     *
     * @name SupplyOf
     *
     * @returns {SDKCoin} supplyOf - Supply of the given token.
     */
    getSupplyOf(denom: string): Promise<Types.SDKCoin> {
        const QueryPath = Keys.Query.QueryPath
        const SupplyOfPath = Keys.Query.SupplyOfPath

        return this._transport.query<Types.SDKCoin>(
            [],
            JSON.stringify({
                Denom: denom,
            }),
            QueryPath,
            SupplyOfPath
        )
    }
}
