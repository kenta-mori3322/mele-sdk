import { Codec, TypeFactory, Types } from 'js-amino';
import bech32 from 'bech32';
import shajs from 'sha.js';
import { ec } from 'elliptic';
import { fromSeed } from 'bip32';
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from 'bip39';
import ripemd160 from 'ripemd160';
import { EventEmitter } from 'events';
import promiseRetry from 'promise-retry';
import fetch from 'cross-fetch';
import queryString from 'query-string';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var Keys;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'staking',
        ValidatorsPath: 'validators',
        ValidatorPath: 'validator',
        DelegatorDelegationsPath: 'delegatorDelegations',
        DelegatorUnbondingDelegationsPath: 'delegatorUnbondingDelegations',
        RedelegationsPath: 'redelegations',
        ValidatorDelegationsPath: 'validatorDelegations',
        ValidatorRedelegationsPath: 'validatorRedelegations',
        ValidatorUnbondingDelegationsPath: 'validatorUnbondingDelegations',
        DelegationPath: 'delegation',
        UnbondingDelegationPath: 'unbondingDelegation',
        DelegatorValidatorsPath: 'delegatorValidators',
        DelegatorValidatorPath: 'delegatorValidator',
        PoolPath: 'pool',
        ParametersPath: 'parameters',
        HistoricalInfoPath: 'historicalInfo',
    };
})(Keys || (Keys = {}));
class StakingQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getValidators() {
        const QueryPath = Keys.Query.QueryPath;
        const ValidatorsPath = Keys.Query.ValidatorsPath;
        return this._transport.query([], JSON.stringify({
            Status: 'Bonded',
            Page: '1',
            Limit: '1000',
        }), QueryPath, ValidatorsPath);
    }
    getValidator(address) {
        const QueryPath = Keys.Query.QueryPath;
        const ValidatorPath = Keys.Query.ValidatorPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorPath);
    }
    getValidatorDelegations(address) {
        const QueryPath = Keys.Query.QueryPath;
        const ValidatorDelegationsPath = Keys.Query.ValidatorDelegationsPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorDelegationsPath);
    }
    getValidatorUnbondingDelegations(address) {
        const QueryPath = Keys.Query.QueryPath;
        const ValidatorUnbondingDelegationsPath = Keys.Query.ValidatorUnbondingDelegationsPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorUnbondingDelegationsPath);
    }
    getDelegation(delegatorAddress, validatorAddress) {
        const QueryPath = Keys.Query.QueryPath;
        const DelegationPath = Keys.Query.DelegationPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, DelegationPath);
    }
    getUnbondingDelegation(delegatorAddress, validatorAddress) {
        const QueryPath = Keys.Query.QueryPath;
        const UnbondingDelegationPath = Keys.Query.UnbondingDelegationPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, UnbondingDelegationPath);
    }
    getDelegatorDelegations(delegatorAddress) {
        const QueryPath = Keys.Query.QueryPath;
        const DelegatorDelegationsPath = Keys.Query.DelegatorDelegationsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorDelegationsPath);
    }
    getDelegatorUnbondingDelegations(delegatorAddress) {
        const QueryPath = Keys.Query.QueryPath;
        const DelegatorUnbondingDelegationsPath = Keys.Query.DelegatorUnbondingDelegationsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorUnbondingDelegationsPath);
    }
    getRedelegations(delegatorAddress, srcValidatorAddress, dstValidatorAddress) {
        const QueryPath = Keys.Query.QueryPath;
        const RedelegationsPath = Keys.Query.RedelegationsPath;
        return this._transport.query([], JSON.stringify({
            DelegatorAddr: delegatorAddress,
            SrcValidatorAddr: srcValidatorAddress,
            DstValidatorAddr: dstValidatorAddress,
        }), QueryPath, RedelegationsPath);
    }
    getDelegatorValidators(delegatorAddress) {
        const QueryPath = Keys.Query.QueryPath;
        const DelegatorValidatorsPath = Keys.Query.DelegatorValidatorsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorValidatorsPath);
    }
    getDelegatorValidator(delegatorAddress, validatorAddress) {
        const QueryPath = Keys.Query.QueryPath;
        const DelegatorValidatorPath = Keys.Query.DelegatorValidatorPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, DelegatorValidatorPath);
    }
    getHistoricalInfo(height) {
        const QueryPath = Keys.Query.QueryPath;
        const HistoricalInfoPath = Keys.Query.HistoricalInfoPath;
        return this._transport.query([], JSON.stringify({ Height: String(height) }), QueryPath, HistoricalInfoPath);
    }
    getParameters() {
        const QueryPath = Keys.Query.QueryPath;
        const ParametersPath = Keys.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getPool() {
        const QueryPath = Keys.Query.QueryPath;
        const PoolPath = Keys.Query.PoolPath;
        return this._transport.query([], '', QueryPath, PoolPath);
    }
}

