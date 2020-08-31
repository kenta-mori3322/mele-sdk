import { Codec, TypeFactory, Types } from 'js-amino';
import bech32 from 'bech32';
import shajs from 'sha.js';
import util from 'util';
import buffer from 'buffer';
import readableStream from 'readable-stream';
import { ec } from 'elliptic';
import { fromSeed } from 'bip32';
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from 'bip39';
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
        QueryPath: 'distribution',
        ParametersPath: 'params',
        ValidatorOutstandingRewardsPath: 'validator_outstanding_rewards',
        ValidatorCommissionPath: 'validator_commission',
        ValidatorSlashesPath: 'validator_slashes',
        DelegationRewardsPath: 'delegation_rewards',
        DelegatorTotalRewardsPath: 'delegator_total_rewards',
        DelegatorValidatorsPath: 'delegator_validators',
        WithdrawAddrPath: 'withdraw_addr',
        CommunityPoolPath: 'community_pool',
    };
})(Keys || (Keys = {}));
class DistributionQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        const QueryPath = Keys.Query.QueryPath;
        const ParametersPath = Keys.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getValidatorOutstandingRewards(validator) {
        const QueryPath = Keys.Query.QueryPath;
        const ValidatorOutstandingRewardsPath = Keys.Query.ValidatorOutstandingRewardsPath;
        return this._transport.query([], JSON.stringify({ validator_address: validator }), QueryPath, ValidatorOutstandingRewardsPath);
    }
    getValidatorCommission(validator) {
        const QueryPath = Keys.Query.QueryPath;
        const ValidatorCommissionPath = Keys.Query.ValidatorCommissionPath;
        return this._transport.query([], JSON.stringify({ validator_address: validator }), QueryPath, ValidatorCommissionPath);
    }
    getValidatorSlashes(validator, startHeight, endHeight) {
        const QueryPath = Keys.Query.QueryPath;
        const ValidatorSlashesPath = Keys.Query.ValidatorSlashesPath;
        return this._transport.query([], JSON.stringify({
            validator_address: validator,
            starting_height: startHeight,
            ending_height: endHeight,
        }), QueryPath, ValidatorSlashesPath);
    }
    getDelegationRewards(delegator, validator) {
        const QueryPath = Keys.Query.QueryPath;
        const DelegationRewardsPath = Keys.Query.DelegationRewardsPath;
        return this._transport.query([], JSON.stringify({ delegator_address: delegator, validator_address: validator }), QueryPath, DelegationRewardsPath);
    }
    getDelegatorTotalRewards(delegator) {
        const QueryPath = Keys.Query.QueryPath;
        const DelegatorTotalRewardsPath = Keys.Query.DelegatorTotalRewardsPath;
        return this._transport.query([], JSON.stringify({ delegator_address: delegator }), QueryPath, DelegatorTotalRewardsPath);
    }
    getDelegatorValidators(delegator) {
        const QueryPath = Keys.Query.QueryPath;
        const DelegatorValidatorsPath = Keys.Query.DelegatorValidatorsPath;
        return this._transport.query([], JSON.stringify({ delegator_address: delegator }), QueryPath, DelegatorValidatorsPath);
    }
    getWithdrawAddress(delegator) {
        const QueryPath = Keys.Query.QueryPath;
        const WithdrawAddrPath = Keys.Query.WithdrawAddrPath;
        return this._transport.query([], JSON.stringify({ delegator_address: delegator }), QueryPath, WithdrawAddrPath);
    }
    getCommunityPool() {
        const QueryPath = Keys.Query.QueryPath;
        const CommunityPoolPath = Keys.Query.CommunityPoolPath;
        return this._transport.query([], '', QueryPath, CommunityPoolPath);
    }
}

