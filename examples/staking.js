const { Mele, MnemonicSigner } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const mnemonic =
    'betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire'

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: new MnemonicSigner(mnemonic),
})

;(async () => {
    const validators = await mele.query.staking.getValidators()

    console.log(validators)
})()
