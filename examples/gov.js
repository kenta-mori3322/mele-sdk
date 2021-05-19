const { Mele, MnemonicSigner, Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

const CHAIN_ID = 'test'
const RPC = 'http://localhost:26657/'

const validator1Mnemonic =
    'pet apart myth reflect stuff force attract taste caught fit exact ice slide sheriff state since unusual gaze practice course mesh magnet ozone purchase'
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


;(async () => {
    /* Step 1
       Create a text proposal
    */
    console.log(chalk.cyan('1. Create a text proposal'))
    let txEvents = await mele.governance
        .submitTextProposal(
            [
                {
                    denom: 'umelg',
                    amount: '5000000',
                },
            ],
            'Test governance proposal',
            'Governance proposal showcasing the process'
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
    txEvents = await mele.governance
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
    txEvents = await meleValidator1.governance
        .vote(proposalId, 1)
        .sendTransaction()

    tx = await Utils.promisify(txEvents)
    let votes = await mele.query.governance.getVotes(proposalId)
    console.log(JSON.stringify(votes, null, 4))

    /* Step 4
       Wait for voting period to end
    */
    console.log(
        chalk.cyan('5. Wait for the voting period to end and query proposal')
    )

    let waiting = true
    while (waiting) {
        proposal = await mele.query.governance.getProposal(proposalId)

        if (proposal.status === 3) {
            console.log(JSON.stringify(proposal, null, 4))

            waiting = false
        } else {
            await new Promise(r => setTimeout(r, 1500))
        }
    }
})()