var Keys$1;
(function (Keys) {
    Keys.Query = {
        AuthModuleQueryPath: 'acc',
        AccountPath: 'account',
    };
})(Keys$1 || (Keys$1 = {}));
class Query {
    constructor(transport) {
        this._transport = transport;
        this._staking = new StakingQuery(this._transport);
    }
    get staking() {
        return this._staking;
    }
    getBlock(height) {
        return this._transport.block(height);
    }
    getStatus() {
        return this._transport.status();
    }
    getTx(hash) {
        return this._transport.tx(hash);
    }
    getAccountInfo(address) {
        const AuthModuleQueryPath = Keys$1.Query.AuthModuleQueryPath;
        const AccountPath = Keys$1.Query.AccountPath;
        return this._transport.query([], JSON.stringify({ Address: address }), AuthModuleQueryPath, AccountPath);
    }
    getAccSignInfo(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let accountInfo = yield this.getAccountInfo(address);
            return {
                address: accountInfo.value.address,
                accountNumber: accountInfo.value.account_number,
                sequence: accountInfo.value.sequence,
            };
        });
    }
}

class DefaultSigner {
    getAddress() {
        throw new Error('Signer not initialized.');
    }
    getPrivateKey() {
        throw new Error('Signer not initialized.');
    }
    getPublicKey() {
        throw new Error('Signer not initialized.');
    }
    signTransaction(msgs, chainId, fee, sequence, accountNumber) {
        throw new Error('Signer not initialized.');
    }
    signMessage(msg) {
        throw new Error('Signer not initialized.');
    }
}

const StdTx = TypeFactory.create('StdTx', [
    {
        name: 'msg',
        type: Types.ArrayInterface,
    },
    {
        name: 'fee',
        type: Types.Struct,
    },
    {
        name: 'signatures',
        type: Types.ArrayStruct,
    },
    {
        name: 'memo',
        type: Types.String,
    },
]);
const Coin = TypeFactory.create('coin', [
    {
        name: 'denom',
        type: Types.String,
    },
    {
        name: 'amount',
        type: Types.String,
    },
]);
const Fee = TypeFactory.create('fee', [
    {
        name: 'amount',
        type: Types.ArrayStruct,
    },
    {
        name: 'gas',
        type: Types.Int64,
    },
]);
const PubKeySecp256k1 = TypeFactory.create('PubKeySecp256k1', [
    {
        name: 's',
        type: Types.ByteSlice,
    },
], Types.ByteSlice);
const Signature = TypeFactory.create('signature', [
    {
        name: 'pub_key',
        type: Types.Interface,
    },
    {
        name: 'signature',
        type: Types.ByteSlice,
    },
]);
const codec = new Codec();
codec.registerConcrete(new StdTx(), 'cosmos-sdk/StdTx', {});
codec.registerConcrete(new PubKeySecp256k1(), 'tendermint/PubKeySecp256k1', {});
const marshalBinary = tx => {
    return Buffer.from(codec.marshalBinary(tx)).toString('base64');
};
const marshalJson = tx => {
    return codec.marshalJson(tx);
};
const registerConcrete = (type, obj) => {
    codec.registerConcrete(new obj(), type, {});
};

