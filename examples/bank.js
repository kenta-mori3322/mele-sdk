const { Mele, MnemonicSigner, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const mnemonic =
    'betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire'

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: new MnemonicSigner(mnemonic),
})

const recAddress = 'mele1c7nn5mt43m37t0zmqwh6rslrgcr3gd4pxqutpj'

;(async () => {
    /* Step 1
       Query accounts 1 and 2 to see initial balances
    */
    console.log(chalk.cyan('1. Query account 1 and 2'))
    try {
        const acc1 = await mele.query.getAccountInfo(mele.signer.getAddress())
        const acc2 = await mele.query.getAccountInfo(recAddress)

        console.log(chalk.green('Account 1'))
        console.log(chalk.white(JSON.stringify(acc1, null, 4)))
        console.log(chalk.green('Account 2'))
        console.log(chalk.white(JSON.stringify(acc2, null, 4)))
    } catch (e) {
        return console.log(chalk.red('Error while fetching accounts.', e))
    }

    /* Step 2
       Transfer 100umelc from account 1 to account 2
    */
    console.log(chalk.cyan('2. Transfer 1000000000umelg from account 1 to account 2'))
    const rTx = mele.bank
        .transfer(recAddress, [{ denom: 'umelg', amount: '1000000000' }])

    const fee = await rTx.calculateFees()
    console.log(
        chalk.green('Calculated fees: '),
        chalk.white(fee),
        chalk.magenta('umelc'),
        chalk.white(Utils.fromUmelc(String(fee))),
        chalk.magenta('MELC')
    )

    const txEvents = await rTx
        .sendTransaction()
    console.log(
        chalk.yellow('Relaying the transaction and waiting for commit...')
    )

    txEvents.on('error', err => {
        return console.log(
            chalk.red('Error while relaying the transaction.', err)
        )
    })

    txEvents.on('hash', hash => {
        console.log(chalk.cyan('Received tx hash'), chalk.green(hash))
    })

    txEvents.on('receipt', receipt => {
        console.log(chalk.green('Receipt:'))
        console.log(chalk.white(JSON.stringify(receipt, null, 4)))
    })

    txEvents.on('confirmation', async confirmation => {
        /* Step 3
           Query accounts 1 and 2 again to see balance changes after the transfer transaction.
        */
        console.log(chalk.cyan('3. Query account 1 and 2'))
        try {
            const newAcc1 = await mele.query.getAccountInfo(
                mele.signer.getAddress()
            )
            const newAcc2 = await mele.query.getAccountInfo(recAddress)

            console.log(chalk.green('Account 1'))
            console.log(chalk.white(JSON.stringify(newAcc1, null, 4)))
            console.log(chalk.green('Account 2'))
            console.log(chalk.white(JSON.stringify(newAcc2, null, 4)))
        } catch (e) {
            return console.log(chalk.red('Error while fetching accounts.', e))
        }
    })
})()
