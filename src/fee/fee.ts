import BigNumber from 'bignumber.js'
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
            melg_fee_percentage: 0.01,
            melg_price: 2.677,
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
        this._params.melg_fee_percentage = Number(
            feeParams.melg_fee_percentage || this._params.melg_fee_percentage
        )
        this._params.melg_price = Number(feeParams.melg_price || this._params.melg_price)

        let feeExcludedMessages: string[] = await this.query.fee.getExcludedMessages()
        if (feeExcludedMessages && feeExcludedMessages.length) {
            this._params.fee_excluded_messages = feeExcludedMessages.map(msg =>
                convertMessageType(msg)
            )
        }
    }

    async calculateSystemFee(umelcFee: number, umelgFee: number): Promise<number> {
        let feePercentage = this._params.fee_percentage
        let systemFee = Math.trunc(umelcFee * feePercentage)

        if (umelgFee > 0) {
            let supply = await this.query.supply.getSupplyOf('umelg')

            let melgSupply = new BigNumber(supply.amount)

            let totalPercentage = new BigNumber(umelgFee).div(melgSupply)

            let totalUmelgFee = totalPercentage
                .times(new BigNumber(this._params.melg_fee_percentage))
                .times(new BigNumber(umelgFee))

            let melgPriceInMelc = new BigNumber(this._params.melg_price)

            let totalUmelcFee = totalUmelgFee.times(melgPriceInMelc).integerValue().toNumber()

            systemFee = systemFee + totalUmelcFee
        }

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
        let systemFees = 0

        const feePayer = this.signer.getAddress()

        for (let i = 0; i < msgs.length; i++) {
            let msgFeeUmelc = 0
            let msgFeeUmelg = 0

            switch (msgs[i].typeUrl) {
                case '/cosmos.bank.v1beta1.MsgSend':
                    msgFeeUmelc += Number(
                        (msgs[i].value.amount.find(z => z.denom === 'umelc') || {}).amount || 0
                    )
                    msgFeeUmelg += Number(
                        (msgs[i].value.amount.find(z => z.denom === 'umelg') || {}).amount || 0
                    )

                    break
                case '/cosmos.bank.v1beta1.MsgMultiSend':
                    for (let j = 0; j < msgs[i].value.inputs.length; j++) {
                        msgFeeUmelc += Number(
                            (msgs[i].value.amount.find(z => z.denom === 'umelc') || {}).amount || 0
                        )
                        msgFeeUmelg += Number(
                            (msgs[i].value.amount.find(z => z.denom === 'umelg') || {}).amount || 0
                        )
                    }

                    break
            }

            if (this._params.fee_excluded_messages.indexOf(msgs[i].type) === -1) {
                systemFees += await this.calculateSystemFee(msgFeeUmelc, msgFeeUmelg)
            }
        }

        return systemFees
    }
}
