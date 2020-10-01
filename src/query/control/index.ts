import * as Types from '../../common'
import { ITransport } from '../../transport'

namespace Keys {
    export const Query = {
        QueryPath: 'control',

        ParametersPath: 'params',
        ExecutionsPath: 'executions',
        ExecutionPath: 'execution',
    }
}

/**
 * Control Query
 * @namespace mele.query.control
 * @type {object}
 * @memberof mele
 */

export default class ControlQuery {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.control.**getParameters**
     *
     * Fetch control module parameters.
     *
     * @memberof mele.query.control
     * @inner
     *
     * @name ControlParams
     *
     * @returns {ControlParams} controlParams - Control parameters.
     */
    getParameters(): Promise<Types.ControlParams> {
        const QueryPath = Keys.Query.QueryPath
        const ParametersPath = Keys.Query.ParametersPath

        return this._transport.query<Types.ControlParams>([], '', QueryPath, ParametersPath)
    }

    /**
     * mele.query.control.**getExecutions**
     *
     * Fetch control module executions.
     *
     * @memberof mele.query.control
     * @inner
     *
     * @name Executions
     *
     * @returns {[Execution]} executions - Control executions.
     */
    getExecutions(): Promise<Types.Execution[]> {
        const QueryPath = Keys.Query.QueryPath
        const ExecutionsPath = Keys.Query.ExecutionsPath

        return this._transport.query<Types.Execution[]>([], '', QueryPath, ExecutionsPath)
    }

    /**
     * mele.query.control.**getExecutions**
     *
     * Fetch control module execution by id.
     *
     * @memberof mele.query.control
     * @inner
     *
     * @name Execution
     *
     * @returns {Execution} execution - Control execution.
     */
    getExecution(id: string): Promise<Types.Execution> {
        const QueryPath = Keys.Query.QueryPath
        const ExecutionPath = Keys.Query.ExecutionPath

        return this._transport.query<Types.Execution>(
            [],
            JSON.stringify({
                ExecutionID: id,
            }),
            QueryPath,
            ExecutionPath
        )
    }
}
