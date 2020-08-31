const { Mele, MnemonicSigner, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const mnemonic =
    'around fire birth cradle assault equal risk dune goat recycle torch hole control pluck cry math noble crystal language uncover leave ski dust answer'

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: new MnemonicSigner(mnemonic),
})

;(async () => {
    const params = await mele.query.slashing.getParameters()
    console.log(chalk.green('Slashing params'))
    console.log(JSON.stringify(params, null, 4))

    const signingInfos = await mele.query.slashing.getSigningInfos()
    console.log(chalk.green('Signing infos'))
    console.log(JSON.stringify(signingInfos, null, 4))
})()
