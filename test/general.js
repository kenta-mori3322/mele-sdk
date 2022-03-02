const {
    Mele,
    Utils,
    KeyPairSigner,
    MnemonicSigner,
} = require('../lib/mele-sdk.cjs.js')
const assert = require('assert')
const bip39 = require('bip39')
const Long = require('long')

const NODE_URL = 'http://localhost:26657/'
const CHAIN_ID = 'test'

const mele = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new KeyPairSigner(
        '7238378070a5168733402d838033d7c9faa576ad906fcfd6693ed365f0ae0d16'
    ),
})

const meleDelegator = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'around fire birth cradle assault equal risk dune goat recycle torch hole control pluck cry math noble crystal language uncover leave ski dust answer'
    ),
})

const meleValidator = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'pet apart myth reflect stuff force attract taste caught fit exact ice slide sheriff state since unusual gaze practice course mesh magnet ozone purchase'
    ),
})

const meleManager = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'lawn cup spawn stay amazing stuff marble egg north measure survey until divorce ridge hat whip okay home solar brave soft nut kitchen lady'
    ),
})

const meleOperator = new Mele({
    nodeUrl: NODE_URL,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(
        'find diamond example tooth need impact document total enrich hobby axis bicycle more oak junk because blade alley mesh electric evolve duty attack once'
    ),
})

