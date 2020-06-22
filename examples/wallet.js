const {
    Utils,
    KeyPairSigner,
    MnemonicSigner,
} = require('../lib/mele-sdk.cjs.js')
const chalk = require('chalk')

/* Step 1
   Generate a new wallet randomly
*/
console.log(chalk.cyan('1. New wallet generation'))
const keyPair = Utils.generateKeyPair()
const address = new KeyPairSigner(keyPair.privateKey).getAddress()

console.log(chalk.green('Wallet 1:'))
console.log(chalk.white(JSON.stringify({ keyPair, address }, null, 4)))

/* Step 2
   Generate a random mnemonic and derive a keypair from it
   Derivation path is default for Cosmos networks: m/44'/118'/0/0'
*/
console.log(chalk.cyan('2. New wallet from random mnemonic'))
const mnemonic = Utils.generateMnemonic()

console.log(chalk.green('Mnemonic:'), chalk.white(mnemonic))

const signer = new MnemonicSigner(mnemonic)
const address2 = signer.getAddress()
const keyPair2 = {
    privateKey: signer.getPrivateKey(),
    publicKey: signer.getPublicKey(),
}

console.log(chalk.green('Wallet 2:'))
console.log(chalk.white(JSON.stringify({ keyPair2, address2 }, null, 4)))