function encodeAddr(addr) {
    return bech32.encode(_PREFIX.PrefixAddress, bech32.toWords(addr));
}
function decodeAddr(addr) {
    let decode = bech32.decode(addr);
    if (decode.prefix !== _PREFIX.PrefixAddress) {
        throw new Error(`invalid prefix: ${decode.prefix}\n`);
    }
    return Buffer.from(bech32.fromWords(decode.words));
}
const encodeMsg = (msg) => {
    Object.keys(msg).forEach(k => {
        if (typeof msg[k] === 'string' && msg[k].startsWith(_PREFIX.PrefixAddress)) {
            msg[k] = decodeAddr(msg[k]).toJSON().data;
        }
        else if (typeof msg[k] == 'object' && !(msg[k] instanceof Array)) {
            msg[k] = encodeMsg(msg[k]);
        }
        else if (typeof msg[k] == 'object' && msg[k] instanceof Array) {
            msg[k] = msg[k].map(m => {
                return encodeMsg(m);
            });
        }
    });
    return msg;
};
function encodeSignMsg(stdMsg, chainId, seq, accountNumber, maxFeeInCoin) {
    stdMsg = stdMsg.map(msg => JSON.parse(marshalJson(msg)));
    const stdSignMsg = {
        account_number: String(accountNumber),
        chain_id: chainId,
        fee: getFee(maxFeeInCoin, stdMsg.length),
        memo: 'sdk',
        msgs: stdMsg,
        sequence: String(seq),
    };
    const jsonStr = JSON.stringify(number2StringInObject(sortObject(stdSignMsg)));
    const signMsgHash = shajs('sha256').update(jsonStr).digest();
    return signMsgHash;
}
function encodeTx(msgs, rawPubKey, rawSigDER, maxFeeInCoin) {
    let sigs = new Array();
    for (let _i = 0; _i < rawPubKey.length; _i++) {
        const sig = new Signature(new PubKeySecp256k1(Buffer.from(rawPubKey[_i], 'hex').toJSON().data), Buffer.from(rawSigDER[_i], 'hex').toJSON().data);
        sigs.push(sig);
    }
    const fee = getFee(maxFeeInCoin, msgs.length);
    let stdTx = new StdTx(msgs, fee, sigs, 'sdk');
    return marshalBinary(stdTx);
}
const getFee = (maxFeeInCoin, msgCount) => {
    return new Fee([new Coin('umele', String(maxFeeInCoin))], Math.ceil(msgCount / 10) * 200000);
};
function sortObject(object) {
    if (typeof object == 'string') {
        return object;
    }
    let sortedObj = {}, keys = Object.keys(object);
    keys.sort(function (key1, key2) {
        (key1 = key1.toLowerCase()), (key2 = key2.toLowerCase());
        if (key1 < key2)
            return -1;
        if (key1 > key2)
            return 1;
        return 0;
    });
    for (let index in keys) {
        let key = keys[index];
        if (typeof object[key] == 'object' && !(object[key] instanceof Array)) {
            sortedObj[key] = sortObject(object[key]);
        }
        else if (typeof object[key] == 'object' && object[key] instanceof Array) {
            sortedObj[key] = [];
            object[key].forEach(element => {
                sortedObj[key].push(sortObject(element));
            });
        }
        else {
            sortedObj[key] = object[key];
        }
    }
    return sortedObj;
}
function number2StringInObject(object) {
    let resultObj = {}, keys = Object.keys(object);
    if (typeof object == 'string') {
        return object;
    }
    for (let index in keys) {
        let key = keys[index];
        if (typeof object[key] == 'object' && !(object[key] instanceof Array)) {
            resultObj[key] = number2StringInObject(object[key]);
        }
        else if (typeof object[key] == 'object' && object[key] instanceof Array) {
            resultObj[key] = [];
            object[key].forEach(element => {
                resultObj[key].push(number2StringInObject(element));
            });
        }
        else {
            if (typeof object[key] == 'number') {
                resultObj[key] = String(object[key]);
            }
            else {
                resultObj[key] = object[key];
            }
        }
    }
    return resultObj;
}
const _PREFIX = {
    PrefixAddress: 'mele',
};

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
    const hashResult = shajs('sha256').update(Buffer.from(pubKey, 'hex')).digest();
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

var index = /*#__PURE__*/Object.freeze({
    generateMnemonic: generateMnemonic$1,
    generateKeyPair: generateKeyPair,
    deriveMasterKey: deriveMasterKey,
    deriveMasterKeyFromSeed: deriveMasterKeyFromSeed,
    deriveKeyPair: deriveKeyPair,
    deriveKeyPairFromAccountAndIndex: deriveKeyPairFromAccountAndIndex,
    getAddressFromPublicKey: getAddressFromPublicKey,
    getPublicKeyFromPrivateKey: getPublicKeyFromPrivateKey,
    validatePublicKey: validatePublicKey
});

