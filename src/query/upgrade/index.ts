import * as Types from '../../common'
import { ITransport } from '../../transport'

namespace Keys {
    export const Query = {
        QueryPath: 'upgrade',

        CurrentPath: 'current',
        AppliedPath: 'applied',
    }
}

/**
 * Upgrade Query
 * @namespace mele.query.upgrade
 * @type {object}
 * @memberof mele
 */

export default class UpgradeQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.upgrade.**getCurrent**
     *
     * Fetch current upgrade plan.
     *
     * @memberof mele.query.upgrade
     * @inner
     *
     * @name CurrentUpgrade
     *
     * @returns {UpgradePlan} upgradePlan - Upgrade plan.
     */
    getCurrent(): Promise<Types.UpgradePlan> {
        const QueryPath = Keys.Query.QueryPath
        const CurrentPath = Keys.Query.CurrentPath

        return this._transport.query<Types.UpgradePlan>([], '', QueryPath, CurrentPath)
    }

    /**
     * mele.query.upgrade.**getApplied**
     *
     * Fetch applied upgrade height.
     *
     * @param {string} name - Upgrade name
     *
     * @memberof mele.query.upgrade
     * @inner
     *
     * @name AppliedUpgrade
     *
     * @returns {Number} height - Applied upgrade height.
     */
    getApplied(name: string): Promise<number> {
        const QueryPath = Keys.Query.QueryPath
        const AppliedPath = Keys.Query.AppliedPath

        return this._transport.query<number>(
            [],
            JSON.stringify({
                Name: name,
            }),
            QueryPath,
            AppliedPath
        )
    }
}
