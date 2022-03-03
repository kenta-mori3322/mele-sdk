import { Transaction, TransactionApi } from '../index'
import { Coin } from '../../transport/codec/cosmos/base/v1beta1/coin'

/**
 * Liquidity
 * @namespace mele.liquidity
 * @type {object}
 * @memberof mele
 */

export default class Liquidity extends TransactionApi {
    /**
     * mele.liquidity.**createLiquidityPool**
     *
     * Create a new liquidity pool.
     *
     * @param {number} pool_type - The liquidity pool type
     * @param {Coin[]} coins - The coins to deposit to the liquidity pool
     *
     * @memberof mele.liquidity
     * @inner
     *
     * @name CreatePool
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    createLiquidityPool(
        pool_type: number,
        coins: Coin[],
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.liquidity.v1beta1.MsgCreatePool',
                value: {
                    poolCreatorAddress: senderAddress,
                    poolTypeId: pool_type,
                    depositCoins: coins,
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs), msgs => this.broadcast.calculateFees(msgs))
    }

    /**
     * mele.liquidity.**depositLiquidity**
     *
     * Add a liquidity to the pool.
     *
     * @param {number} pool_id - The liquidity pool ID
     * @param {Coin[]} coins - The coins to add a liquidity
     *
     * @memberof mele.liquidity
     * @inner
     *
     * @name DepositWithinBatch
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    depositLiquidity(
        pool_id: number,
        coins: Coin[],
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.liquidity.v1beta1.MsgDepositWithinBatch',
                value: {
                    depositorAddress: senderAddress,
                    poolId: pool_id,
                    depositCoins: coins,
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs), msgs => this.broadcast.calculateFees(msgs))
    }

    /**
     * mele.liquidity.**withdrawLiquidity**
     *
     * Withdraw the liquidity from the pool.
     *
     * @param {number} pool_id - The liquidity pool ID
     * @param {Coin} pool_coin - The pool coin to withdraw a liquidity
     *
     * @memberof mele.liquidity
     * @inner
     *
     * @name WithdrawWithinBatch
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    withdrawLiquidity(
        pool_id: number,
        pool_coin: Coin,
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.liquidity.v1beta1.MsgWithdrawWithinBatch',
                value: {
                    withdrawerAddress: senderAddress,
                    poolId: pool_id,
                    poolCoin: pool_coin,
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs), msgs => this.broadcast.calculateFees(msgs))
    }

    /**
     * mele.liquidity.**withdrawLiquidity**
     *
     * Swap coin in the liquidity pool.
     *
     * @param {number} swap_type - The type of swap
     * @param {number} pool_id - The pool ID
     * @param {Coin} offer_coin - The coin to provide to the liquidity pool
     * @param {string} demand_coin_denom - The coin denomination to swap
     * @param {string} offer_coin_fee - The offer coin fee
     * @param {string} order_price - The coin denomination to swap
     * 
     * @memberof mele.liquidity
     * @inner
     *
     * @name SwapWithinBatch
     *
     * @returns {Transaction} transaction - Transaction class instance.
     */
    swapCoin(
        swap_type: number,
        pool_id: number,
        offer_coin: Coin,
        demand_coin_denom: string,
        offer_coin_fee: Coin,
        order_price: string,
    ): Transaction {
        let senderAddress = this.broadcast.signer.getAddress()

        const msgs = [
            {
                typeUrl: '/mele.liquidity.v1beta1.MsgSwapWithinBatch',
                value: {
                    swapRequesterAddress: senderAddress,
                    poolId: pool_id,
                    swapTypeId: swap_type,
                    offerCoin: offer_coin,
                    demandCoinDenom: demand_coin_denom,
                    offerCoinFee: offer_coin_fee,
                    orderPrice: order_price,
                },
            },
        ]

        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs), msgs => this.broadcast.calculateFees(msgs))
    }
}