const ec$2 = new ec('secp256k1');
class KeyPairSigner {
    constructor(privateKey) {
        this._privateKey = privateKey;
        this._publicKey = getPublicKeyFromPrivateKey(privateKey);
        this._address = getAddressFromPublicKey(this._publicKey);
    }
    getAddress() {
        return this._address;
    }
    getPrivateKey() {
        return this._privateKey;
    }
    getPublicKey() {
        return this._publicKey;
    }
    signTransaction(msgs, chainId, fee, sequence, accountNumber) {
        let key = ec$2.keyFromPrivate(this._privateKey, 'hex');
        const signMsgHash = encodeSignMsg(msgs, chainId, sequence, accountNumber, fee);
        const sig = key.sign(signMsgHash, { canonical: true });
        const sigDERHex = Buffer.from(sig.r.toArray('be', 32).concat(sig.s.toArray('be', 32))).toString('hex');
        const tx = encodeTx(msgs.map(msg => encodeMsg(msg)), new Array(key.getPublic(true, 'hex')), new Array(sigDERHex), fee);
        return tx;
    }
    signMessage(msg) {
        const key = ec$2.keyFromPrivate(this._privateKey, 'hex');
        const signByte = shajs('sha256').update(msg).digest();
        const sig = key.sign(signByte, { canonical: true });
        return Buffer.from(JSON.stringify(sig), 'utf-8').toString('hex');
    }
}

const ec$3 = new ec('secp256k1');
class MnemonicSigner {
    constructor(mnemonic, path = `m/44'/118'/0'/0/0`) {
        const masterKey = deriveMasterKey(mnemonic);
        const keyPair = deriveKeyPair(masterKey, path);
        this._privateKey = keyPair.privateKey;
        this._publicKey = keyPair.publicKey;
        this._address = getAddressFromPublicKey(this._publicKey);
    }
    getAddress() {
        return this._address;
    }
    getPrivateKey() {
        return this._privateKey;
    }
    getPublicKey() {
        return this._publicKey;
    }
    signTransaction(msgs, chainId, fee, sequence, accountNumber) {
        let key = ec$3.keyFromPrivate(this._privateKey, 'hex');
        const signMsgHash = encodeSignMsg(msgs, chainId, sequence, accountNumber, fee);
        const sig = key.sign(signMsgHash, { canonical: true });
        const sigDERHex = Buffer.from(sig.r.toArray('be', 32).concat(sig.s.toArray('be', 32))).toString('hex');
        const tx = encodeTx(msgs.map(msg => encodeMsg(msg)), new Array(key.getPublic(true, 'hex')), new Array(sigDERHex), fee);
        return tx;
    }
    signMessage(msg) {
        const key = ec$3.keyFromPrivate(this._privateKey, 'hex');
        const signByte = shajs('sha256').update(msg).digest();
        const sig = key.sign(signByte, { canonical: true });
        return Buffer.from(JSON.stringify(sig), 'utf-8').toString('hex');
    }
}

var BroadCastErrorEnum;
(function (BroadCastErrorEnum) {
    BroadCastErrorEnum[BroadCastErrorEnum["CheckTx"] = 0] = "CheckTx";
    BroadCastErrorEnum[BroadCastErrorEnum["DeliverTx"] = 1] = "DeliverTx";
})(BroadCastErrorEnum || (BroadCastErrorEnum = {}));
class BroadcastError extends Error {
    constructor(type, log, code) {
        super(log);
        Object.setPrototypeOf(this, BroadcastError.prototype);
        this.type = type;
        this.code = code;
    }
}

class TransactionEvents extends EventEmitter {
    emitHash(hash) {
        this.emit('hash', hash);
    }
    emitReceipt(receipt) {
        this.emit('receipt', receipt);
    }
    emitConfirmation(tx) {
        this.emit('confirmation', tx);
    }
    emitError(error) {
        this.emit('error', error);
    }
}

