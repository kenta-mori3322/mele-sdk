const {
    Mele,
    Utils,
    KeyPairSigner,
    MnemonicSigner,
} = require('../lib/mele-sdk.cjs.js')
const assert = require('assert')
const bip39 = require('bip39')
const Long = require('long')

const NODE_URL = 'http://localhost:26657/'
const CHAIN_ID = 'test'

const mele = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new KeyPairSigner(
        '7238378070a5168733402d838033d7c9faa576ad906fcfd6693ed365f0ae0d16'
    ),
})

const meleDelegator = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'around fire birth cradle assault equal risk dune goat recycle torch hole control pluck cry math noble crystal language uncover leave ski dust answer'
    ),
})

const meleValidator = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'pet apart myth reflect stuff force attract taste caught fit exact ice slide sheriff state since unusual gaze practice course mesh magnet ozone purchase'
    ),
})

const meleManager = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'lawn cup spawn stay amazing stuff marble egg north measure survey until divorce ridge hat whip okay home solar brave soft nut kitchen lady'
    ),
})

const meleTester = new Mele ({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'toss sense candy point cost rookie jealous snow ankle electric sauce forward oblige tourist stairs horror grunt tenant afford master violin final genre reason'
    ),
})

const meleOperator = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'find diamond example tooth need impact document total enrich hobby axis bicycle more oak junk because blade alley mesh electric evolve duty attack once'
    ),
})

describe('Mele Blockchain', function () {
    this.timeout(0)

    describe('Liquidity', () => {
        it('Liquidity module params can be queried', async () => {
            let params = await mele.query.liquidity.getParameters()
            assert.ok(params)

            assert.ok(params.pool_types)
            assert.ok(params.pool_types.length)
        })

        it('Liquidity module pool can be created', async () => {
            let transferTx = await meleTester.liquidity.createLiquidityPool(1, [
                { denom: 'umelc', amount: String(200000000) },
                { denom: 'umelg', amount: String(40000000) },
            ])

            let fees = await transferTx.calculateFees()

            const txEvents = await transferTx.sendTransaction()

            assert.ok(txEvents)
            const txPromise = new Promise((resolve, reject) => {
                txEvents
                    .on('hash', hash => {
                        
                        assert.ok(hash)
                    })
                    .on('receipt', receipt => {
                        assert.ok(receipt)
                    })
                    .on('confirmation', confirmation => {
                        assert.ok(confirmation)

                        resolve(confirmation)
                    })
                    .on('error', error => {
                        reject(error)
                    })
            })

            
            let tx = await txPromise

            assert.ok(tx)
            assert.ok(tx.hash)

            assert.ok(tx.tx_result)
            assert.ok(tx.tx_result.code === 0)
            assert.ok(tx.height)
        })

        it('Liquidity module pools can be queried', async () => {
            let pools = await mele.query.liquidity.getPools()
            assert.ok(pools)
            assert.ok(pools.length)

            let pool = await mele.query.liquidity.getPool(pools[0].id)
            assert.ok(pool)
            assert.ok(pool.reserve_coin_denoms.length === 2)
        })

        it('Liquidity module pool can be deposited', async () => {
            let transferTx = await meleTester.liquidity.depositLiquidity(1, [
                { denom: 'umelc', amount: String(150000000) },
                { denom: 'umelg', amount: String(30000000) },
            ])

            let fees = await transferTx.calculateFees()

            const txEvents = await transferTx.sendTransaction()

            assert.ok(txEvents)
            const txPromise = new Promise((resolve, reject) => {
                txEvents
                    .on('hash', hash => {
                        assert.ok(hash)
                    })
                    .on('receipt', receipt => {
                        assert.ok(receipt)
                    })
                    .on('confirmation', confirmation => {
                        assert.ok(confirmation)

                        resolve(confirmation)
                    })
                    .on('error', error => {
                        reject(error)
                    })
            })

            
            let tx = await txPromise

            assert.ok(tx)
            assert.ok(tx.hash)

            assert.ok(tx.tx_result)
            assert.ok(tx.tx_result.code === 0)
            assert.ok(tx.height)
        })

        it('Liquidity module pool can be swapped', async () => {
            let transferTx = await meleTester.liquidity.swapCoin(
                1, 1, 
                { denom: 'umelc', amount: String(100000) },
                'umelg', 
                { denom: 'umelc', amount: String(150) },
                '5010000000000000000' // 10^18 * price
            )

            let fees = await transferTx.calculateFees()

            const txEvents = await transferTx.sendTransaction()

            assert.ok(txEvents)
            const txPromise = new Promise((resolve, reject) => {
                txEvents
                    .on('hash', hash => {
                        assert.ok(hash)
                    })
                    .on('receipt', receipt => {
                        assert.ok(receipt)
                    })
                    .on('confirmation', confirmation => {
                        assert.ok(confirmation)

                        resolve(confirmation)
                    })
                    .on('error', error => {
                        reject(error)
                    })
            })

            
            let tx = await txPromise

            assert.ok(tx)
            assert.ok(tx.hash)

            assert.ok(tx.tx_result)
            assert.ok(tx.tx_result.code === 0)
            assert.ok(tx.height)
        })

        it('Liquidity module pool can be withdrawn', async () => {
            let pool = await mele.query.liquidity.getPool(1)

            let transferTx = await meleTester.liquidity.withdrawLiquidity(1,
                { denom: pool.pool_coin_denom, amount: String(15000) }
            )

            let fees = await transferTx.calculateFees()

            const txEvents = await transferTx.sendTransaction()

            assert.ok(txEvents)
            const txPromise = new Promise((resolve, reject) => {
                txEvents
                    .on('hash', hash => {
                        assert.ok(hash)
                    })
                    .on('receipt', receipt => {
                        assert.ok(receipt)
                    })
                    .on('confirmation', confirmation => {
                        assert.ok(confirmation)

                        resolve(confirmation)
                    })
                    .on('error', error => {
                        reject(error)
                    })
            })

            
            let tx = await txPromise

            assert.ok(tx)
            assert.ok(tx.hash)

            assert.ok(tx.tx_result)
            assert.ok(tx.tx_result.code === 0)
            assert.ok(tx.height)
        })
    })
})