const {
    Mele,
    Utils,
    KeyPairSigner,
    MnemonicSigner,
} = require('../lib/mele-sdk.cjs.js')
const assert = require('assert')
const bip39 = require('bip39')

const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: new KeyPairSigner(
        '7238378070a5168733402d838033d7c9faa576ad906fcfd6693ed365f0ae0d16'
    ),
})

const meleDelegator = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
    signer: new MnemonicSigner(
        'around fire birth cradle assault equal risk dune goat recycle torch hole control pluck cry math noble crystal language uncover leave ski dust answer'
    ),
})

describe('Mele Blockchain', function() {
    this.timeout(0)

    describe('Wallet', () => {
        it('New wallet can be generated', () => {
            const keyPair = Utils.generateKeyPair()

            assert.ok(keyPair)

            assert.ok(keyPair.privateKey)
            assert.ok(keyPair.publicKey)
        })

        it('New mnemonic can be generated', () => {
            const mnemonic = Utils.generateMnemonic()

            assert.ok(mnemonic)
            assert.ok(mnemonic.split(' ').length === 24)
        })

        it('Private key can be derived by a mnemonic', () => {
            const mnemonic = Utils.generateMnemonic()

            const masterKey = Utils.deriveMasterKey(mnemonic)
            const keyPair = Utils.deriveKeyPairFromAccountAndIndex(masterKey)

            assert.ok(keyPair)

            assert.ok(keyPair.privateKey)
            assert.ok(keyPair.publicKey)
        })

        it('Keypair can be derived from Seed', () => {
            const mnemonic = Utils.generateMnemonic()
            const masterKeyFromMnemonic = Utils.deriveMasterKey(mnemonic)
            const keyPairFromMnemonic = Utils.deriveKeyPairFromAccountAndIndex(
                masterKeyFromMnemonic
            )

            assert.ok(masterKeyFromMnemonic)
            assert.ok(keyPairFromMnemonic)
            assert.ok(keyPairFromMnemonic.privateKey)
            assert.ok(keyPairFromMnemonic.publicKey)

            const seed = bip39.mnemonicToSeedSync(mnemonic)
            const masterKeyFromSeed = Utils.deriveMasterKeyFromSeed(seed)
            const keyPairFromSeed = Utils.deriveKeyPairFromAccountAndIndex(
                masterKeyFromSeed
            )

            assert.ok(masterKeyFromSeed)
            assert.ok(keyPairFromSeed)
            assert.ok(keyPairFromSeed.privateKey)
            assert.ok(keyPairFromSeed.publicKey)

            assert.deepEqual(masterKeyFromMnemonic, masterKeyFromSeed)
            assert.deepEqual(keyPairFromMnemonic, keyPairFromSeed)
            assert.deepEqual(
                keyPairFromMnemonic.privateKey,
                keyPairFromSeed.privateKey
            )
            assert.deepEqual(
                keyPairFromMnemonic.publicKey,
                keyPairFromSeed.publicKey
            )
            assert.deepEqual(
                keyPairFromMnemonic.publicKey,
                keyPairFromSeed.publicKey
            )
        })
    })

    describe('Utils', () => {
        it('Block data can be fetched for given height', async () => {
            const block = await mele.query.getBlock(2)

            assert.ok(block)
            assert.ok(block.block)
            assert.ok(block.block.header)
            assert.ok(block.block.header.height === '2')
        })

        it('Status can be fetched', async () => {
            const status = await mele.query.getStatus()

            assert.ok(status)
            assert.ok(status.node_info)
        })
    })

    describe('Tests with an accounts', () => {
        let txHash

        const accountB = new MnemonicSigner(
            'toss sense candy point cost rookie jealous snow ankle electric sauce forward oblige tourist stairs horror grunt tenant afford master violin final genre reason'
        )

        describe('Bank', () => {
            it('Users can transfer funds', async () => {
                const amount = 100

                const acc1 = await mele.query.getAccountInfo(
                    mele.signer.getAddress()
                )
                const acc2 = await mele.query.getAccountInfo(
                    accountB.getAddress()
                )

                assert.ok(acc1)
                assert.ok(acc2)

                assert.ok(acc1.value)
                assert.ok(acc2.value)

                const txEvents = mele.bank
                    .transfer(accountB.getAddress(), [
                        { denom: 'umlc', amount: String(amount) },
                    ])
                    .sendTransaction()

                assert.ok(txEvents)
                const txPromise = new Promise((resolve, reject) => {
                    txEvents
                        .on('hash', hash => {
                            assert.ok(hash)
                        })
                        .on('receipt', receipt => {
                            assert.ok(receipt)
                        })
                        .on('confirmation', confirmation => {
                            assert.ok(confirmation)

                            resolve(confirmation)
                        })
                        .on('error', error => {
                            reject(error)
                        })
                })

                let tx = await txPromise
                assert.ok(tx)
                assert.ok(tx.hash)

                assert.ok(tx.tx_result)
                assert.ok(tx.tx_result.code === 0)
                assert.ok(tx.height)

                const newAcc1 = await mele.query.getAccountInfo(
                    mele.signer.getAddress()
                )
                const newAcc2 = await mele.query.getAccountInfo(
                    accountB.getAddress()
                )

                assert.ok(newAcc1)
                assert.ok(newAcc2)

                assert.ok(newAcc1.value)
                assert.ok(
                    Number(newAcc1.value.coins[0].amount) ===
                        Number(acc1.value.coins[0].amount) - amount
                )

                assert.ok(newAcc2.value)
                assert.ok(
                    Number(newAcc2.value.coins[0].amount) ===
                        Number(acc2.value.coins[0].amount) + amount
                )

                txHash = tx.hash
            })
        })

        describe('Staking/Slashing/Distribution', () => {
            let validator

            it('Staking params can be fetched', async () => {
                const params = await mele.query.staking.getParameters()

                assert.ok(params)
            })

            it('Staking pool can be fetched', async () => {
                const pool = await mele.query.staking.getPool()

                assert.ok(pool)
            })

            it('Validators list can be fetched', async () => {
                const vals = await mele.query.staking.getValidators()

                assert.ok(vals)
                assert.ok(vals.length > 0)

                assert.ok(vals[0])

                validator = vals[0]

                validator.operator_address = Utils.encodeAddress(
                    Utils.decodeAddress(
                        validator.operator_address,
                        'melevaloper'
                    ),
                    'mele'
                )
            })

            it('Validators list for delegator can be fetched', async () => {
                const vals = await mele.query.distribution.getDelegatorValidators(
                    validator.operator_address
                )

                assert.ok(vals)
                assert.ok(vals.length > 0)

                assert.ok(vals[0])

                validator.validator_address = vals[0]
            })

            it('Single validator can be fetched', async () => {
                const val = await mele.query.staking.getValidator(
                    validator.validator_address
                )

                assert.ok(val)
            })

            it('Validator delegations can be fetched', async () => {
                const val = await mele.query.staking.getValidatorDelegations(
                    validator.validator_address
                )

                assert.ok(val)
            })

            it('Validator unbonding delegations can be fetched', async () => {
                const val = await mele.query.staking.getValidatorUnbondingDelegations(
                    validator.validator_address
                )

                assert.ok(val)
            })

            it('Delegator delegations can be fetched', async () => {
                const val = await mele.query.staking.getDelegatorDelegations(
                    validator.operator_address
                )

                assert.ok(val)
            })

            it('Delegator unbonding delegations can be fetched', async () => {
                const val = await mele.query.staking.getDelegatorUnbondingDelegations(
                    validator.operator_address
                )

                assert.ok(val)
            })

            it('Delegation can be created', async () => {
                const txEvents = meleDelegator.staking
                    .delegate(validator.validator_address, {
                        denom: 'umlg',
                        amount: String(100000),
                    })
                    .sendTransaction()

                assert.ok(txEvents)
                const txPromise = new Promise((resolve, reject) => {
                    txEvents
                        .on('hash', hash => {
                            assert.ok(hash)
                        })
                        .on('receipt', receipt => {
                            assert.ok(receipt)
                        })
                        .on('confirmation', confirmation => {
                            assert.ok(confirmation)

                            resolve(confirmation)
                        })
                        .on('error', error => {
                            reject(error)
                        })
                })

                let tx = await txPromise
                assert.ok(tx)
                assert.ok(tx.hash)

                assert.ok(tx.tx_result)
                assert.ok(tx.tx_result.code === 0)
                assert.ok(tx.height)
            })

            it('Undelegation can be created', async () => {
                const txEvents = meleDelegator.staking
                    .undelegate(validator.validator_address, {
                        denom: 'umlg',
                        amount: String(100000),
                    })
                    .sendTransaction()

                assert.ok(txEvents)
                const txPromise = new Promise((resolve, reject) => {
                    txEvents
                        .on('hash', hash => {
                            assert.ok(hash)
                        })
                        .on('receipt', receipt => {
                            assert.ok(receipt)
                        })
                        .on('confirmation', confirmation => {
                            assert.ok(confirmation)

                            resolve(confirmation)
                        })
                        .on('error', error => {
                            reject(error)
                        })
                })

                let tx = await txPromise
                assert.ok(tx)
                assert.ok(tx.hash)

                assert.ok(tx.tx_result)
                assert.ok(tx.tx_result.code === 0)
                assert.ok(tx.height)
            })

            it('Slashing parameters can be fetched', async () => {
                let res = await mele.query.slashing.getParameters()

                assert.ok(res)
            })

            it('Signing infos can be fetched', async () => {
                let res = await mele.query.slashing.getSigningInfos()

                assert.ok(res)
            })

            it('Distribution parameters can be fetched', async () => {
                let res = await mele.query.distribution.getParameters()

                assert.ok(res)
            })

            it('Distribution community pool can be fetched', async () => {
                let res = await mele.query.distribution.getCommunityPool()

                assert.ok(res)
            })

            it('Validator rewards can be fetched', async () => {
                let res = await mele.query.distribution.getValidatorOutstandingRewards(
                    validator.validator_address
                )

                assert.ok(res)
            })

            it('Validator commission can be fetched', async () => {
                let res = await mele.query.distribution.getValidatorCommission(
                    validator.validator_address
                )

                assert.ok(res)
            })

            it('Validator slashes can be fetched', async () => {
                let res = await mele.query.distribution.getValidatorSlashes(
                    validator.validator_address,
                    '0',
                    '5'
                )

                assert.ok(res)
            })

            it('Delegator validator rewards can be fetched', async () => {
                let res = await mele.query.distribution.getDelegationRewards(
                    validator.operator_address,
                    validator.validator_address
                )

                assert.ok(res)
            })

            it('Delegator rewards can be fetched', async () => {
                let res = await mele.query.distribution.getDelegatorTotalRewards(
                    validator.operator_address
                )

                assert.ok(res)
            })

            it('Delegator withdraw address can be fetched', async () => {
                let res = await mele.query.distribution.getWithdrawAddress(
                    validator.operator_address
                )

                assert.ok(res)
            })

            it('Delegation reward can be withdrawn', async () => {
                const txEvents = meleDelegator.distribution
                    .withdrawDelegationReward(validator.validator_address)
                    .sendTransaction()

                assert.ok(txEvents)
                const txPromise = new Promise((resolve, reject) => {
                    txEvents
                        .on('hash', hash => {
                            assert.ok(hash)
                        })
                        .on('receipt', receipt => {
                            assert.ok(receipt)
                        })
                        .on('confirmation', confirmation => {
                            assert.ok(confirmation)

                            resolve(confirmation)
                        })
                        .on('error', error => {
                            reject(error)
                        })
                })

                let tx = await txPromise
                assert.ok(tx)
                assert.ok(tx.hash)

                assert.ok(tx.tx_result)
            })
        })

        describe('Query', () => {
            it('Account info can be fetched', async () => {
                const acc = await mele.query.getAccountInfo(
                    mele.signer.getAddress()
                )

                assert.ok(acc)
            })

            it('Transaction info can be fetched', async () => {
                const transaction = await mele.query.getTx(txHash)

                assert.ok(transaction)
            })
        })
    })
})