class Broadcast {
    constructor(transport, query, signer, opts) {
        this._transport = transport;
        this._query = query;
        this._signer = signer;
        this._options = opts;
    }
    get signer() {
        return this._signer;
    }
    get query() {
        return this._query;
    }
    safeBroadcast(signers, makeTxFunc) {
        const txEvents = new TransactionEvents();
        let accSignInfos = [];
        for (let i = 0; i < signers.length; i++) {
            let seq = this._query.getAccSignInfo(signers[i]);
            accSignInfos.push(seq);
        }
        Promise.all(accSignInfos).then((signInfos) => {
            let tx = makeTxFunc(signInfos);
            this._transport
                .broadcastRawMsgBytesSync(tx)
                .then((result) => {
                txEvents.emitHash(result.hash);
                txEvents.emitReceipt(result);
                promiseRetry((retry, num) => {
                    if (num === 1) {
                        return retry();
                    }
                    return this._transport.tx(result.hash).catch(retry);
                }, {
                    retries: this._options.txConfirmTries,
                    factor: 1,
                    minTimeout: this._options.txConfirmInterval,
                    maxTimeout: this._options.txConfirmInterval,
                }).then(value => {
                    txEvents.emitConfirmation(value);
                }, err => { });
            })
                .catch((err) => {
                if (err.data && err.data.indexOf('Tx already exists in cache') >= 0) {
                    txEvents.emitError(new BroadcastError(BroadCastErrorEnum.CheckTx, err.data, err.code || 0));
                }
                else if (err.code && err.message) {
                    txEvents.emitError(new BroadcastError(BroadCastErrorEnum.CheckTx, err.message, err.code));
                }
                else {
                    txEvents.emitError(new BroadcastError(BroadCastErrorEnum.CheckTx, 'Unknown error ocurred while broadcasting transaction.', -1));
                }
            });
        });
        return txEvents;
    }
    sendTransaction(msgs) {
        return this.safeBroadcast([this._signer.getAddress()], accSignInfos => {
            return this._signer.signTransaction(msgs, this._options.chainId, this._options.maxFeeInCoin, accSignInfos[0].sequence, accSignInfos[0].accountNumber);
        });
    }
}

function isJsonRpcSuccess(response) {
    return 'result' in response;
}