var Keys$1;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'mgov',
        ParametersPath: 'params',
        ProposalsPath: 'proposals',
        ProposalPath: 'proposal',
        DepositsPath: 'deposits',
        DepositPath: 'deposit',
        VotesPath: 'votes',
        VotePath: 'vote',
        TallyPath: 'tally',
        ParamDepositPath: 'deposit',
        ParamVotingPath: 'voting',
        ParamTallyingPath: 'tallying',
    };
})(Keys$1 || (Keys$1 = {}));
class GovQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            const QueryPath = Keys$1.Query.QueryPath;
            const ParametersPath = Keys$1.Query.ParametersPath;
            const ParamDepositPath = Keys$1.Query.ParamDepositPath;
            const ParamVotingPath = Keys$1.Query.ParamVotingPath;
            const ParamTallyingPath = Keys$1.Query.ParamTallyingPath;
            let deposit = yield this._transport.query([ParamDepositPath], '', QueryPath, ParametersPath);
            let voting = yield this._transport.query([ParamVotingPath], '', QueryPath, ParametersPath);
            let tallying = yield this._transport.query([ParamTallyingPath], '', QueryPath, ParametersPath);
            return {
                deposit: deposit,
                tally: tallying,
                voting: voting,
            };
        });
    }
    getProposals(voter = '', depositor = '', status = '', page = 1, limit = 100) {
        const QueryPath = Keys$1.Query.QueryPath;
        const ProposalsPath = Keys$1.Query.ProposalsPath;
        return this._transport.query([], JSON.stringify({
            Page: String(page),
            Limit: String(limit),
            Voter: voter,
            Depositor: depositor,
            ProposalStatus: status,
        }), QueryPath, ProposalsPath);
    }
    getProposal(id) {
        const QueryPath = Keys$1.Query.QueryPath;
        const ProposalPath = Keys$1.Query.ProposalPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
        }), QueryPath, ProposalPath);
    }
    getDeposits(id) {
        const QueryPath = Keys$1.Query.QueryPath;
        const DepositsPath = Keys$1.Query.DepositsPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
        }), QueryPath, DepositsPath);
    }
    getDeposit(id, depositor) {
        const QueryPath = Keys$1.Query.QueryPath;
        const DepositPath = Keys$1.Query.DepositPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
            Depositor: depositor,
        }), QueryPath, DepositPath);
    }
    getVotes(id, page = 1, limit = 100) {
        const QueryPath = Keys$1.Query.QueryPath;
        const VotesPath = Keys$1.Query.VotesPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
            Page: String(page),
            Limit: String(limit),
        }), QueryPath, VotesPath);
    }
    getVote(id, voter) {
        const QueryPath = Keys$1.Query.QueryPath;
        const VotePath = Keys$1.Query.VotePath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
            Voter: voter,
        }), QueryPath, VotePath);
    }
    getTally(id) {
        const QueryPath = Keys$1.Query.QueryPath;
        const TallyPath = Keys$1.Query.TallyPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
        }), QueryPath, TallyPath);
    }
}

var Keys$2;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'slashing',
        ParametersPath: 'parameters',
        SigningInfoPath: 'signingInfo',
        SigningInfosPath: 'signingInfos',
    };
})(Keys$2 || (Keys$2 = {}));
class SlashingQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        const QueryPath = Keys$2.Query.QueryPath;
        const ParametersPath = Keys$2.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getSigningInfo(consAddress) {
        const QueryPath = Keys$2.Query.QueryPath;
        const SigningInfoPath = Keys$2.Query.SigningInfoPath;
        return this._transport.query([], JSON.stringify({
            ConsAddress: consAddress,
        }), QueryPath, SigningInfoPath);
    }
    getSigningInfos() {
        const QueryPath = Keys$2.Query.QueryPath;
        const SigningInfosPath = Keys$2.Query.SigningInfosPath;
        return this._transport.query([], JSON.stringify({
            Page: '1',
            Limit: '0',
        }), QueryPath, SigningInfosPath);
    }
}

