const {
    Mele,
    Utils,
    KeyPairSigner,
    MnemonicSigner,
} = require('../lib/mele-sdk.cjs.js')
const assert = require('assert')
const bip39 = require('bip39')

const NODE_URL = 'http://localhost:26657/'
const CHAIN_ID = 'test'
const INDEXER_URL = 'http://localhost:3100/api/v1'

const mele = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    indexerEndpoint: INDEXER_URL,
})

describe('Mele Indexer', function () {
    this.timeout(0)

    describe('Indexer', () => {
        let tx

        it('Transactions can be fetched', async () => {
            const txs = await mele.indexer.transactions({
                module: 'bank',
                limit: 5,
            })

            assert.ok(txs)

            assert.ok(txs.length > 0)
            assert.ok(txs[0])

            tx = txs[0]
        })

        it('Single transaction can be fetched', async () => {
            const nTx = await mele.indexer.transaction(tx.hash)

            assert.ok(nTx)
            assert.ok(nTx.hash === tx.hash)
        })

        it('Transaction count can be fetched', async () => {
            const txCount = await mele.indexer.transactionCount()

            assert.ok(txCount)
            assert.ok(txCount.count > 0)
        })

        let block
        it('Latest block can be fetched', async () => {
            const latestBlock = await mele.indexer.latestBlock()

            assert.ok(latestBlock)
            assert.ok(latestBlock.block)
            assert.ok(latestBlock.txs)
            assert.ok(latestBlock.events)

            assert.ok(latestBlock.block.height)

            block = latestBlock
        })

        it('Single block can be fetched', async () => {
            const nBlock = await mele.indexer.block(block.block.height)

            assert.ok(nBlock)
            assert.ok(nBlock.block)
            assert.ok(nBlock.txs)
            assert.ok(nBlock.events)

            assert.ok(nBlock.block.height === block.block.height)
            assert.ok(nBlock.txs.length === block.txs.length)
            assert.ok(nBlock.events.length === block.events.length)
        })

        it('Chain data can be fetched', async () => {
            const chain = await mele.indexer.chain()

            assert.ok(chain)
        })

        it('Block events can be fetched', async () => {
            const blockEvents = await mele.indexer.blockEvents({
                action: 'transfer',
                limit: 5,
                offset: 10,
            })

            assert.ok(blockEvents)
            assert.ok(blockEvents.length > 0)
        })

        it('Blocks can be fetched', async () => {
            const blocks = await mele.indexer.blocks({
                limit: 5,
            })

            assert.ok(blocks)
            assert.ok(blocks.length > 0)
        })

        it('Proposal votes can be fetched', async () => {
            const votes = await mele.indexer.proposalVotes(1)

            assert.ok(votes)
            assert.ok(votes.length > 0)
        })

        it('Validator uptime can be fetched', async () => {
            const validators = await mele.query.staking.getValidators()

            assert.ok(validators)
            assert.ok(validators.length > 0)
            assert.ok(validators[0])

            const validatorUptime = await mele.indexer.validatorUptime(
                validators[0].consensus_pubkey
            )

            assert.ok(validatorUptime)
        })

        it('Staking history can be fetched', async () => {
            const history = await mele.indexer.history({
                module: 'staking',
            })

            assert.ok(history)
            assert.ok(history.length > 0)
        })
    })
})