const DefaultABCIQueryOptions = {
    height: '0',
    trusted: false,
};
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
    abciQuery(path, key, opts = DefaultABCIQueryOptions) {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'abci_query',
                params: Object.assign({}, opts, { path, data: key }),
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data) => {
            if ('result' in data) {
                return data.result;
            }
            else {
                throw data.error;
            }
        });
    }
    broadcastTxSync(tx) {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'broadcast_tx_sync',
                params: {
                    tx: tx,
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
    tx(hash) {
        return fetch(this._nodeUrl, {
            headers: { 'Content-Type': 'text/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'jsonrpc-client',
                method: 'tx',
                params: {
                    hash: hash,
                },
            }),
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then((data) => {
            if (isJsonRpcSuccess(data)) {
                let res = {
                    hash: data.result.hash,
                    tx_result: data.result.tx_result,
                    height: data.result.height,
                    tx: data.result.tx,
                };
                return res;
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
    tx(hash) {
        return this._rpc.tx(String(Buffer.from(hash, 'hex').toString('base64'))).then(result => {
            return result;
        });
    }
    query(keys, data, storeName, subStoreName) {
        let path = `/custom/${storeName}/${subStoreName}`;
        keys.forEach(key => {
            path += '/' + key;
        });
        return this._rpc
            .abciQuery(path, Buffer.from(data, 'utf-8').toString('hex'))
            .then(result => {
            if (!result.response || !result.response.value) {
                throw new QueryError(result.response.log, result.response.code);
            }
            const jsonStr = Buffer.from(result.response.value, 'base64').toString('utf-8');
            return JSON.parse(jsonStr);
        });
    }
    broadcastRawMsgBytesSync(tx) {
        return this._rpc.broadcastTxSync(tx).then(result => {
            if (result.code !== 0) {
                throw new BroadcastError(BroadCastErrorEnum.CheckTx, result.log, result.code);
            }
            return result;
        });
    }
}
class QueryError extends Error {
    constructor(log, code) {
        super(log);
        Object.setPrototypeOf(this, QueryError.prototype);
        this.code = code;
    }
}

class Transaction {
    constructor(msgs, sendTransaction) {
        this._msgs = msgs;
        this._sendTransaction = sendTransaction;
    }
    sendTransaction() {
        return this._sendTransaction(this._msgs);
    }
}
class TransactionApi {
    constructor(broadcast) {
        this._broadcast = broadcast;
    }
    get broadcast() {
        return this._broadcast;
    }
}

const Codec$1 = {
    'cosmos-sdk/MsgSend': TypeFactory.create('MsgSend', [
        {
            name: 'from_address',
            type: Types.String,
        },
        {
            name: 'to_address',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
};
Object.keys(Codec$1).forEach(codec => registerConcrete(codec, Codec$1[codec]));

const _types = {
    TransferMsgType: 'cosmos-sdk/MsgSend',
};
const Msgs = {
    makeTransferMsg(fromAddress, toAddress, amount) {
        const msg = new Codec$1[_types.TransferMsgType](fromAddress, toAddress, amount.map(am => new Coin(am.denom, am.amount)));
        return [msg];
    },
};
class Bank extends TransactionApi {
    transfer(toAddress, amount) {
        const msgs = Msgs.makeTransferMsg(this.broadcast.signer.getAddress(), toAddress, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$2 = {
    'cosmos-sdk/MsgCreateValidator': TypeFactory.create('MsgCreateValidator', [
        {
            name: 'description',
            type: Types.Struct,
        },
        {
            name: 'commission',
            type: Types.Struct,
        },
        {
            name: 'min_self_delegation',
            type: Types.String,
        },
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_address',
            type: Types.String,
        },
        {
            name: 'pubkey',
            type: Types.String,
        },
        {
            name: 'value',
            type: Types.Struct,
        },
    ]),
    Commission: TypeFactory.create('Commission', [
        {
            name: 'rate',
            type: Types.String,
        },
        {
            name: 'max_rate',
            type: Types.String,
        },
        {
            name: 'max_change_rate',
            type: Types.String,
        },
    ]),
    Description: TypeFactory.create('Description', [
        {
            name: 'moniker',
            type: Types.String,
        },
        {
            name: 'identity',
            type: Types.String,
        },
        {
            name: 'website',
            type: Types.String,
        },
        {
            name: 'security_contact',
            type: Types.String,
        },
        {
            name: 'details',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgEditValidator': TypeFactory.create('MsgEditValidator', [
        {
            name: 'description',
            type: Types.Struct,
        },
        {
            name: 'address',
            type: Types.String,
        },
        {
            name: 'commission_rate',
            type: Types.String,
        },
        {
            name: 'min_self_delegation',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgDelegate': TypeFactory.create('MsgDelegate', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_address',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.Struct,
        },
    ]),
    'cosmos-sdk/MsgUndelegate': TypeFactory.create('MsgUndelegate', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_address',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.Struct,
        },
    ]),
    'cosmos-sdk/MsgBeginRedelegate': TypeFactory.create('MsgBeginRedelegate', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_src_address',
            type: Types.String,
        },
        {
            name: 'validator_dst_address',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.Struct,
        },
    ]),
};
Object.keys(Codec$2).forEach(codec => registerConcrete(codec, Codec$2[codec]));

const _types$1 = {
    CreateValidatorMsgType: 'cosmos-sdk/MsgCreateValidator',
    EditValidatorMsgType: 'cosmos-sdk/MsgEditValidator',
    DelegateMsgType: 'cosmos-sdk/MsgDelegate',
    UndelegateMsgType: 'cosmos-sdk/MsgUndelegate',
    BeginRedelegateMsgType: 'cosmos-sdk/MsgBeginRedelegate',
    Description: 'Description',
    Commission: 'Commission',
};
const Msgs$1 = {
    makeDelegateMsg(delegator, validator, amount) {
        const msg = new Codec$2[_types$1.DelegateMsgType](delegator, validator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeUndelegateMsg(delegator, validator, amount) {
        const msg = new Codec$2[_types$1.UndelegateMsgType](delegator, validator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeBeginRedelegateMsg(delegator, srcValidator, dstValidator, amount) {
        const msg = new Codec$2[_types$1.BeginRedelegateMsgType](delegator, srcValidator, dstValidator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeCreateValidatorMsg(description, commission, minSelfDelegation, delegator, validator, pubkey, value) {
        let desc = new Codec$2[_types$1.Description](description.moniker, description.identity, description.website, description.securityContact, description.details);
        let comm = new Codec$2[_types$1.Commission](commission.rate, commission.maxRate, commission.maxChangeRate);
        const msg = new Codec$2[_types$1.CreateValidatorMsgType](desc, comm, minSelfDelegation, delegator, validator, pubkey, new Coin(value.denom, value.amount));
        return [msg];
    },
    makeEditValidatorMsg(description, address, commissionRate, minSelfDelegation) {
        let desc = new Codec$2[_types$1.Description](description.moniker, description.identity, description.website, description.securityContact, description.details);
        const msg = new Codec$2[_types$1.EditValidatorMsgType](desc, address, commissionRate, minSelfDelegation);
        return [msg];
    },
};
class Staking extends TransactionApi {
    createValidator(description, commission, minSelfDelegation, delegator, validator, pubkey, value) {
        const msgs = Msgs$1.makeCreateValidatorMsg(description, commission, minSelfDelegation, this.broadcast.signer.getAddress(), validator, pubkey, value);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    editValidator(description, address, commissionRate, minSelfDelegation) {
        const msgs = Msgs$1.makeEditValidatorMsg(description, address, commissionRate, minSelfDelegation);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    delegate(validator, amount) {
        const msgs = Msgs$1.makeDelegateMsg(this.broadcast.signer.getAddress(), validator, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    undelegate(validator, amount) {
        const msgs = Msgs$1.makeUndelegateMsg(this.broadcast.signer.getAddress(), validator, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    beginRedelegate(srcValidator, dstValidator, amount) {
        const msgs = Msgs$1.makeBeginRedelegateMsg(this.broadcast.signer.getAddress(), srcValidator, dstValidator, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

class IndexerApi {
    static get(endpoint, action, query, data, headers) {
        return IndexerApi.call(endpoint, 'GET', action, query, data, headers);
    }
    static post(endpoint, action, query, data, headers) {
        return IndexerApi.call(endpoint, 'POST', action, query, data, headers);
    }
    static call(endpoint, method, action, query, data, headers) {
        let callHeaders = { 'Content-Type': 'application/json;charset=UTF-8' };
        if (headers) {
            for (let key of Object.keys(headers)) {
                callHeaders[key] = headers[key];
            }
        }
        const contents = {
            method: method || 'NO_METHOD_SPECIFIED',
            headers: callHeaders,
            cache: 'no-cache',
        };
        if (data) {
            contents.body = JSON.stringify(data);
        }
        if (query) {
            action = `${action}?${queryString.stringify(query)}`;
        }
        let status;
        return fetch(`${endpoint}/${action}`, contents)
            .then(response => {
            status = response.status;
            return response.json();
        })
            .then(json => {
            if (status >= 200 && status < 300) {
                return json;
            }
            const error = IndexerApi.identifyError(json);
            return Promise.reject(error);
        });
    }
    static identifyError(error) {
        if (!error || !error.error) {
            return 'Unknown error.';
        }
        return error.error;
    }
}

class Indexer {
    constructor(opts) {
        this._opts = opts;
    }
    transactions(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, 'txs', query);
        });
    }
    transaction(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, `tx/${hash}`);
        });
    }
    transactionCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, `txs/count`);
        });
    }
    latestBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, 'block/latest');
        });
    }
    block(height) {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, `block/${height}`);
        });
    }
    chain() {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, 'chain/info');
        });
    }
    blockEvents(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, 'block_events', query);
        });
    }
    blocks(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, 'blocks', query);
        });
    }
}

