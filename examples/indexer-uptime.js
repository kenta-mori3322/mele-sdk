const { Mele } = require('../lib/mele-sdk.cjs.js')

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    indexerEndpoint: 'http://localhost:3100/api/v1',
})

;(async () => {


    let validators = await mele.query.staking.getValidators()

    validators = validators.sort(function(a, b) {
        return a.description.moniker.localeCompare(b.description.moniker);
    })
    

    for (let i = 0; i < validators.length; i++) {

        let validator = validators[i]

        const validatorUptime = await mele.indexer.validatorUptime(validator.consensus_pubkey)

        console.log(validator.description.moniker)
        console.log('Uptime:', validatorUptime.uptime * 100, '%')
        console.log('Missed blocks/Total blocks:', validatorUptime.missed_blocks_count, '/', validatorUptime.total_blocks_count)

        console.log()

    }

})()