var Keys$3;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'mstaking',
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
})(Keys$3 || (Keys$3 = {}));
class StakingQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getValidators() {
        const QueryPath = Keys$3.Query.QueryPath;
        const ValidatorsPath = Keys$3.Query.ValidatorsPath;
        return this._transport.query([], JSON.stringify({
            Status: 'Bonded',
            Page: '1',
            Limit: '1000',
        }), QueryPath, ValidatorsPath);
    }
    getValidator(address) {
        const QueryPath = Keys$3.Query.QueryPath;
        const ValidatorPath = Keys$3.Query.ValidatorPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorPath);
    }
    getValidatorDelegations(address) {
        const QueryPath = Keys$3.Query.QueryPath;
        const ValidatorDelegationsPath = Keys$3.Query.ValidatorDelegationsPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorDelegationsPath);
    }
    getValidatorUnbondingDelegations(address) {
        const QueryPath = Keys$3.Query.QueryPath;
        const ValidatorUnbondingDelegationsPath = Keys$3.Query.ValidatorUnbondingDelegationsPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorUnbondingDelegationsPath);
    }
    getDelegation(delegatorAddress, validatorAddress) {
        const QueryPath = Keys$3.Query.QueryPath;
        const DelegationPath = Keys$3.Query.DelegationPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, DelegationPath);
    }
    getUnbondingDelegation(delegatorAddress, validatorAddress) {
        const QueryPath = Keys$3.Query.QueryPath;
        const UnbondingDelegationPath = Keys$3.Query.UnbondingDelegationPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, UnbondingDelegationPath);
    }
    getDelegatorDelegations(delegatorAddress) {
        const QueryPath = Keys$3.Query.QueryPath;
        const DelegatorDelegationsPath = Keys$3.Query.DelegatorDelegationsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorDelegationsPath);
    }
    getDelegatorUnbondingDelegations(delegatorAddress) {
        const QueryPath = Keys$3.Query.QueryPath;
        const DelegatorUnbondingDelegationsPath = Keys$3.Query.DelegatorUnbondingDelegationsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorUnbondingDelegationsPath);
    }
    getRedelegations(delegatorAddress, srcValidatorAddress, dstValidatorAddress) {
        const QueryPath = Keys$3.Query.QueryPath;
        const RedelegationsPath = Keys$3.Query.RedelegationsPath;
        return this._transport.query([], JSON.stringify({
            DelegatorAddr: delegatorAddress,
            SrcValidatorAddr: srcValidatorAddress,
            DstValidatorAddr: dstValidatorAddress,
        }), QueryPath, RedelegationsPath);
    }
    getDelegatorValidators(delegatorAddress) {
        const QueryPath = Keys$3.Query.QueryPath;
        const DelegatorValidatorsPath = Keys$3.Query.DelegatorValidatorsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorValidatorsPath);
    }
    getDelegatorValidator(delegatorAddress, validatorAddress) {
        const QueryPath = Keys$3.Query.QueryPath;
        const DelegatorValidatorPath = Keys$3.Query.DelegatorValidatorPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, DelegatorValidatorPath);
    }
    getHistoricalInfo(height) {
        const QueryPath = Keys$3.Query.QueryPath;
        const HistoricalInfoPath = Keys$3.Query.HistoricalInfoPath;
        return this._transport.query([], JSON.stringify({ Height: String(height) }), QueryPath, HistoricalInfoPath);
    }
    getParameters() {
        const QueryPath = Keys$3.Query.QueryPath;
        const ParametersPath = Keys$3.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getPool() {
        const QueryPath = Keys$3.Query.QueryPath;
        const PoolPath = Keys$3.Query.PoolPath;
        return this._transport.query([], '', QueryPath, PoolPath);
    }
}

