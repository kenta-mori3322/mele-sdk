const { Mele, Utils } = require('../lib/mele-sdk.cjs.js')
const assert = require('assert')
const bip39 = require('bip39')


const mele = new Mele({
    nodeUrl: 'http://localhost:26657/',
    chainId: 'test',
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

            console.log(JSON.stringify(block, null, 4))

            assert.ok(block)
            assert.ok(block.block)
            assert.ok(block.block.header)
            assert.ok(block.block.header.height === '2')
        })

        it('Status can be fetched', async () => {
            const status = await mele.query.getStatus()

            console.log(JSON.stringify(status, null, 4))

            assert.ok(status)
            assert.ok(status.node_info)    
        })
    })

    describe('Tests with an accounts', () => {
        let txHash

        const mnemonicA = 'betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire'
        let keyPairA
        let addressA

        const mnemonicB = 'toss sense candy point cost rookie jealous snow ankle electric sauce forward oblige tourist stairs horror grunt tenant afford master violin final genre reason'
        let keyPairB
        let addressB            

        before(async () => {
            const masterKey = Utils.deriveMasterKey(mnemonicA)
            keyPairA = Utils.deriveKeyPairFromAccountAndIndex(masterKey)

            assert.ok(keyPairA)

            addressA = Utils.getAddressFromPublicKey(keyPairA.publicKey)

            assert.ok(addressA)

            const masterKeyNU = Utils.deriveMasterKey(mnemonicB)
            keyPairB = Utils.deriveKeyPairFromAccountAndIndex(masterKeyNU)
            
            assert.ok(keyPairB)

            addressB = Utils.getAddressFromPublicKey(keyPairB.publicKey)
            assert.ok(addressB)
        })

        describe('Bank', () => {
            it('Users can transfer funds', async () => {
                const amount = 10000

                const acc1 = await mele.query.getAccountInfo(addressA)
                const acc2 = await mele.query.getAccountInfo(addressB)

                assert.ok(acc1)
                assert.ok(acc2)

                console.log(JSON.stringify(acc1, null, 4))
                console.log(JSON.stringify(acc2, null, 4))

                assert.ok(acc1.value)
                assert.ok(acc2.value)

                const tx = await mele.transfer(addressA, addressB, [{denom: 'umele', amount: String(amount)}], keyPairA.privateKey)

                assert.ok(tx)
                assert.ok(tx.code === 0)

                await delay(7000)

                const newAcc1 = await mele.query.getAccountInfo(addressA)
                const newAcc2 = await mele.query.getAccountInfo(addressB)   

                assert.ok(newAcc1)
                assert.ok(newAcc2)      

                console.log(JSON.stringify(newAcc1, null, 4))
                console.log(JSON.stringify(newAcc2, null, 4))

                assert.ok(newAcc1.value)
                assert.ok(Number(newAcc1.value.coins[0].amount) === (Number(acc1.value.coins[0].amount) - amount))    

                assert.ok(newAcc2.value)
                assert.ok(Number(newAcc2.value.coins[0].amount) === (Number(acc2.value.coins[0].amount) + amount))

                txHash = tx.hash
            })
        })

        describe('Query', () => {
            it('Account info can be fetched', async () => {
                const acc = await mele.query.getAccountInfo(addressA)

                console.log(acc)

                assert.ok(acc)
            })

            it('Transaction info can be fetched', async () => {
                const transaction = await mele.query.getTx(txHash)

                console.log(JSON.stringify(transaction, null, 4))

                assert.ok(transaction)
            })
        })

    })

})

const delay = (ms = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}
