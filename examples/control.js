const { Mele, MnemonicSigner, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const signer = new MnemonicSigner(
    'lawn cup spawn stay amazing stuff marble egg north measure survey until divorce ridge hat whip okay home solar brave soft nut kitchen lady'
)

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: signer,
})

;(async () => {
    /* Step 1
       Query treasury
    */
    console.log('\n', chalk.cyan('1. Query treasury'))
    try {
        const supply = await mele.query.getAccountInfo('mele1vmafl8f3s6uuzwnxkqz0eza47v6ecn0te00crk')
        let melc = supply.value.coins.find(i => i.denom === 'umelc')

        console.log(
            chalk.yellow('Balance: '),
            chalk.white(melc.amount),
            chalk.magenta('uMELC'),
            chalk.white(Utils.fromUmelc(melc.amount)),
            chalk.magenta('MELC')
        )
    } catch (e) {
        return console.log(chalk.red('Error while fetching total supply.', e))
    }

    /* Step 2
       Execute MintTreasurySupplyProposal 
    */
    console.log(
        '\n',
        chalk.cyan(
            `2. Mint treasury supply - 10000000 MELC (${Utils.toUmelc(
                '10000000',
                'melc'
            )} uMELC)`
        )
    )
    const tx = mele.control.submitMintTreasurySupplyProposal(
        'Mint treasury supply',
        'Mint treasury supply proposal',
        [{ denom: 'umelc', amount: Utils.toUmelc('10000000', 'melc') }]
    )

    console.log(
        chalk.yellow('Relaying the transaction and waiting for commit...')
    )

    const txEvents = await tx.sendTransaction()

    try {
        await Utils.promisify(txEvents)

        /* Step 3
           Query treasury.
        */
        console.log('\n', chalk.cyan('3. Query treasury'))

        try {
            const newSupply = await mele.query.getAccountInfo('mele1vmafl8f3s6uuzwnxkqz0eza47v6ecn0te00crk')
            melc = newSupply.value.coins.find(i => i.denom === 'umelc')

            console.log(
                chalk.yellow('Balance: '),
                chalk.white(melc.amount),
                chalk.magenta('uMELC'),
                chalk.white(Utils.fromUmelc(melc.amount)),
                chalk.magenta('MELC')
            )
        } catch (e) {
            return console.log(chalk.red('Error while fetching account.', e))
        }
    } catch (e) {
        console.log(chalk.red('Error while relaying the transaction.', error))
    }
})()