describe('Mele Blockchain', function () {
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
            assert.ok(mnemonic.split(' ').length === 12)
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

                let transferTx = mele.bank
                    .transfer(accountB.getAddress(), [
                        { denom: 'umelc', amount: String(amount) },
                    ])

                let fees = await transferTx.calculateFees()

                const txEvents = await transferTx.sendTransaction()

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
                    Number(newAcc1.value.coins.find(item => item.denom == 'umelc')?.amount) ===
                        Number(acc1.value.coins.find(item => item.denom == 'umelc')?.amount) - amount - fees
                )
                
                assert.ok(newAcc2.value)
                assert.ok(
                    Number(newAcc2.value.coins.find(item => item.denom == 'umelc')?.amount) ===
                        Number(acc2.value.coins.find(item => item.denom == 'umelc')?.amount) + amount
                )

                txHash = tx.hash
            })
        })

        describe('Staking/Slashing/Distribution/Mint', () => {
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
                const txEvents = await meleDelegator.staking
                    .delegate(validator.validator_address, {
                        denom: 'umelg',
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
                const txEvents = await meleDelegator.staking
                    .undelegate(validator.validator_address, {
                        denom: 'umelg',
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

            // it('Distribution burned pool can be fetched', async () => {
            //     let res = await mele.query.distribution.getBurnedPool()

            //     assert.ok(res)
            // })

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
                const txEvents = await meleDelegator.distribution
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
                            resolve(error)
                        })
                })

                let tx = await txPromise
                assert.ok(tx)
            })

            it('Community pool can be funded', async () => {
                const txEvents = await meleDelegator.distribution
                    .fundCommunityPool([
                        {
                            amount: '100',
                            denom: 'umelc',
                        },
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
            })

            it('Validator commission can be withdrawn', async () => {
                const txEvents = await meleValidator.distribution
                    .withdrawValidatorCommission(validator.validator_address)
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

            it('Mint params can be fetched', async () => {
                const pool = await mele.query.mint.getParameters()

                assert.ok(pool)
            })

            it('Mint inflation can be fetched', async () => {
                const inflation = await mele.query.mint.getInflation()

                assert.ok(inflation)
            })

            it('Mint annual provisions can be fetched', async () => {
                const annual = await mele.query.mint.getAnnualProvisions()

                assert.ok(annual)
            })

            it('Staking reward rate can be fetched', async () => {
                const rate = await mele.query.staking.getRewardRate()

                assert.ok(rate)
            })
        })

        describe('Governance', () => {
            it('Governance params can be queried', async () => {
                let params = await mele.query.governance.getParameters()

                assert.ok(params)

                assert.ok(params.deposit)
                assert.ok(params.tally)
                assert.ok(params.voting)

                assert.ok(params.voting.voting_period)

                assert.ok(params.deposit.max_deposit_period)
                assert.ok(params.deposit.min_deposit)

                assert.ok(params.tally.quorum)
                assert.ok(params.tally.threshold)
            })

            it('Text proposal can be created', async () => {
                const txEvents = await meleDelegator.governance
                    .submitTextProposal(
                        [
                            {
                                denom: 'umelg',
                                amount: '5000000',
                            },
                        ],
                        'ProposalTestTitle',
                        'ProposalTestDescription'
                    )
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

            let proposal

            it('Proposals can be fetched', async () => {
                const proposals = await meleDelegator.query.governance.getProposals()

                proposal = proposals.pop()

                assert.ok(proposal)
            })

            it('Single proposal can be fetched', async () => {
                const aProposal = await meleDelegator.query.governance.getProposal(
                    String(proposal.id)
                )

                assert.ok(aProposal)

                assert.ok(aProposal.content)
                assert.ok(aProposal.content.type === 'gov/TextProposal')
                assert.ok(aProposal.content.value)
                assert.ok(aProposal.content.value.title === 'ProposalTestTitle')
                assert.ok(
                    aProposal.content.value.description ===
                        'ProposalTestDescription'
                )
            })

            it('Proposal deposits can be fetched', async () => {
                const deposits = await meleDelegator.query.governance.getDeposits(
                    String(proposal.id)
                )

                assert.ok(deposits)

                assert.ok(deposits.length > 0)
                assert.ok(
                    deposits[0].depositor === meleDelegator.signer.getAddress()
                )
            })

            it('Deposit transaction can be invoked', async () => {
                const txEvents = await meleDelegator.governance
                    .deposit(proposal.id, [
                        {
                            denom: 'umelg',
                            amount: '5000000',
                        },
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
            })

            it('Validator can vote on a proposal', async () => {
                const txEvents = await meleValidator.governance
                    .vote(proposal.id, 1)
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

            it('Proposal votes can be fetched', async () => {
                const votes = await meleDelegator.query.governance.getVotes(
                    String(proposal.id)
                )

                assert.ok(votes)

                assert.ok(votes.length > 0)
                assert.ok(votes[0].voter === meleValidator.signer.getAddress())
            })

            it('Community pool spend proposal can be created', async () => {
                const txEvents = await meleDelegator.governance
                    .submitCommunityPoolSpendProposal(
                        [
                            {
                                denom: 'umelg',
                                amount: '5000000',
                            },
                        ],
                        'ProposalTestTitle',
                        'ProposalTestDescription',
                        mele.signer.getAddress(),
                        [
                            {
                                denom: 'umelc',
                                amount: '100',
                            },
                        ]
                    )
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

            it('Burned pool spend proposal can be created', async () => {
                const txEvents = await meleDelegator.governance
                    .submitBurnedPoolSpendProposal(
                        [
                            {
                                denom: 'umelg',
                                amount: '5000000',
                            },
                        ],
                        'ProposalTestTitle',
                        'ProposalTestDescription',
                        mele.signer.getAddress(),
                        [
                            {
                                denom: 'umelc',
                                amount: '100',
                            },
                        ]
                    )
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
                            resolve(error)
                        })
                })

                let tx = await txPromise
                assert.ok(tx)
            })

            it('Mint treasury supply proposal can be created', async () => {
                const txEvents = await meleDelegator.governance
                    .submitMintTreasurySupplyProposal(
                        [
                            {
                                denom: 'umelg',
                                amount: '5000000',
                            },
                        ],
                        'ProposalTestTitle',
                        'ProposalTestDescription',
                        [
                            {
                                denom: 'umelc',
                                amount: '100',
                            },
                        ]
                    )
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

            it('Burn treasury supply proposal can be created', async () => {
                const txEvents = await meleDelegator.governance
                    .submitBurnTreasurySupplyProposal(
                        [
                            {
                                denom: 'umelg',
                                amount: '5000000',
                            },
                        ],
                        'ProposalTestTitle',
                        'ProposalTestDescription',
                        [
                            {
                                denom: 'umelc',
                                amount: '100',
                            },
                        ]
                    )
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

            it('Parameter change proposal can be created', async () => {
                const txEvents = await meleDelegator.governance
                    .submitParameterChangeProposal(
                        [
                            {
                                denom: 'umelg',
                                amount: '5000000',
                            },
                        ],
                        'ProposalTestTitle',
                        'ProposalTestDescription',
                        [
                            {
                                subspace: 'staking',
                                key: 'MaxValidators',
                                value: '105',
                            },
                        ]
                    )
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

            it('Software upgrade proposal can be created', async () => {
                const txEvents = await meleDelegator.governance
                    .submitSoftwareUpgradeProposal(
                        [
                            {
                                denom: 'umelg',
                                amount: '5000000',
                            },
                        ],
                        'ProposalTestTitle',
                        'ProposalTestDescription',
                        {
                            name: 'TestUpgrade',
                            height: Long.fromNumber(1000000),
                            info: 'Software upgrade test',
                        }
                    )
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

            it('Cancel software upgrade proposal can be created', async () => {
                const txEvents = await meleDelegator.governance
                    .submitCancelSoftwareUpgradeProposal(
                        [
                            {
                                denom: 'umelg',
                                amount: '5000000',
                            },
                        ],
                        'ProposalTestTitle',
                        'ProposalTestDescription'
                    )
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
        })

        describe('Control', () => {
            it('Control module params can be queried', async () => {
                let params = await mele.query.control.getParameters()

                assert.ok(params)

                assert.ok(params.managers)
                assert.ok(params.managers.length)
            })

            it('Text proposal execution can be created', async () => {
                const txEvents = await meleManager.control
                    .submitTextProposal(
                        'ExecutionTestTitle',
                        'ExecutionTestDescription'
                    )
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

            let execution

            it('Executions can be fetched', async () => {
                const executions = await meleManager.query.control.getExecutions()

                execution = executions.pop()

                assert.ok(execution)
            })

            it('Single execution can be fetched', async () => {
                const aExecution = await meleManager.query.control.getExecution(
                    String(execution.id)
                )

                assert.ok(aExecution)

                assert.ok(aExecution.content)
                assert.ok(aExecution.content.value)
                assert.ok(
                    aExecution.content.value.title === 'ExecutionTestTitle'
                )
                assert.ok(
                    aExecution.content.value.description ===
                        'ExecutionTestDescription'
                )
            })

            it('Community pool spend proposal execution can be created', async () => {
                const txEvents = await meleManager.control
                    .submitCommunityPoolSpendProposal(
                        'ExecutionTestTitle',
                        'ExecutionTestDescription',
                        mele.signer.getAddress(),
                        [
                            {
                                denom: 'umelc',
                                amount: '100',
                            },
                        ]
                    )
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

            it('Burned pool spend proposal execution can be created', async () => {
                const txEvents = await meleManager.control
                    .submitBurnedPoolSpendProposal(
                        'ExecutionTestTitle',
                        'ExecutionTestDescription',
                        mele.signer.getAddress(),
                        [
                            {
                                denom: 'umelc',
                                amount: '100',
                            },
                        ]
                    )
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
                            resolve(error)
                        })
                })

                let tx = await txPromise
                assert.ok(tx)
            })

            it('Mint treasury supply proposal execution can be created', async () => {
                const txEvents = await meleManager.control
                    .submitMintTreasurySupplyProposal(
                        'ExecutionTestTitle',
                        'ExecutionTestDescription',
                        [
                            {
                                denom: 'umelc',
                                amount: '100',
                            },
                        ]
                    )
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

            it('Burn treasury supply proposal execution can be created', async () => {
                const txEvents = await meleManager.control
                    .submitBurnTreasurySupplyProposal(
                        'ExecutionTestTitle',
                        'ExecutionTestDescription',
                        [
                            {
                                denom: 'umelc',
                                amount: '100',
                            },
                        ]
                    )
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

            it('Parameter change proposal execution can be created', async () => {
                const txEvents = await meleManager.control
                    .submitParameterChangeProposal(
                        'ExecutionTestTitle',
                        'ExecutionTestDescription',
                        [
                            {
                                subspace: 'staking',
                                key: 'MaxValidators',
                                value: '105',
                            },
                        ]
                    )
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

            it('Software upgrade execution can be created', async () => {
                const txEvents = await meleManager.control
                    .submitSoftwareUpgradeProposal(
                        'ProposalTestTitle',
                        'ProposalTestDescription',
                        {
                            name: 'TestUpgrade',
                            height: Long.fromNumber(1000000),
                            info: 'Software upgrade test',
                        }
                    )
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

            it('Software upgrade plan can be queried', async () => {
                const plan = await mele.query.upgrade.getCurrent()

                assert.ok(plan)

                assert.ok(plan.value.name === 'TestUpgrade')
                assert.ok(plan.value.height === '1000000')
                assert.ok(plan.value.info === 'Software upgrade test')
            })

            it('Cancel software upgrade execution can be created', async () => {
                const txEvents = await meleManager.control
                    .submitCancelSoftwareUpgradeProposal(
                        'ProposalTestTitle',
                        'ProposalTestDescription'
                    )
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
        })

        describe('Treasury', () => {
            it('Treasury params can be fetched', async () => {
                const params = await meleOperator.query.treasury.getParameters()

                assert.ok(params)

                assert.ok(params.managers)
                assert.ok(params.managers.length)

                assert.ok(params.disbursement_delay_threshold_amount)
                assert.ok(params.disbursement_delay_duration)
            })

            it('Treasury object can be fetched', async () => {
                const treasury = await meleOperator.query.treasury.getTreasury()

                assert.ok(treasury)

                assert.ok(treasury.target_supply)
                assert.ok(treasury.distributed)
                assert.ok(treasury.burned)
            })

            it('Treasury operators can be fetched', async () => {
                const operators = await meleOperator.query.treasury.getOperators()

                assert.ok(operators)

                assert.ok(operators.length)
            })

            it('Operator can disburse funds', async () => {
                const txEvents = await meleOperator.treasury
                    .disburse(
                        mele.signer.getAddress(),
                        [
                            {
                                denom: 'umelc',
                                amount: '5000000000000',
                            },
                        ],
                        'example-reference' +
                            Math.random().toString(36).substring(7)
                    )
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

            it('Treasury disbursements can be fetched', async () => {
                const disbursements = await meleOperator.query.treasury.getAllDisbursements()

                assert.ok(disbursements)

                assert.ok(disbursements.length)
            })

            it('Operator can burn funds', async () => {
                const txEvents = await meleOperator.treasury
                    .burn([
                        {
                            denom: 'umelc',
                            amount: '5000000000000',
                        },
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
            })

            it('Treasury burns can be fetched', async () => {
                const burns = await meleOperator.query.treasury.getBurns()

                assert.ok(burns || [])
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
