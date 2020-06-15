const { Utils } = require('../lib/mele-sdk.cjs.js')
const assert = require('assert')
const bip39 = require('bip39')


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

})