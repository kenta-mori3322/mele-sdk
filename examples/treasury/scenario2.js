const { Mele, MnemonicSigner, Utils } = require('../../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const signer = new MnemonicSigner(
    'find diamond example tooth need impact document total enrich hobby axis bicycle more oak junk because blade alley mesh electric evolve duty attack once'
)

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: signer,
})

const address = mele.signer.getAddress()
const recAddress = 'mele1c7nn5mt43m37t0zmqwh6rslrgcr3gd4pxqutpj' // test 2

const delay = (ms = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

;(async () => {
    /* Step 1
       Query recipient account to see initial balances
    */
    console.log('\n', chalk.cyan('1. Query recipient balance'))
    try {
        const acc = await mele.query.getAccountInfo(recAddress)

        console.log(
            chalk.yellow('Balance: '),
            chalk.white(acc.value.coins[0].amount),
            chalk.magenta('uMELC'),
            chalk.white(Utils.fromUmelc(acc.value.coins[0].amount)),
            chalk.magenta('MELC')
        )
    } catch (e) {
        return console.log(chalk.red('Error while fetching account.', e))
    }

    /* Step 2
       Disburse 10 USD to the recipient account
    */
    console.log(
        '\n',
        chalk.cyan(
            `2. Disburse 1500 MELC (${Utils.toUmelc(
                '1500',
                'melc'
            )} uMELC) to recipient`
        )
    )
    const tx = mele.treasury.disburse(
        recAddress,
        [{ denom: 'umlc', amount: Utils.toUmelc('1500', 'melc') }],
        'example-reference-2'
    )

    console.log(
        chalk.yellow('Relaying the transaction and waiting for commit...')
    )

    const txEvents = tx.sendTransaction()

    try {
        await Utils.promisify(txEvents)

        /* Step 3
           Query recipient account again to see balance changes after the disburse transaction.
        */
        console.log('\n', chalk.cyan('3. Query recipient account'))

        try {
            const newAcc = await mele.query.getAccountInfo(recAddress)

            console.log(
                chalk.yellow('Balance: '),
                chalk.white(newAcc.value.coins[0].amount),
                chalk.magenta('uMELC'),
                chalk.white(Utils.fromUmelc(newAcc.value.coins[0].amount)),
                chalk.magenta('MELC')
            )
        } catch (e) {
            return console.log(chalk.red('Error while fetching account.', e))
        }

        /* Step 4
           Wait until the disbursement delay period is over.
        */
        console.log(
            '\n',
            chalk.cyan('4. Wait until the disbursement delay period is over')
        )
        await delay(40000)

        /* Step 4
           Query recipient account again to see balance changes after the disburse transaction.
        */
        console.log('\n', chalk.cyan('5. Query recipient account'))

        try {
            const newAcc = await mele.query.getAccountInfo(recAddress)

            console.log(
                chalk.yellow('Balance: '),
                chalk.white(newAcc.value.coins[0].amount),
                chalk.magenta('uMELC'),
                chalk.white(Utils.fromUmelc(newAcc.value.coins[0].amount)),
                chalk.magenta('MELC')
            )
        } catch (e) {
            return console.log(chalk.red('Error while fetching account.', e))
        }
    } catch (e) {
        console.log(chalk.red('Error while relaying the transaction.', error))
    }
})()
