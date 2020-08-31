const { Mele, KeyPairSigner, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const signer = new KeyPairSigner(
    '7238378070a5168733402d838033d7c9faa576ad906fcfd6693ed365f0ae0d16'
)

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: signer,
})

const delay = (ms = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

const formatTxs = txs => {
    if (txs.length) {
        for (let i = 0; i < txs.length; i++) {
            console.log(chalk.yellow('Hash: '), chalk.white(txs[i].hash))
            console.log(chalk.yellow('Height: '), chalk.white(txs[i].height))
            console.log(
                chalk.yellow('Valid: '),
                chalk.white(txs[i].valid ? chalk.green('Yes') : chalk.red('No'))
            )

            console.log(chalk.yellow('Msgs: '))
            for (let j = 0; j < txs[i].msgs.length; j++) {
                console.log(
                    '\t',
                    chalk.yellow('Module: '),
                    chalk.white(txs[i].msgs[j].module)
                )
                console.log(
                    '\t',
                    chalk.yellow('Action: '),
                    chalk.white(txs[i].msgs[j].action)
                )
                console.log(
                    '\t',
                    chalk.yellow('Addresses: '),
                    chalk.white(txs[i].msgs[j].addresses.join(', '))
                )
                console.log(
                    '\t',
                    chalk.yellow('Data: '),
                    chalk.white(JSON.stringify(txs[i].msgs[j].data, null, 4))
                )
            }
        }
    } else {
        console.log(chalk.red('No transactions.'))
    }
}

const formatEvents = events => {
    if (events.length) {
        for (let i = 0; i < events.length; i++) {
            console.log(chalk.yellow('Height: '), chalk.white(events[i].height))
            console.log(chalk.yellow('Action: '), chalk.white(events[i].action))
            console.log(
                chalk.yellow('Addresses: '),
                chalk.white(events[i].addresses.join(', '))
            )
            console.log(
                chalk.yellow('Data: '),
                chalk.white(JSON.stringify(events[i].data, null, 4))
            )
        }
    } else {
        console.log(chalk.red('No events.'))
    }
}

const delayBetweenSteps = 2000

;(async () => {
    /* Step 1
       Query last 5 transactions by module: bank
    */
    console.log(
        '\n',
        chalk.cyan('1. Query last 5 transactions by module: bank')
    )
    formatTxs(
        await mele.indexer.transactions({
            module: 'bank',
            limit: '5',
        })
    )

    await delay(delayBetweenSteps)

    /* Step 2
       Query transactions by action: transfer
    */
    console.log('\n', chalk.cyan('2. Query transactions by action: transfer'))
    formatTxs(
        await mele.indexer.transactions({
            action: 'transfer',
        })
    )

    await delay(delayBetweenSteps)

    /* Step 3
       Query transactions by address
    */
    console.log(
        '\n',
        chalk.cyan(
            `3. Query last 5 transactions by address: ${mele.signer.getAddress()}`
        )
    )
    formatTxs(
        await mele.indexer.transactions({
            address: mele.signer.getAddress(),
            limit: '5',
        })
    )

    await delay(delayBetweenSteps)

    /* Step 4
       Query latest block
    */
    console.log('\n', chalk.cyan('4. Query latest block'))
    let block = await mele.indexer.latestBlock()
    console.log(chalk.yellow('Block:'))
    console.log(JSON.stringify(block.block, null, 4))
    console.log(chalk.yellow('Transactions in block:'))
    formatTxs(block.txs)
    console.log(chalk.yellow('Events in block:'))
    formatEvents(block.events)

    await delay(delayBetweenSteps)

    /* Step 5
       Query last 5 transfer block events
    */
    console.log('\n', chalk.cyan('5. Query last 5 transfer block events'))
    let events = await mele.indexer.blockEvents({
        action: 'transfer',
        limit: '5',
    })
    formatEvents(events)
})()
