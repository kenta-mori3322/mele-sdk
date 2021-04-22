const { Mele, MnemonicSigner, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const mnemonic =
    'around fire birth cradle assault equal risk dune goat recycle torch hole control pluck cry math noble crystal language uncover leave ski dust answer'

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: new MnemonicSigner(mnemonic),
})

const meleValidator = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: new MnemonicSigner(
        'pet apart myth reflect stuff force attract taste caught fit exact ice slide sheriff state since unusual gaze practice course mesh magnet ozone purchase'
    ),
})

;(async () => {
    let validator

    const params = await mele.query.distribution.getParameters()
    console.log(chalk.green('Distribution params'))
    console.log(JSON.stringify(params, null, 4))

    let pool = await mele.query.distribution.getCommunityPool()
    console.log(chalk.green('Community pool'))
    console.log(JSON.stringify(pool, null, 4))

    pool = await mele.query.distribution.getBurnedPool()
    console.log(chalk.green('Burned pool'))
    console.log(JSON.stringify(pool, null, 4))

    let vals = await mele.query.staking.getValidators()
    validator = vals[0]

    validator.delegator_address = Utils.encodeAddress(
        Utils.decodeAddress(validator.operator_address, 'melevaloper'),
        'mele'
    )

    const rewards = await mele.query.distribution.getValidatorOutstandingRewards(
        validator.operator_address
    )
    console.log(
        chalk.green('Validator'),
        chalk.white(validator.operator_address),
        chalk.green('rewards')
    )
    console.log(JSON.stringify(rewards, null, 4))

    const commission = await mele.query.distribution.getValidatorCommission(
        validator.operator_address
    )
    console.log(
        chalk.green('Validator'),
        chalk.white(validator.operator_address),
        chalk.green('commission')
    )
    console.log(JSON.stringify(commission, null, 4))

    const slashes = await mele.query.distribution.getValidatorSlashes(
        validator.operator_address,
        '0',
        '5'
    )
    console.log(
        chalk.green('Validator'),
        chalk.white(validator.operator_address),
        chalk.green('slashes')
    )
    console.log(JSON.stringify(slashes, null, 4))

    const delRewards = await mele.query.distribution.getDelegationRewards(
        validator.delegator_address,
        validator.operator_address
    )
    console.log(
        chalk.green('Delegator'),
        chalk.white(validator.delegator_address),
        chalk.green('rewards for'),
        chalk.white(validator.operator_address)
    )
    console.log(JSON.stringify(delRewards, null, 4))

    const delTotalRewards = await mele.query.distribution.getDelegatorTotalRewards(
        validator.delegator_address
    )
    console.log(
        chalk.green('Delegator'),
        chalk.white(validator.delegator_address),
        chalk.green('total rewards')
    )
    console.log(JSON.stringify(delTotalRewards, null, 4))

    const withdrawAddr = await mele.query.distribution.getWithdrawAddress(
        validator.delegator_address
    )
    console.log(
        chalk.green('Delegator'),
        chalk.white(validator.delegator_address),
        chalk.green('withdraw address')
    )
    console.log(JSON.stringify(withdrawAddr, null, 4))

    console.log(chalk.green('Withdraw rewards transaction'))
    let txEvents = await meleValidator.distribution
        .withdrawDelegationReward(validator.operator_address)
        .sendTransaction()

    let txPromise = new Promise((resolve, reject) => {
        txEvents
            .on('hash', hash => {
                console.log(chalk.cyan('Hash'))
                console.log(hash)
            })
            .on('receipt', receipt => {
                console.log(chalk.cyan('Receipt'))
                console.log(JSON.stringify(receipt, null, 4))
            })
            .on('confirmation', confirmation => {
                console.log(chalk.cyan('Confirmation'))
                console.log(JSON.stringify(confirmation, null, 4))

                resolve(confirmation)
            })
            .on('error', error => {
                console.log(chalk.red('Error'))
                console.log(JSON.stringify(error, null, 4))

                reject(error)
            })
    })

    await txPromise

    console.log(chalk.green('Withdraw validator commission transaction'))
    txEvents = await meleValidator.distribution
        .withdrawValidatorCommission(validator.operator_address)
        .sendTransaction()

    txPromise = new Promise((resolve, reject) => {
        txEvents
            .on('hash', hash => {
                console.log(chalk.cyan('Hash'))
                console.log(hash)
            })
            .on('receipt', receipt => {
                console.log(chalk.cyan('Receipt'))
                console.log(JSON.stringify(receipt, null, 4))
            })
            .on('confirmation', confirmation => {
                console.log(chalk.cyan('Confirmation'))
                console.log(JSON.stringify(confirmation, null, 4))

                resolve(confirmation)
            })
            .on('error', error => {
                console.log(chalk.red('Error'))
                console.log(JSON.stringify(error, null, 4))

                reject(error)
            })
    })

    await txPromise

    console.log(chalk.green('Fund community pool transaction'))
    txEvents = await mele.distribution
        .fundCommunityPool([
            {
                amount: '100',
                denom: 'umelc',
            },
        ])
        .sendTransaction()

    txPromise = new Promise((resolve, reject) => {
        txEvents
            .on('hash', hash => {
                console.log(chalk.cyan('Hash'))
                console.log(hash)
            })
            .on('receipt', receipt => {
                console.log(chalk.cyan('Receipt'))
                console.log(JSON.stringify(receipt, null, 4))
            })
            .on('confirmation', confirmation => {
                console.log(chalk.cyan('Confirmation'))
                console.log(JSON.stringify(confirmation, null, 4))

                resolve(confirmation)
            })
            .on('error', error => {
                console.log(chalk.red('Error'))
                console.log(JSON.stringify(error, null, 4))

                reject(error)
            })
    })

    await txPromise
})()
