const { Mele, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
})

const delay = (ms = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

const mnemonic =
    'betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire'
const masterKey = Utils.deriveMasterKey(mnemonic)

const keyPair = Utils.deriveKeyPairFromAccountAndIndex(masterKey)
const address = Utils.getAddressFromPublicKey(keyPair.publicKey)

const recAddress = 'mele1c7nn5mt43m37t0zmqwh6rslrgcr3gd4pxqutpj'

;(async () => {
    /* Step 1
       Query accounts 1 and 2 to see initial balances
    */
    console.log(chalk.cyan('1. Query account 1 and 2'))
    try {
        const acc1 = await mele.query.getAccountInfo(address)
        const acc2 = await mele.query.getAccountInfo(recAddress)

        console.log(chalk.green('Account 1'))
        console.log(chalk.white(JSON.stringify(acc1, null, 4)))
        console.log(chalk.green('Account 2'))
        console.log(chalk.white(JSON.stringify(acc2, null, 4)))
    } catch (e) {
        return console.log(chalk.red('Error while fetching accounts.', e))
    }

    /* Step 2
       Transfer 100umele from account 1 to account 2
    */
    console.log(
        chalk.cyan('2. Transfer 100umele from account 1 to account 2')
    )
    const tx = await mele.transfer(
        address,
        recAddress,
        [{ denom: 'umele', amount: '100' }],
        keyPair.privateKey
    )
    console.log(
        chalk.yellow('Relaying the transaction and waiting for commit...')
    )

    if (!tx || tx.code !== 0) {
        return console.log(
            chalk.red('Error while relaying the transaction.', tx.code)
        )
    }

    await delay(7000)

    /* Step 3
       Query accounts 1 and 2 again to see balance changes after the transfer transaction.
    */
    console.log(chalk.cyan('3. Query account 1 and 2'))
    try {
        const newAcc1 = await mele.query.getAccountInfo(address)
        const newAcc2 = await mele.query.getAccountInfo(recAddress)

        console.log(chalk.green('Account 1'))
        console.log(chalk.white(JSON.stringify(newAcc1, null, 4)))
        console.log(chalk.green('Account 2'))
        console.log(chalk.white(JSON.stringify(newAcc2, null, 4)))
    } catch (e) {
        return console.log(chalk.red('Error while fetching accounts.', e))
    }
})()