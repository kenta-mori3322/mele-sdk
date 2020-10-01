const { Mele } = require('../lib/mele-sdk.cjs.js')

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    indexerEndpoint: 'http://localhost:3100/api/v1',
})

;(async () => {

    const history = await mele.indexer.history({
        module: 'staking'
    })

    console.log(history)
})()
