import * as Types from '../../common'
import { ITransport } from '../../transport'

const Keys = {
    Query: {
        QueryPath: 'slashing',

        ParametersPath: 'parameters',
        SigningInfoPath: 'signingInfo',
        SigningInfosPath: 'signingInfos',
    },
}

/**
 * Slashing Query
 * @namespace mele.query.slashing
 * @type {object}
 * @memberof mele
 */

export default class SlashingQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.slashing.**getParameters**
     *
     * Fetch slashing module parameters.
     *
     * @memberof mele.query.slashing
     * @inner
     *
     * @name SlashingParameters
     *
     * @returns {SlashingParams} slashingParams - Slashing parameters.
     */
    getParameters(): Promise<Types.SlashingParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        return this._transport.query<Types.SlashingParams>([], '', QueryPath, ParametersPath)
    }

    /**
     * mele.query.slashing.**getSigningInfo**
     *
     * Fetch signing info for a single validator.
     *
     * @param {string} consAddress - Validator's consensus address
     *
     * @memberof mele.query.slashing
     * @inner
     *
     * @name SigningInfo
     *
     * @returns {SigningInfo} signingInfo - Signing info.
     */
    getSigningInfo(consAddress: string): Promise<Types.SigningInfo> {
        const QueryPath = Keys.Query.QueryPath
        const SigningInfoPath = Keys.Query.SigningInfoPath

        return this._transport.query<Types.SigningInfo>(
            [],
            JSON.stringify({
                ConsAddress: consAddress,
            }),
            QueryPath,
            SigningInfoPath
        )
    }

    /**
     * mele.query.slashing.**getSigningInfos**
     *
     * Fetch signing info for all validators.
     *
     * @memberof mele.query.slashing
     * @inner
     *
     * @name SigningInfos
     *
     * @returns {[SigningInfo]} signingInfos - Signing info array.
     */
    getSigningInfos(): Promise<Types.SigningInfo[]> {
        const QueryPath = Keys.Query.QueryPath
        const SigningInfosPath = Keys.Query.SigningInfosPath

        return this._transport.query<Types.SigningInfo[]>(
            [],
            JSON.stringify({
                Page: '1',
                Limit: '0',
            }),
            QueryPath,
            SigningInfosPath
        )
    }
}