var Keys$4;
(function (Keys) {
    Keys.Query = {
        AuthModuleQueryPath: 'acc',
        AccountPath: 'account',
    };
})(Keys$4 || (Keys$4 = {}));
class Query {
    constructor(transport) {
        this._transport = transport;
        this._staking = new StakingQuery(this._transport);
        this._slashing = new SlashingQuery(this._transport);
        this._distribution = new DistributionQuery(this._transport);
        this._gov = new GovQuery(this._transport);
    }
    get staking() {
        return this._staking;
    }
    get slashing() {
        return this._slashing;
    }
    get distribution() {
        return this._distribution;
    }
    get governance() {
        return this._gov;
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
        const AuthModuleQueryPath = Keys$4.Query.AuthModuleQueryPath;
        const AccountPath = Keys$4.Query.AccountPath;
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
    let msgVote = stdMsg.find(i => i.type === 'cosmos-sdk/MsgVote');
    if (msgVote) {
        let option = '';
        switch (msgVote.value.option) {
            case 1:
                option = 'Yes';
                break;
            case 2:
                option = 'Abstain';
                break;
            case 3:
                option = 'No';
                break;
            case 4:
                option = 'NoWithVeto';
                break;
        }
        msgVote.value.option = option;
    }
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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var inherits_browser = createCommonjsModule(function (module) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}
});

var inherits = createCommonjsModule(function (module) {
try {
  var util$$1 = util;
  /* istanbul ignore next */
  if (typeof util$$1.inherits !== 'function') throw '';
  module.exports = util$$1.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = inherits_browser;
}
});

var safeBuffer = createCommonjsModule(function (module, exports) {
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */

var Buffer = buffer.Buffer;

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype);

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size);
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }
  return buf
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
};
});
var safeBuffer_1 = safeBuffer.Buffer;

var Buffer$1 = safeBuffer.Buffer;
var Transform = readableStream.Transform;


function throwIfNotStringOrBuffer (val, prefix) {
  if (!Buffer$1.isBuffer(val) && typeof val !== 'string') {
    throw new TypeError(prefix + ' must be a string or a buffer')
  }
}

function HashBase (blockSize) {
  Transform.call(this);

  this._block = Buffer$1.allocUnsafe(blockSize);
  this._blockSize = blockSize;
  this._blockOffset = 0;
  this._length = [0, 0, 0, 0];

  this._finalized = false;
}

inherits(HashBase, Transform);

HashBase.prototype._transform = function (chunk, encoding, callback) {
  var error = null;
  try {
    this.update(chunk, encoding);
  } catch (err) {
    error = err;
  }

  callback(error);
};

HashBase.prototype._flush = function (callback) {
  var error = null;
  try {
    this.push(this.digest());
  } catch (err) {
    error = err;
  }

  callback(error);
};

HashBase.prototype.update = function (data, encoding) {
  throwIfNotStringOrBuffer(data, 'Data');
  if (this._finalized) throw new Error('Digest already called')
  if (!Buffer$1.isBuffer(data)) data = Buffer$1.from(data, encoding);

  // consume data
  var block = this._block;
  var offset = 0;
  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++];
    this._update();
    this._blockOffset = 0;
  }
  while (offset < data.length) block[this._blockOffset++] = data[offset++];

  // update length
  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry;
    carry = (this._length[j] / 0x0100000000) | 0;
    if (carry > 0) this._length[j] -= 0x0100000000 * carry;
  }

  return this
};

HashBase.prototype._update = function () {
  throw new Error('_update is not implemented')
};

HashBase.prototype.digest = function (encoding) {
  if (this._finalized) throw new Error('Digest already called')
  this._finalized = true;

  var digest = this._digest();
  if (encoding !== undefined) digest = digest.toString(encoding);

  // reset state
  this._block.fill(0);
  this._blockOffset = 0;
  for (var i = 0; i < 4; ++i) this._length[i] = 0;

  return digest
};

HashBase.prototype._digest = function () {
  throw new Error('_digest is not implemented')
};

var hashBase = HashBase;

var Buffer$2 = buffer.Buffer;



var ARRAY16 = new Array(16);

var zl = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var zr = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var sl = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sr = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];

var hl = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e];
var hr = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000];

function RIPEMD160 () {
  hashBase.call(this, 64);

  // state
  this._a = 0x67452301;
  this._b = 0xefcdab89;
  this._c = 0x98badcfe;
  this._d = 0x10325476;
  this._e = 0xc3d2e1f0;
}

inherits(RIPEMD160, hashBase);

