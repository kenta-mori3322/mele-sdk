import * as Types from '../../common'
import { ITransport } from '../../transport'

namespace Keys {
    export const Query = {
        QueryPath: 'treasury',

        ParametersPath: 'parameters',
        TreasuryPath: 'treasury',
        OperatorsPath: 'operators',
        DisbursementsPath: 'disbursements',
        AllDisbursementsPath: 'all_disbursements',
        BurnsPath: 'burns',
    }
}

/**
 * Treasury Query
 * @namespace mele.query.treasury
 * @type {object}
 * @memberof mele
 */

export default class TreasuryQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.treasury.**getParameters**
     *
     * Fetch treasury module parameters.
     *
     * @memberof mele.query.treasury
     * @inner
     *
     * @name TreasuryParams
     *
     * @returns {TreasuryParams} treasuryParams - Treasury parameters.
     */
    getParameters(): Promise<Types.TreasuryParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        return this._transport.query<Types.TreasuryParams>([], '', QueryPath, ParametersPath)
    }

    /**
     * mele.query.treasury.**getTreasury**
     *
     * Fetch treasury module treasury object.
     *
     * @memberof mele.query.treasury
     * @inner
     *
     * @name Treasury
     *
     * @returns {Treasury} treasury - Treasury.
     */
    getTreasury(): Promise<Types.Treasury> {
        const QueryPath = Keys.Query.QueryPath
        const TreasuryPath = Keys.Query.TreasuryPath

        return this._transport.query<Types.Treasury>([], '', QueryPath, TreasuryPath)
    }

    /**
     * mele.query.treasury.**getOperators**
     *
     * Fetch treasury module operators.
     *
     * @memberof mele.query.treasury
     * @inner
     *
     * @name TreasuryOperators
     *
     * @returns {[string]} operators - Treasury operators.
     */
    getOperators(): Promise<string[]> {
        const QueryPath = Keys.Query.QueryPath
        const OperatorsPath = Keys.Query.OperatorsPath

        return this._transport.query<string[]>([], '', QueryPath, OperatorsPath)
    }

    /**
     * mele.query.treasury.**getDisbursements**
     *
     * Fetch treasury module disbursements.
     *
     * @memberof mele.query.treasury
     * @inner
     *
     * @name TreasuryDisbursements
     *
     * @returns {[Disbursement]} disbursements - Treasury disbursements.
     */
    getDisbursements(): Promise<Types.Disbursement[]> {
        const QueryPath = Keys.Query.QueryPath
        const DisbursementsPath = Keys.Query.DisbursementsPath

        return this._transport.query<Types.Disbursement[]>([], '', QueryPath, DisbursementsPath)
    }

    /**
     * mele.query.treasury.**getDisbursements**
     *
     * Fetch treasury module disbursements.
     *
     * @memberof mele.query.treasury
     * @inner
     *
     * @name TreasuryDisbursements
     *
     * @returns {[Disbursement]} disbursements - Treasury disbursements.
     */
     getAllDisbursements(): Promise<Types.Disbursement[]> {
        const QueryPath = Keys.Query.QueryPath
        const AllDisbursementsPath = Keys.Query.AllDisbursementsPath

        return this._transport.query<Types.Disbursement[]>([], '', QueryPath, AllDisbursementsPath)
    }

    /**
     * mele.query.treasury.**getBurns**
     *
     * Fetch treasury module burns.
     *
     * @memberof mele.query.treasury
     * @inner
     *
     * @name TreasuryBurns
     *
     * @returns {[Burn]} burns - Treasury burns.
     */
    getBurns(): Promise<Types.Burn[]> {
        const QueryPath = Keys.Query.QueryPath
        const BurnsPath = Keys.Query.BurnsPath

        return this._transport.query<Types.Burn[]>([], '', QueryPath, BurnsPath)
    }
}