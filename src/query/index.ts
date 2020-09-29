import * as Types from '../common'
import { ITransport } from '../transport'
import { ResultBlock, ResultStatus, ResultTx } from '../transport/rpc'
import ControlQuery from './control'

import DistributionQuery from './distribution'
import GovQuery from './gov'
import MintQuery from './mint'
import SlashingQuery from './slashing'
import StakingQuery from './staking'
import TreasuryQuery from './treasury'

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
    private _staking: StakingQuery
    private _slashing: SlashingQuery
    private _distribution: DistributionQuery
    private _gov: GovQuery
    private _mint: MintQuery
    private _treasury: TreasuryQuery
    private _control: ControlQuery

    constructor(transport: ITransport) {
        this._transport = transport

        this._mint = new MintQuery(this._transport)
        this._staking = new StakingQuery(this._transport, this._mint)
        this._slashing = new SlashingQuery(this._transport)
        this._distribution = new DistributionQuery(this._transport)
        this._gov = new GovQuery(this._transport)
        this._treasury = new TreasuryQuery(this._transport)
        this._control = new ControlQuery(this._transport)
    }

    get staking(): StakingQuery {
        return this._staking
    }

    get slashing(): SlashingQuery {
        return this._slashing
    }

    get distribution(): DistributionQuery {
        return this._distribution
    }

    get governance(): GovQuery {
        return this._gov
    }

    get mint(): MintQuery {
        return this._mint
    }

    get treasury(): TreasuryQuery {
        return this._treasury
    }

    get control(): ControlQuery {
        return this._control
    }

    /**
     * mele.query.**getBlock**
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
     * mele.query.**getStatus**
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
     * mele.query.**getTx**
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
     * mele.query.**getAccountInfo**
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
     * mele.query.**getAccSignInfo**
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
        let accSignInfo: Types.AccSignInfo

        if ('address' in accountInfo.value) {
            accSignInfo = {
                address: accountInfo.value.address,
                accountNumber: accountInfo.value.account_number,
                sequence: accountInfo.value.sequence,
            }
        } else {
            accSignInfo = {
                address: accountInfo.value.BaseVestingAccount.BaseAccount.address,
                accountNumber: accountInfo.value.BaseVestingAccount.BaseAccount.account_number,
                sequence: accountInfo.value.BaseVestingAccount.BaseAccount.sequence,
            }
        }

        return accSignInfo
    }
}
