const { Utils } = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

/* Step 1
   Generate a new wallet randomly
*/
console.log(chalk.cyan('1. New wallet generation'))
const keyPair = Utils.generateKeyPair()
const address = Utils.getAddressFromPublicKey(keyPair.publicKey)

console.log(chalk.green('Wallet 1:'))
console.log(chalk.white(JSON.stringify({ keyPair, address }, null, 4)))

/* Step 2
   Generate a random mnemonic and derive a keypair from it
   Derivation path is default for Cosmos networks: m/44'/118'/0/0'
*/
console.log(chalk.cyan('2. New wallet from random mnemonic'))
const mnemonic = Utils.generateMnemonic()

console.log(chalk.green('Mnemonic:'), chalk.white(mnemonic))

const masterKey = Utils.deriveMasterKey(mnemonic)
const keyPair2 = Utils.deriveKeyPairFromAccountAndIndex(masterKey)
const address2 = Utils.getAddressFromPublicKey(keyPair2.publicKey)

console.log(chalk.green('Wallet 2:'))
console.log(chalk.white(JSON.stringify({ keyPair2, address2 }, null, 4)))
