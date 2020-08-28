const { Mele, MnemonicSigner, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')


const RPC = 'http://18.159.189.220:26657/'
const CHAIN_ID = 'testnet'

const mnemonic1 = 'betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire'
const mnemonic2 = 'toss sense candy point cost rookie jealous snow ankle electric sauce forward oblige tourist stairs horror grunt tenant afford master violin final genre reason'

const mele1 = new Mele({
    nodeUrl: RPC,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(mnemonic1),
})

const mele2 = new Mele({
    nodeUrl: RPC,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(mnemonic2),
})


const recAddress = 'mele1e2k26e6yz3kwysp896mwpf5u5r0nh8zx0yvtsz'

;(async () => {


    while (true) {
        const txEvents1 = await mele1.bank
        .transfer(recAddress, [{ denom: 'umlc', amount: '100' }])
        .sendTransaction()

        const txEvents2 = await mele2.bank
            .transfer(recAddress, [{ denom: 'umlc', amount: '100' }])
            .sendTransaction()

        try {
            await Promise.all([
                Utils.promisify(txEvents1),
                Utils.promisify(txEvents2),
            ]) 
            console.log('Transactions sent')
        } catch (e) {
            console.log(chalk.red('Error while executing transaction.', e))
        }
    }

})()
