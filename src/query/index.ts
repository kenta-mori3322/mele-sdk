import * as Types from '../common'
import { ITransport } from '../transport'
import { ResultBlock, ResultStatus, ResultTx } from '../transport/rpc'

namespace Keys {
    export const Query = {
        AuthModuleQueryPath: 'acc',
        AccountPath: 'account',
    }
}

export default class Query {
    private _transport: ITransport

    constructor(transport: ITransport) {
        this._transport = transport
    }

    getBlock(height: number): Promise<ResultBlock> {
        return this._transport.block(height)
    }

    getStatus(): Promise<ResultStatus> {
        return this._transport.status()
    }

    getTx(hash: string): Promise<ResultTx> {
        return this._transport.tx(hash)
    }

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

    async getAccSignInfo(address: string): Promise<Types.AccSignInfo> {
        let accountInfo = await this.getAccountInfo(address)

        return <Types.AccSignInfo>{
            address: accountInfo.value.address,
            accountNumber: accountInfo.value.account_number,
            sequence: accountInfo.value.sequence,
        }
    }
}
