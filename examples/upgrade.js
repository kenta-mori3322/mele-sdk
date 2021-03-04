const { Mele, MnemonicSigner, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const CHAIN_ID = 'testnet'
const RPC = 'http://18.203.56.151:26657/'

const validator1Mnemonic =
    'excuse river blur hair devote bonus fit rookie blouse auto acoustic auto announce mystery slam exotic visit admit mule emotion voice clap tongue ramp'
const validator2Mnemonic =
    'honey fringe auto crucial holiday control auto reduce blind nephew piano cable intact medal wife insane response year awesome short when give bargain model'

const testMnemonic =
    'betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire'

const mele = new Mele({
    nodeUrl: RPC,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(testMnemonic),
})

const meleValidator1 = new Mele({
    nodeUrl: RPC,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(validator1Mnemonic),
})

const meleValidator2 = new Mele({
    nodeUrl: RPC,
    chainId: CHAIN_ID,
    signer: new MnemonicSigner(validator2Mnemonic),
})

;(async () => {
    /* Step 1
       Create a text proposal
    */
    console.log(chalk.cyan('1. Create a software upgrade proposal'))
    let txEvents = mele.governance
        .submitSoftwareUpgradeProposal(
            [
                {
                    denom: 'umelg',
                    amount: '5000000',
                },
            ],
            'Test software upgrade proposal',
            'Software upgrade',
            {
                height: 9700,
                name: 'TestUpgrade',
                info: 'TestUpgradeInfo'
            }
        )
        .sendTransaction()

    let tx = await Utils.promisify(txEvents)

    let proposalIdEvent = tx.tx_result.events.find(event => {
        return (
            event.type === 'submit_proposal' &&
            Buffer.from(event.attributes[0].key, 'base64').toString() ===
                'proposal_id'
        )
    })

    let proposalId = Buffer.from(
        proposalIdEvent.attributes[0].value,
        'base64'
    ).toString()

    let proposal = await mele.query.governance.getProposal(proposalId)
    console.log(JSON.stringify(proposal, null, 4))

    /* Step 2
       Deposit funds
    */
    console.log(chalk.cyan('2. Deposit funds'))
    txEvents = mele.governance
        .deposit(proposalId, [
            {
                denom: 'umelg',
                amount: '5000000',
            },
        ])
        .sendTransaction()

    tx = await Utils.promisify(txEvents)
    proposal = await mele.query.governance.getProposal(proposalId)
    console.log(JSON.stringify(proposal, null, 4))

    /* Step 3
       Vote from validator 1
    */
    console.log(chalk.cyan('3. Vote from validator 1'))
    txEvents = meleValidator1.governance
        .vote(proposalId, 'yes')
        .sendTransaction()

    tx = await Utils.promisify(txEvents)
    let votes = await mele.query.governance.getVotes(proposalId)
    console.log(JSON.stringify(votes, null, 4))

    /* Step 4
       Vote from validator 2
    */
    console.log(chalk.cyan('4. Vote from validator 2'))
    txEvents = meleValidator2.governance
        .vote(proposalId, 'yes')
        .sendTransaction()

    tx = await Utils.promisify(txEvents)
    votes = await mele.query.governance.getVotes(proposalId)
    console.log(JSON.stringify(votes, null, 4))

    /* Step 5
       Wait for voting period to end
    */
    console.log(
        chalk.cyan('5. Wait for the voting period to end and query proposal')
    )

    let waiting = true
    while (waiting) {
        proposal = await mele.query.governance.getProposal(proposalId)

        if (proposal.proposal_status === 'Passed') {
            console.log(JSON.stringify(proposal, null, 4))

            waiting = false
        } else {
            await new Promise(r => setTimeout(r, 1500))
        }
    }

    /* Step 6
       Query software upgrade plan
    */
    console.log(
        chalk.cyan('6. Query software upgrade plan')
    )

    const plan = await mele.query.upgrade.getCurrent()

    console.log(JSON.stringify(plan, null, 4))
})()