RIPEMD160.prototype._update = function () {
  var words = ARRAY16;
  for (var j = 0; j < 16; ++j) words[j] = this._block.readInt32LE(j * 4);

  var al = this._a | 0;
  var bl = this._b | 0;
  var cl = this._c | 0;
  var dl = this._d | 0;
  var el = this._e | 0;

  var ar = this._a | 0;
  var br = this._b | 0;
  var cr = this._c | 0;
  var dr = this._d | 0;
  var er = this._e | 0;

  // computation
  for (var i = 0; i < 80; i += 1) {
    var tl;
    var tr;
    if (i < 16) {
      tl = fn1(al, bl, cl, dl, el, words[zl[i]], hl[0], sl[i]);
      tr = fn5(ar, br, cr, dr, er, words[zr[i]], hr[0], sr[i]);
    } else if (i < 32) {
      tl = fn2(al, bl, cl, dl, el, words[zl[i]], hl[1], sl[i]);
      tr = fn4(ar, br, cr, dr, er, words[zr[i]], hr[1], sr[i]);
    } else if (i < 48) {
      tl = fn3(al, bl, cl, dl, el, words[zl[i]], hl[2], sl[i]);
      tr = fn3(ar, br, cr, dr, er, words[zr[i]], hr[2], sr[i]);
    } else if (i < 64) {
      tl = fn4(al, bl, cl, dl, el, words[zl[i]], hl[3], sl[i]);
      tr = fn2(ar, br, cr, dr, er, words[zr[i]], hr[3], sr[i]);
    } else { // if (i<80) {
      tl = fn5(al, bl, cl, dl, el, words[zl[i]], hl[4], sl[i]);
      tr = fn1(ar, br, cr, dr, er, words[zr[i]], hr[4], sr[i]);
    }

    al = el;
    el = dl;
    dl = rotl(cl, 10);
    cl = bl;
    bl = tl;

    ar = er;
    er = dr;
    dr = rotl(cr, 10);
    cr = br;
    br = tr;
  }

  // update state
  var t = (this._b + cl + dr) | 0;
  this._b = (this._c + dl + er) | 0;
  this._c = (this._d + el + ar) | 0;
  this._d = (this._e + al + br) | 0;
  this._e = (this._a + bl + cr) | 0;
  this._a = t;
};

RIPEMD160.prototype._digest = function () {
  // create padding and handle blocks
  this._block[this._blockOffset++] = 0x80;
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64);
    this._update();
    this._blockOffset = 0;
  }

  this._block.fill(0, this._blockOffset, 56);
  this._block.writeUInt32LE(this._length[0], 56);
  this._block.writeUInt32LE(this._length[1], 60);
  this._update();

  // produce result
  var buffer$$1 = Buffer$2.alloc ? Buffer$2.alloc(20) : new Buffer$2(20);
  buffer$$1.writeInt32LE(this._a, 0);
  buffer$$1.writeInt32LE(this._b, 4);
  buffer$$1.writeInt32LE(this._c, 8);
  buffer$$1.writeInt32LE(this._d, 12);
  buffer$$1.writeInt32LE(this._e, 16);
  return buffer$$1
};

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fn1 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
}

function fn2 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
}

function fn3 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
}

function fn4 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
}

function fn5 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
}

