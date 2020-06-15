import { ec } from 'elliptic';
import { fromSeed } from 'bip32';
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from 'bip39';
import bech32 from 'bech32';
import ripemd160 from 'ripemd160';
import shajs from 'sha.js';

const ec$1 = new ec('secp256k1');
function generateMnemonic$1() {
    return generateMnemonic(256);
}
function generateKeyPair() {
    const keyPair = ec$1.genKeyPair();
    const pubKey = keyPair.getPublic(true, 'hex');
    const privKey = keyPair.getPrivate('hex');
    return {
        privateKey: privKey,
        publicKey: pubKey,
    };
}
function deriveMasterKey(mnemonic) {
    validateMnemonic(mnemonic);
    const seed = mnemonicToSeedSync(mnemonic);
    return fromSeed(seed);
}
function deriveMasterKeyFromSeed(seed) {
    return fromSeed(seed);
}
function deriveKeyPair(masterKey, hdPath) {
    const hdWallet = masterKey.derivePath(hdPath);
    const privKey = hdWallet.privateKey;
    if (!privKey) {
        throw new Error('Failed to derive key pair!');
    }
    const pubKey = ec$1.keyFromPrivate(privKey, 'hex');
    return {
        privateKey: privKey.toString('hex'),
        publicKey: pubKey.getPublic(true, 'hex'),
    };
}
function deriveKeyPairFromAccountAndIndex(masterKey, account = 0, index = 0) {
    const hdPath = `m/44'/118'/${account}'/0/${index}`;
    return deriveKeyPair(masterKey, hdPath);
}
function getAddressFromPublicKey(pubKey) {
    if (!validatePublicKey(pubKey)) {
        throw new Error('Invalid public key.');
    }
    const hashResult = shajs('sha256')
        .update(Buffer.from(pubKey, 'hex'))
        .digest();
    const addr = new ripemd160().update(hashResult).digest();
    return encodeAddr(addr);
}
function getPublicKeyFromPrivateKey(privKey) {
    const key = ec$1.keyFromPrivate(privKey, 'hex');
    return key.getPublic(true, 'hex');
}
function validatePublicKey(pubKey) {
    try {
        const keyPair = ec$1.keyFromPublic(pubKey, 'hex');
        return keyPair.validate().result;
    }
    catch (e) {
        return false;
    }
}
function encodeAddr(addr) {
    return bech32.encode(_PREFIX.PrefixAddress, bech32.toWords(addr));
}
const _PREFIX = {
    PrefixAddress: 'mele'
};

var index = /*#__PURE__*/Object.freeze({
    generateMnemonic: generateMnemonic$1,
    generateKeyPair: generateKeyPair,
    deriveMasterKey: deriveMasterKey,
    deriveMasterKeyFromSeed: deriveMasterKeyFromSeed,
    deriveKeyPair: deriveKeyPair,
    deriveKeyPairFromAccountAndIndex: deriveKeyPairFromAccountAndIndex,
    getAddressFromPublicKey: getAddressFromPublicKey,
    getPublicKeyFromPrivateKey: getPublicKeyFromPrivateKey,
    validatePublicKey: validatePublicKey,
    encodeAddr: encodeAddr,
    _PREFIX: _PREFIX
});

export { index as Utils };
//# sourceMappingURL=mele-sdk.esm.js.map
