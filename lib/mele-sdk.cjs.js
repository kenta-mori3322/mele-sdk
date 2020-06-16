'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var elliptic = require('elliptic');
var bip32 = require('bip32');
var bip39 = require('bip39');
var bech32 = _interopDefault(require('bech32'));
var ripemd160 = _interopDefault(require('ripemd160'));
var shajs = _interopDefault(require('sha.js'));
var fetch = _interopDefault(require('cross-fetch'));

const ec = new elliptic.ec('secp256k1');
function generateMnemonic() {
    return bip39.generateMnemonic(256);
}
function generateKeyPair() {
    const keyPair = ec.genKeyPair();
    const pubKey = keyPair.getPublic(true, 'hex');
    const privKey = keyPair.getPrivate('hex');
    return {
        privateKey: privKey,
        publicKey: pubKey,
    };
}
function deriveMasterKey(mnemonic) {
    bip39.validateMnemonic(mnemonic);
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    return bip32.fromSeed(seed);
}
function deriveMasterKeyFromSeed(seed) {
    return bip32.fromSeed(seed);
}
function deriveKeyPair(masterKey, hdPath) {
    const hdWallet = masterKey.derivePath(hdPath);
    const privKey = hdWallet.privateKey;
    if (!privKey) {
        throw new Error('Failed to derive key pair!');
    }
    const pubKey = ec.keyFromPrivate(privKey, 'hex');
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
    const key = ec.keyFromPrivate(privKey, 'hex');
    return key.getPublic(true, 'hex');
}
function validatePublicKey(pubKey) {
    try {
        const keyPair = ec.keyFromPublic(pubKey, 'hex');
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
    generateMnemonic: generateMnemonic,
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

class Query {
    constructor(transport) {
        this._transport = transport;
    }
    getBlock(height) {
        return this._transport.block(height);
    }
    getStatus() {
        return this._transport.status();
    }
}

function isJsonRpcSuccess(response) {
    return 'result' in response;
}

class Rpc {
    constructor(nodeUrl) {
        this._nodeUrl = nodeUrl;
    }
    block(height) {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'block',
                params: {
                    height: String(height),
                },
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data) => {
            if (isJsonRpcSuccess(data)) {
                return data.result;
            }
            else {
                throw data.error;
            }
        });
    }
    status() {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'status',
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data) => {
            if (isJsonRpcSuccess(data)) {
                return data.result;
            }
            else {
                throw data.error;
            }
        });
    }
}

class Transport {
    constructor(opt) {
        this._rpc = new Rpc(opt.nodeUrl);
    }
    block(height) {
        return this._rpc.block(height).then(result => {
            return result;
        });
    }
    status() {
        return this._rpc.status().then(result => {
            return result;
        });
    }
}

class Mele {
    constructor(opt) {
        this._options = opt;
        this._transport = new Transport(opt);
        this._query = new Query(this._transport);
    }
    get query() {
        return this._query;
    }
}

exports.Mele = Mele;
exports.Utils = index;
//# sourceMappingURL=mele-sdk.cjs.js.map
