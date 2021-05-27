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
    let validator

    const params = await mele.query.staking.getParameters()
    console.log(chalk.green('Staking params'))
    console.log(JSON.stringify(params, null, 4))

    const pool = await mele.query.staking.getPool()
    console.log(chalk.green('Staking pool'))
    console.log(JSON.stringify(pool, null, 4))

    let vals = await mele.query.staking.getValidators()
    console.log(chalk.green('Validators'))
    console.log(JSON.stringify(vals, null, 4))

    validator = vals[0]

    validator.delegator_address = Utils.encodeAddress(
        Utils.decodeAddress(validator.operator_address, 'melevaloper'),
        'mele'
    )

    const val = await mele.query.staking.getValidator(
        validator.operator_address
    )
    console.log(
        chalk.green('Validator'),
        chalk.white(validator.operator_address)
    )
    console.log(JSON.stringify(val, null, 4))

    const valDelegations = await mele.query.staking.getValidatorDelegations(
        validator.operator_address
    )
    console.log(
        chalk.green('Validator'),
        chalk.white(validator.operator_address),
        chalk.green('delegations')
    )
    console.log(JSON.stringify(valDelegations, null, 4))

    const valUnbondingDelegations = await mele.query.staking.getValidatorUnbondingDelegations(
        validator.operator_address
    )
    console.log(
        chalk.green('Validator'),
        chalk.white(validator.operator_address),
        chalk.green('unbonding delegations')
    )
    console.log(JSON.stringify(valUnbondingDelegations, null, 4))

    const delDelegations = await mele.query.staking.getDelegatorDelegations(
        validator.delegator_address
    )
    console.log(
        chalk.green('Delegator'),
        chalk.white(validator.delegator_address),
        chalk.green('delegations')
    )
    console.log(JSON.stringify(delDelegations, null, 4))

    const delUnbondingDelegations = await mele.query.staking.getDelegatorUnbondingDelegations(
        validator.delegator_address
    )
    console.log(
        chalk.green('Delegator'),
        chalk.white(validator.delegator_address),
        chalk.green('unbonding delegations')
    )
    console.log(JSON.stringify(delUnbondingDelegations, null, 4))

    console.log(chalk.green('Delegate transaction'))
    let txEvents = await mele.staking
        .delegate(validator.operator_address, {
            denom: 'umelg',
            amount: String(100000),
        })
        .sendTransaction()

    let txPromise = await new Promise((resolve, reject) => {
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

    const val2 = await mele.query.staking.getValidator(
        validator.operator_address
    )
    console.log(
        chalk.green('Validator'),
        chalk.white(JSON.stringify(val2, null, 4))
    )

    console.log(chalk.green('Undelegate transaction'))
    txEvents = await mele.staking
        .undelegate(validator.operator_address, {
            denom: 'umelg',
            amount: String(100000),
        })
        .sendTransaction()

    txPromise = await new Promise((resolve, reject) => {
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

    const val3 = await mele.query.staking.getValidator(
        validator.operator_address
    )
    console.log(
        chalk.green('Validator'),
        chalk.white(JSON.stringify(val3, null, 4))
    )
})()
