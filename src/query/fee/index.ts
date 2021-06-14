import * as Types from '../../common'
import { ITransport } from '../../transport'

const Keys = {
    Query: {
        QueryPath: 'fee',

        ParametersPath: 'parameters',
        ExcludedMessagesPath: 'excluded-messages',
    }
}

/**
 * Fee Query
 * @namespace mele.query.fee
 * @type {object}
 * @memberof mele
 */

export default class FeeQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.fee.**getParameters**
     *
     * Fetch fee module parameters.
     *
     * @memberof mele.query.fee
     * @inner
     *
     * @name FeeParams
     *
     * @returns {FeeParams} feeParams - Fee parameters.
     */
    getParameters(): Promise<Types.FeeParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        return this._transport.query<Types.FeeParams>([], '', QueryPath, ParametersPath)
    }

    /**
     * mele.query.fee.**getExcludedMessages**
     *
     * Fetch fee module excluded messages.
     *
     * @memberof mele.query.fee
     * @inner
     *
     * @name FeeExcludedMessages
     *
     * @returns {[string]} excludedMessages - Fee excluded messages.
     */
    getExcludedMessages(): Promise<string[]> {
        const QueryPath = Keys.Query.QueryPath
        const ExcludedMessagesPath = Keys.Query.ExcludedMessagesPath

        return this._transport.query<string[]>([], '', QueryPath, ExcludedMessagesPath)
    }
}