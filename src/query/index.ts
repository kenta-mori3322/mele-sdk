import * as Types from '../common'
import { ITransport } from '../transport'
import { ResultBlock, ResultStatus, ResultTx } from '../transport/rpc'

namespace Keys {
    export const Query = {
        AuthModuleQueryPath: 'acc',
        AccountPath: 'account',
    }
}

/**
 * Query
 * @namespace mele.query
 * @type {object}
 * @memberof mele
 */

export default class Query {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    /**
     * mele.query.**getBlock(<height>)**
     *
     * Fetch block data at given height.
     *
     * @param {number} height - Block height
     *
     * @memberof mele.query
     * @inner
     *
     * @name Block
     *
     * @returns {ResultBlock} block - Block data.
     */
    getBlock(height: number): Promise<ResultBlock> {
        return this._transport.block(height)
    }

    /**
     * mele.query.**getStatus()**
     *
     * Fetch current network status.
     *
     * @memberof mele.query
     * @inner
     *
     * @name Status
     *
     * @returns {ResultStatus} status - Current status.
     */
    getStatus(): Promise<ResultStatus> {
        return this._transport.status()
    }

    /**
     * mele.query.**getTx(<hash>)**
     *
     * Fetch transaction by hash.
     *
     * @param {string} hash - Transaction hash
     *
     * @memberof mele.query
     * @inner
     *
     * @name Transaction
     *
     * @returns {ResultTx} transaction - Transaction data.
     */
    getTx(hash: string): Promise<ResultTx> {
        return this._transport.tx(hash)
    }

    /**
     * mele.query.**getAccountInfo(<address>)**
     *
     * Fetch account information by account address.
     *
     * @param {string} address - Account address
     *
     * @memberof mele.query
     * @inner
     *
     * @name AccountInfo
     *
     * @returns {Promise<Account>} account - Account data.
     */
    getAccountInfo(address: string): Promise<Types.Account> {
        const AuthModuleQueryPath = Keys.Query.AuthModuleQueryPath
        const AccountPath = Keys.Query.AccountPath

        return this._transport.query<Types.Account>(
            [],
            JSON.stringify({ Address: address }),
            AuthModuleQueryPath,
            AccountPath
        )
    }

    /**
     * mele.query.**getAccSignInfo(<address>)**
     *
     * Fetch account signing information by account address.
     *
     * @param {string} address - Account address
     *
     * @memberof mele.query
     * @inner
     *
     * @name AccountSigningInfo
     *
     * @returns {Promise<AccSignInfo>} account - Account signing info.
     */
    async getAccSignInfo(address: string): Promise<Types.AccSignInfo> {
        let accountInfo = await this.getAccountInfo(address)

        return <Types.AccSignInfo>{
            address: accountInfo.value.address,
            accountNumber: accountInfo.value.account_number,
            sequence: accountInfo.value.sequence,
        }
    }
}