class Mele {
    constructor(opt) {
        this._options = opt;
        this._transport = new Transport({
            nodeUrl: this._options.nodeUrl,
        });
        this._query = new Query(this._transport);
        this._signer = opt.signer || new DefaultSigner();
        this._chainId = opt.chainId || 'test';
        this._maxFeeInCoin = opt.maxFeeInCoin || 0;
        this._broadcast = new Broadcast(this._transport, this._query, this._signer, {
            txConfirmInterval: this._options.txConfirmInterval || 6000,
            txConfirmTries: this._options.txConfirmTries || 6,
            chainId: this._chainId,
            maxFeeInCoin: this._maxFeeInCoin,
        });
        this._bank = new Bank(this._broadcast);
        this._staking = new Staking(this._broadcast);
        this._indexer = new Indexer({
            endpoint: opt.indexerEndpoint || 'http://localhost:3100/api/v1',
        });
    }
    get query() {
        return this._query;
    }
    get signer() {
        return this._signer;
    }
    get bank() {
        return this._bank;
    }
    get staking() {
        return this._staking;
    }
    get indexer() {
        return this._indexer;
    }
}

export { Mele, index as Utils, KeyPairSigner, MnemonicSigner, DefaultSigner };
//# sourceMappingURL=mele-sdk.esm.js.map