var ripemd160 = RIPEMD160;

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
function encodeAddress(addr, prefix) {
    return bech32.encode(prefix, bech32.toWords(addr));
}
function decodeAddress(addr, prefix) {
    let decode = bech32.decode(addr);
    if (decode.prefix !== prefix) {
        throw new Error(`invalid prefix: ${decode.prefix}\n`);
    }
    return Buffer.from(bech32.fromWords(decode.words));
}
function promisify(events, type = 'confirmation') {
    if (type === 'hash' || type === 'receipt' || type === 'confirmation') {
        return new Promise((resolve, reject) => {
            events.on('error', error => reject(error));
            events.on(type, data => resolve(data));
        });
    }
    else {
        throw new Error('Invalid event type.');
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
    validatePublicKey: validatePublicKey,
    encodeAddress: encodeAddress,
    decodeAddress: decodeAddress,
    promisify: promisify
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
                params: Object.assign(Object.assign({}, opts), { path, data: key }),
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
    'cosmos-sdk/MsgWithdrawDelegationReward': TypeFactory.create('MsgWithdrawDelegationReward', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'validator_address',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgWithdrawValidatorCommission': TypeFactory.create('MsgWithdrawValidatorCommission', [
        {
            name: 'validator_address',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgModifyWithdrawAddress': TypeFactory.create('MsgModifyWithdrawAddress', [
        {
            name: 'delegator_address',
            type: Types.String,
        },
        {
            name: 'withdraw_address',
            type: Types.String,
        },
    ]),
};
Object.keys(Codec$2).forEach(codec => registerConcrete(codec, Codec$2[codec]));

const _types$1 = {
    WithdrawDelegationRewardMsgType: 'cosmos-sdk/MsgWithdrawDelegationReward',
    WithdrawValidatorCommissionMsgType: 'cosmos-sdk/MsgWithdrawValidatorCommission',
    ModifyWithdrawAddressMsgType: 'cosmos-sdk/MsgModifyWithdrawAddress',
};
const Msgs$1 = {
    makeWithdrawDelegationRewardMsg(delegator, validator) {
        const msg = new Codec$2[_types$1.WithdrawDelegationRewardMsgType](delegator, validator);
        return [msg];
    },
    makeWithdrawValidatorCommissionMsg(validator) {
        const msg = new Codec$2[_types$1.WithdrawValidatorCommissionMsgType](validator);
        return [msg];
    },
    makeModifyWithdrawAddressMsg(delegator, withdrawAddress) {
        const msg = new Codec$2[_types$1.ModifyWithdrawAddressMsgType](delegator, withdrawAddress);
        return [msg];
    },
};
class Distribution extends TransactionApi {
    withdrawDelegationReward(validator) {
        const msgs = Msgs$1.makeWithdrawDelegationRewardMsg(this.broadcast.signer.getAddress(), validator);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    withdrawValidatorCommission(validator) {
        const msgs = Msgs$1.makeWithdrawValidatorCommissionMsg(validator);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    modifyWithdrawAddress(withdrawAddress) {
        const msgs = Msgs$1.makeModifyWithdrawAddressMsg(this.broadcast.signer.getAddress(), withdrawAddress);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$3 = {
    'cosmos-sdk/MsgSubmitProposal': TypeFactory.create('MsgSubmitProposal', [
        {
            name: 'content',
            type: Types.Interface,
        },
        {
            name: 'initial_deposit',
            type: Types.ArrayStruct,
        },
        {
            name: 'proposer',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/MsgDeposit': TypeFactory.create('MsgDeposit', [
        {
            name: 'proposal_id',
            type: Types.Int64,
        },
        {
            name: 'depositor',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'cosmos-sdk/MsgVote': TypeFactory.create('MsgVote', [
        {
            name: 'proposal_id',
            type: Types.Int64,
        },
        {
            name: 'voter',
            type: Types.String,
        },
        {
            name: 'option',
            type: Types.Int32,
        },
    ]),
    'cosmos-sdk/TextProposal': TypeFactory.create('TextProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/ParameterChangeProposal': TypeFactory.create('ParameterChangeProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'changes',
            type: Types.ArrayStruct,
        },
    ]),
    ParamChange: TypeFactory.create('ParamChange', [
        {
            name: 'subspace',
            type: Types.String,
        },
        {
            name: 'key',
            type: Types.String,
        },
        {
            name: 'value',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/CommunityPoolSpendProposal': TypeFactory.create('CommunityPoolSpendProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'recipient',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'cosmos-sdk/BurnedPoolSpendProposal': TypeFactory.create('BurnedPoolSpendProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'recipient',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
};
Object.keys(Codec$3).forEach(codec => registerConcrete(codec, Codec$3[codec]));

const _types$2 = {
    SubmitProposalMsgType: 'cosmos-sdk/MsgSubmitProposal',
    DepositMsgType: 'cosmos-sdk/MsgDeposit',
    VoteMsgType: 'cosmos-sdk/MsgVote',
    TextProposalMsgType: 'cosmos-sdk/TextProposal',
    ParameterChangeProposalMsgType: 'cosmos-sdk/ParameterChangeProposal',
    CommunityPoolSpendProposalMsgType: 'cosmos-sdk/CommunityPoolSpendProposal',
    BurnedPoolSpendProposalMsgType: 'cosmos-sdk/BurnedPoolSpendProposal',
};
const Msgs$2 = {
    makeSubmitProposalMsg(proposer, initialDeposit, content) {
        const msg = new Codec$3[_types$2.SubmitProposalMsgType](content, initialDeposit.map(am => new Coin(am.denom, am.amount)), proposer);
        return [msg];
    },
    makeVoteMsg(proposalId, voter, option) {
        let voteOption = option.toLowerCase();
        let numOption = 0;
        switch (voteOption) {
            case 'yes':
                numOption = 1;
                break;
            case 'abstain':
                numOption = 2;
                break;
            case 'no':
                numOption = 3;
                break;
            case 'no_with_veto':
            case 'nowithveto':
                numOption = 4;
                break;
        }
        const msg = new Codec$3[_types$2.VoteMsgType](proposalId, voter, numOption);
        return [msg];
    },
    makeDepositMsg(proposalId, depositor, amount) {
        const msg = new Codec$3[_types$2.DepositMsgType](proposalId, depositor, amount.map(am => new Coin(am.denom, am.amount)));
        return [msg];
    },
    makeTextProposal(proposer, initialDeposit, title, description) {
        const content = new Codec$3[_types$2.TextProposalMsgType](title, description);
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeParameterChangeProposal(proposer, initialDeposit, title, description, changes) {
        const codecChanges = changes.map(change => new Codec$3['ParamChange'](change.subspace, change.key, change.value));
        const content = new Codec$3[_types$2.ParameterChangeProposalMsgType](title, description, codecChanges);
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeCommunityPoolSpendProposal(proposer, initialDeposit, title, description, recipient, amount) {
        const content = new Codec$3[_types$2.CommunityPoolSpendProposalMsgType](title, description, recipient, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeBurnedPoolSpendProposal(proposer, initialDeposit, title, description, recipient, amount) {
        const content = new Codec$3[_types$2.BurnedPoolSpendProposalMsgType](title, description, recipient, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
};
class Gov extends TransactionApi {
    vote(proposalId, option) {
        const msgs = Msgs$2.makeVoteMsg(proposalId, this.broadcast.signer.getAddress(), option);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    deposit(proposalId, amount) {
        const msgs = Msgs$2.makeDepositMsg(proposalId, this.broadcast.signer.getAddress(), amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitTextProposal(initialDeposit, title, description) {
        const msgs = Msgs$2.makeTextProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitParameterChangeProposal(initialDeposit, title, description, changes) {
        const msgs = Msgs$2.makeParameterChangeProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, changes);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitCommunityPoolSpendProposal(initialDeposit, title, description, recipient, amount) {
        const msgs = Msgs$2.makeCommunityPoolSpendProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, recipient, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitBurnedPoolSpendProposal(initialDeposit, title, description, recipient, amount) {
        const msgs = Msgs$2.makeBurnedPoolSpendProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, recipient, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$4 = {
    'cosmos-sdk/MsgUnjail': TypeFactory.create('MsgUnjail', [
        {
            name: 'address',
            type: Types.String,
        },
    ]),
};
Object.keys(Codec$4).forEach(codec => registerConcrete(codec, Codec$4[codec]));

const _types$3 = {
    UnjailMsgType: 'cosmos-sdk/MsgUnjail',
};
const Msgs$3 = {
    makeUnjailMsg(address) {
        const msg = new Codec$4[_types$3.UnjailMsgType](address);
        return [msg];
    },
};
class Slashing extends TransactionApi {
    unjail(address) {
        const msgs = Msgs$3.makeUnjailMsg(address);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$5 = {
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
Object.keys(Codec$5).forEach(codec => registerConcrete(codec, Codec$5[codec]));

const _types$4 = {
    CreateValidatorMsgType: 'cosmos-sdk/MsgCreateValidator',
    EditValidatorMsgType: 'cosmos-sdk/MsgEditValidator',
    DelegateMsgType: 'cosmos-sdk/MsgDelegate',
    UndelegateMsgType: 'cosmos-sdk/MsgUndelegate',
    BeginRedelegateMsgType: 'cosmos-sdk/MsgBeginRedelegate',
    Description: 'Description',
    Commission: 'Commission',
};
const Msgs$4 = {
    makeDelegateMsg(delegator, validator, amount) {
        const msg = new Codec$5[_types$4.DelegateMsgType](delegator, validator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeUndelegateMsg(delegator, validator, amount) {
        const msg = new Codec$5[_types$4.UndelegateMsgType](delegator, validator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeBeginRedelegateMsg(delegator, srcValidator, dstValidator, amount) {
        const msg = new Codec$5[_types$4.BeginRedelegateMsgType](delegator, srcValidator, dstValidator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeCreateValidatorMsg(description, commission, minSelfDelegation, delegator, validator, pubkey, value) {
        let desc = new Codec$5[_types$4.Description](description.moniker, description.identity, description.website, description.securityContact, description.details);
        let comm = new Codec$5[_types$4.Commission](commission.rate, commission.maxRate, commission.maxChangeRate);
        const msg = new Codec$5[_types$4.CreateValidatorMsgType](desc, comm, minSelfDelegation, delegator, validator, pubkey, new Coin(value.denom, value.amount));
        return [msg];
    },
    makeEditValidatorMsg(description, address, commissionRate, minSelfDelegation) {
        let desc = new Codec$5[_types$4.Description](description.moniker, description.identity, description.website, description.securityContact, description.details);
        const msg = new Codec$5[_types$4.EditValidatorMsgType](desc, address, commissionRate, minSelfDelegation);
        return [msg];
    },
};
class Staking extends TransactionApi {
    createValidator(description, commission, minSelfDelegation, delegator, validator, pubkey, value) {
        const msgs = Msgs$4.makeCreateValidatorMsg(description, commission, minSelfDelegation, this.broadcast.signer.getAddress(), validator, pubkey, value);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    editValidator(description, address, commissionRate, minSelfDelegation) {
        const msgs = Msgs$4.makeEditValidatorMsg(description, address, commissionRate, minSelfDelegation);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    delegate(validator, amount) {
        const msgs = Msgs$4.makeDelegateMsg(this.broadcast.signer.getAddress(), validator, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    undelegate(validator, amount) {
        const msgs = Msgs$4.makeUndelegateMsg(this.broadcast.signer.getAddress(), validator, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    beginRedelegate(srcValidator, dstValidator, amount) {
        const msgs = Msgs$4.makeBeginRedelegateMsg(this.broadcast.signer.getAddress(), srcValidator, dstValidator, amount);
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
    proposalVotes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, `proposal_votes/${id}`);
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
        this._indexer = new Indexer({
            endpoint: opt.indexerEndpoint || 'http://localhost:3100/api/v1',
        });
        this._bank = new Bank(this._broadcast);
        this._staking = new Staking(this._broadcast);
        this._slashing = new Slashing(this._broadcast);
        this._distribution = new Distribution(this._broadcast);
        this._gov = new Gov(this._broadcast);
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
    get slashing() {
        return this._slashing;
    }
    get distribution() {
        return this._distribution;
    }
    get governance() {
        return this._gov;
    }
    get indexer() {
        return this._indexer;
    }
}

export { Mele, index as Utils, KeyPairSigner, MnemonicSigner, DefaultSigner };
//# sourceMappingURL=mele-sdk.esm.js.map
