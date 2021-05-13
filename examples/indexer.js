const { Mele } = require('../lib/mele-sdk.cjs.js')

const mele = new Mele({
    nodeUrl: 'http://3.126.68.149:26657',
    chainId: 'test',
    indexerEndpoint: 'http://18.192.179.29:3100/api/v1',
})

;(async () => {
    const txs = await mele.indexer.transactions({
        module: 'bank',
        limit: 5,
    })

    console.log(txs)

    try {
        const tx = await mele.indexer.transaction('error')

        console.log(tx)
    } catch (e) {
        console.log(e)
    }

    const txCount = await mele.indexer.transactionCount()

    console.log(txCount)

    const latestBlock = await mele.indexer.latestBlock()

    console.log(latestBlock)

    const block = await mele.indexer.block('4')

    console.log(block)

    const chain = await mele.indexer.chain()

    console.log(chain)

    const blockEvents = await mele.indexer.blockEvents({
        action: 'transfer',
        limit: 5,
        offset: 10,
    })

    console.log(blockEvents)

    const blocks = await mele.indexer.blocks({
        limit: 5,
    })

    console.log(blocks)

    const votes = await mele.indexer.proposalVotes(1)

    console.log(votes)

    const validatorUptime = await mele.indexer.validatorUptime({
        type: 'tendermint/PubKeyEd25519',
        value: '9TY5z/XIH2Pu9srpJJiQByT2W3xmiPqc4hbiLhu0wCM='
    })

    console.log(validatorUptime)

    const history = await mele.indexer.history({
        module: 'staking',
    })

    console.log(history)

    const disbursements = await mele.indexer.disbursements()

    console.log(disbursements)

    const burns = await mele.indexer.burns()

    console.log(burns)
})()
