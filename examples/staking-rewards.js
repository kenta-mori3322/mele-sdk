const { Mele } = require('../lib/mele-sdk.cjs.js')

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    indexerEndpoint: 'http://localhost:3100/api/v1',
})

;(async () => {

    const rate = await mele.query.staking.getRewardRate()

    console.log('Annual reward rate:', rate * 100, '%')

    console.log()

    console.log('1 000 000 MELC after 1 Year:', 1000000 * (1 + rate), 'MELC')
})()
