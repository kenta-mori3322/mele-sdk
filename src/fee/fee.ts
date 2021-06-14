import * as Types from '../common'
import Query from '../query'
import { Signer } from '../signer'
import { convertMessageType } from '../utils'

export default class Fee {
    private defaultParams: any
    private query: Query
    private _params: any
    private signer: Signer

    constructor(query: Query, signer: Signer) {
        this.defaultParams = {
            fee_percentage: 0.002,
            minimum_fee: 200,
            maximum_fee: 100000000,
            fee_excluded_messages: [],
        }

        this.query = query
        this.signer = signer
        this._params = this.defaultParams
    }

    async loadParams(): Promise<any> {
        const feeParams: Types.FeeParams = await this.query.fee.getParameters()

        this._params.fee_percentage = Number(
            feeParams.fee_percentage || this._params.fee_percentage
        )
        this._params.minimum_fee = Number(
            ((feeParams.minimum_fee || [])[0] || {}).amount || this._params.minimum_fee
        )
        this._params.maximum_fee = Number(
            ((feeParams.maximum_fee || [])[0] || {}).amount || this._params.maximum_fee
        )

        let feeExcludedMessages: string[] = await this.query.fee.getExcludedMessages()
        if (feeExcludedMessages && feeExcludedMessages.length) {
            this._params.fee_excluded_messages = feeExcludedMessages.map(msg =>
                convertMessageType(msg)
            )
        }
    }

    calculateSystemFee(fee: number): number {
        let feePercentage = this._params.fee_percentage
        let systemFee = Math.trunc(fee * feePercentage)

        let minimumFee = this._params.minimum_fee
        let maximumFee = this._params.maximum_fee

        if (systemFee < minimumFee) {
            systemFee = minimumFee
        }

        if (systemFee > maximumFee) {
            systemFee = maximumFee
        }

        return systemFee
    }

    async calculateFees(msgs: any[]): Promise<number> {
        let txFees = 0
        let systemFees = 0

        const feePayer = this.signer.getAddress()

        for (let i = 0; i < msgs.length; i++) {
            let msgFee = 0

            switch (msgs[i].typeUrl) {
                case '/cosmos.bank.v1beta1.MsgSend':
                    msgFee += Number(msgs[i].value.amount[0].amount)

                    break
                case '/cosmos.bank.v1beta1.MsgMultiSend':
                    for (let j = 0; j < msgs[i].value.inputs.length; j++) {
                        msgFee += Number(msgs[i].value.inputs[j].coins[0].amount)
                    }

                    break
            }

            txFees += msgFee

            if (this._params.fee_excluded_messages.indexOf(msgs[i].type) === -1) {
                systemFees += this.calculateSystemFee(msgFee)
            }
        }

        return systemFees
    }
}
