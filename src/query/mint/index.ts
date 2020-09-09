import * as Types from '../../common'
import { ITransport } from '../../transport'

namespace Keys {
    export const Query = {
        QueryPath: 'mint',

        ParametersPath: 'parameters',
        InflationPath: 'inflation',
        AnnualProvisionsPath: 'annual_provisions',
    }
}

/**
 * Mint Query
 * @namespace mele.query.mint
 * @type {object}
 * @memberof mele
 */

export default class MintQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.mint.**getParameters**
     *
     * Fetch mint module parameters.
     *
     * @memberof mele.query.mint
     * @inner
     *
     * @name MintParams
     *
     * @returns {MintParams} mintParams - Mint parameters.
     */
    getParameters(): Promise<Types.MintParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        return this._transport.query<Types.MintParams>([], '', QueryPath, ParametersPath)
    }

    /**
     * mele.query.mint.**getInflation**
     *
     * Fetch mint module inflation.
     *
     * @memberof mele.query.mint
     * @inner
     *
     * @name Inflation
     *
     * @returns {number} inflation - Inflation.
     */
    getInflation(): Promise<number> {
        const QueryPath = Keys.Query.QueryPath
        const InflationPath = Keys.Query.InflationPath

        return this._transport.query<number>([], '', QueryPath, InflationPath)
    }

    /**
     * mele.query.mint.**getAnnualProvisions**
     *
     * Fetch mint module annual provisions.
     *
     * @memberof mele.query.mint
     * @inner
     *
     * @name AnnualProvisions
     *
     * @returns {number} annualProvisions - Annual provisions.
     */
    getAnnualProvisions(): Promise<number> {
        const QueryPath = Keys.Query.QueryPath
        const AnnualProvisionsPath = Keys.Query.AnnualProvisionsPath

        return this._transport.query<number>([], '', QueryPath, AnnualProvisionsPath)
    }
}
