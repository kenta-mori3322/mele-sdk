'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsAmino = require('js-amino');
var bech32 = _interopDefault(require('bech32'));
var shajs = _interopDefault(require('sha.js'));
var debugUtil = _interopDefault(require('util'));
var buffer = _interopDefault(require('buffer'));
var stream = _interopDefault(require('stream'));
var events = require('events');
var events__default = _interopDefault(events);
var elliptic = require('elliptic');
var bip32 = require('bip32');
var bip39 = require('bip39');
var promiseRetry = _interopDefault(require('promise-retry'));
var fetch = _interopDefault(require('cross-fetch'));
var queryString = _interopDefault(require('query-string'));

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

const StdTx = jsAmino.TypeFactory.create('StdTx', [
    {
        name: 'msg',
        type: jsAmino.Types.ArrayInterface,
    },
    {
        name: 'fee',
        type: jsAmino.Types.Struct,
    },
    {
        name: 'signatures',
        type: jsAmino.Types.ArrayStruct,
    },
    {
        name: 'memo',
        type: jsAmino.Types.String,
    },
]);
const Coin = jsAmino.TypeFactory.create('coin', [
    {
        name: 'denom',
        type: jsAmino.Types.String,
    },
    {
        name: 'amount',
        type: jsAmino.Types.String,
    },
]);
const Fee = jsAmino.TypeFactory.create('fee', [
    {
        name: 'amount',
        type: jsAmino.Types.ArrayStruct,
    },
    {
        name: 'gas',
        type: jsAmino.Types.Int64,
    },
]);
const PubKeySecp256k1 = jsAmino.TypeFactory.create('PubKeySecp256k1', [
    {
        name: 's',
        type: jsAmino.Types.ByteSlice,
    },
], jsAmino.Types.ByteSlice);
const Signature = jsAmino.TypeFactory.create('signature', [
    {
        name: 'pub_key',
        type: jsAmino.Types.Interface,
    },
    {
        name: 'signature',
        type: jsAmino.Types.ByteSlice,
    },
]);
const codec = new jsAmino.Codec();
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
  var util = debugUtil;
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
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

var stream$1 = stream;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Buffer$1 = buffer.Buffer;

var inspect = debugUtil.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer$1.prototype.copy.call(src, target, offset);
}

var buffer_list =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer$1.alloc(0);
      var ret = Buffer$1.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer$1.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream$$1, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream$$1._readableState;
  var wState = stream$$1._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream$$1.destroy(err);else stream$$1.emit('error', err);
}

var destroy_1 = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};

const codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage (arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message
    } else {
      return message(arg1, arg2, arg3)
    }
  }

  class NodeError extends Base {
    constructor (arg1, arg2, arg3) {
      super(getMessage(arg1, arg2, arg3));
    }
  }

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;

  codes[code] = NodeError;
}

// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    const len = expected.length;
    expected = expected.map((i) => String(i));
    if (len > 2) {
      return `one of ${thing} ${expected.slice(0, len - 1).join(', ')}, or ` +
             expected[len - 1];
    } else if (len === 2) {
      return `one of ${thing} ${expected[0]} or ${expected[1]}`;
    } else {
      return `of ${thing} ${expected[0]}`;
    }
  } else {
    return `of ${thing} ${String(expected)}`;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
	return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
	if (this_len === undefined || this_len > str.length) {
		this_len = str.length;
	}
	return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"'
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  let determiner;
  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  let msg;
  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = `The ${name} ${determiner} ${oneOf(expected, 'type')}`;
  } else {
    const type = includes(name, '.') ? 'property' : 'argument';
    msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, 'type')}`;
  }

  msg += `. Received type ${typeof actual}`;
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented'
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');

var codes_1 = codes;

var errors = {
	codes: codes_1
};

var ERR_INVALID_OPT_VALUE = errors.codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

var state = {
  getHighWaterMark: getHighWaterMark
};

/**
 * For Node.js, simply re-export the core `util.deprecate` function.
 */

var node = debugUtil.deprecate;

var _stream_writable = Writable;
// there will be only 2 of these for each stream


function CorkedRequest(state$$1) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state$$1);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: node
};
/*</replacement>*/

/*<replacement>*/


/*</replacement>*/


var Buffer$2 = buffer.Buffer;

var OurUint8Array = commonjsGlobal.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer$2.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer$2.isBuffer(obj) || obj instanceof OurUint8Array;
}



var getHighWaterMark$1 = state.getHighWaterMark;

var _require$codes = errors.codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy$1 = destroy_1.errorOrDestroy;

inherits(Writable, stream$1);

function nop() {}

function WritableState(options, stream$$1, isDuplex) {
  Duplex = Duplex || _stream_duplex;
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream$$1 instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark$1(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream$$1, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || _stream_duplex; // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  stream$1.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy$1(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream$$1, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy$1(stream$$1, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream$$1, state$$1, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state$$1.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy$1(stream$$1, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state$$1 = this._writableState;
  var ret = false;

  var isBuf = !state$$1.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer$2.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state$$1.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state$$1.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state$$1, chunk, cb)) {
    state$$1.pendingcb++;
    ret = writeOrBuffer(this, state$$1, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state$$1 = this._writableState;

  if (state$$1.corked) {
    state$$1.corked--;
    if (!state$$1.writing && !state$$1.corked && !state$$1.bufferProcessing && state$$1.bufferedRequest) clearBuffer(this, state$$1);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state$$1, chunk, encoding) {
  if (!state$$1.objectMode && state$$1.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer$2.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream$$1, state$$1, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state$$1, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state$$1.objectMode ? 1 : chunk.length;
  state$$1.length += len;
  var ret = state$$1.length < state$$1.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state$$1.needDrain = true;

  if (state$$1.writing || state$$1.corked) {
    var last = state$$1.lastBufferedRequest;
    state$$1.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state$$1.lastBufferedRequest;
    } else {
      state$$1.bufferedRequest = state$$1.lastBufferedRequest;
    }

    state$$1.bufferedRequestCount += 1;
  } else {
    doWrite(stream$$1, state$$1, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream$$1, state$$1, writev, len, chunk, encoding, cb) {
  state$$1.writelen = len;
  state$$1.writecb = cb;
  state$$1.writing = true;
  state$$1.sync = true;
  if (state$$1.destroyed) state$$1.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream$$1._writev(chunk, state$$1.onwrite);else stream$$1._write(chunk, encoding, state$$1.onwrite);
  state$$1.sync = false;
}

function onwriteError(stream$$1, state$$1, sync, er, cb) {
  --state$$1.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream$$1, state$$1);
    stream$$1._writableState.errorEmitted = true;
    errorOrDestroy$1(stream$$1, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream$$1._writableState.errorEmitted = true;
    errorOrDestroy$1(stream$$1, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream$$1, state$$1);
  }
}

function onwriteStateUpdate(state$$1) {
  state$$1.writing = false;
  state$$1.writecb = null;
  state$$1.length -= state$$1.writelen;
  state$$1.writelen = 0;
}

function onwrite(stream$$1, er) {
  var state$$1 = stream$$1._writableState;
  var sync = state$$1.sync;
  var cb = state$$1.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state$$1);
  if (er) onwriteError(stream$$1, state$$1, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state$$1) || stream$$1.destroyed;

    if (!finished && !state$$1.corked && !state$$1.bufferProcessing && state$$1.bufferedRequest) {
      clearBuffer(stream$$1, state$$1);
    }

    if (sync) {
      process.nextTick(afterWrite, stream$$1, state$$1, finished, cb);
    } else {
      afterWrite(stream$$1, state$$1, finished, cb);
    }
  }
}

function afterWrite(stream$$1, state$$1, finished, cb) {
  if (!finished) onwriteDrain(stream$$1, state$$1);
  state$$1.pendingcb--;
  cb();
  finishMaybe(stream$$1, state$$1);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream$$1, state$$1) {
  if (state$$1.length === 0 && state$$1.needDrain) {
    state$$1.needDrain = false;
    stream$$1.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream$$1, state$$1) {
  state$$1.bufferProcessing = true;
  var entry = state$$1.bufferedRequest;

  if (stream$$1._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state$$1.bufferedRequestCount;
    var buffer$$1 = new Array(l);
    var holder = state$$1.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer$$1[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer$$1.allBuffers = allBuffers;
    doWrite(stream$$1, state$$1, true, state$$1.length, buffer$$1, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state$$1.pendingcb++;
    state$$1.lastBufferedRequest = null;

    if (holder.next) {
      state$$1.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state$$1.corkedRequestsFree = new CorkedRequest(state$$1);
    }

    state$$1.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state$$1.objectMode ? 1 : chunk.length;
      doWrite(stream$$1, state$$1, false, len, chunk, encoding, cb);
      entry = entry.next;
      state$$1.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state$$1.writing) {
        break;
      }
    }

    if (entry === null) state$$1.lastBufferedRequest = null;
  }

  state$$1.bufferedRequest = entry;
  state$$1.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state$$1 = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state$$1.corked) {
    state$$1.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state$$1.ending) endWritable(this, state$$1, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state$$1) {
  return state$$1.ending && state$$1.length === 0 && state$$1.bufferedRequest === null && !state$$1.finished && !state$$1.writing;
}

function callFinal(stream$$1, state$$1) {
  stream$$1._final(function (err) {
    state$$1.pendingcb--;

    if (err) {
      errorOrDestroy$1(stream$$1, err);
    }

    state$$1.prefinished = true;
    stream$$1.emit('prefinish');
    finishMaybe(stream$$1, state$$1);
  });
}

function prefinish(stream$$1, state$$1) {
  if (!state$$1.prefinished && !state$$1.finalCalled) {
    if (typeof stream$$1._final === 'function' && !state$$1.destroyed) {
      state$$1.pendingcb++;
      state$$1.finalCalled = true;
      process.nextTick(callFinal, stream$$1, state$$1);
    } else {
      state$$1.prefinished = true;
      stream$$1.emit('prefinish');
    }
  }
}

function finishMaybe(stream$$1, state$$1) {
  var need = needFinish(state$$1);

  if (need) {
    prefinish(stream$$1, state$$1);

    if (state$$1.pendingcb === 0) {
      state$$1.finished = true;
      stream$$1.emit('finish');

      if (state$$1.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream$$1._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream$$1.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream$$1, state$$1, cb) {
  state$$1.ending = true;
  finishMaybe(stream$$1, state$$1);

  if (cb) {
    if (state$$1.finished) process.nextTick(cb);else stream$$1.once('finish', cb);
  }

  state$$1.ended = true;
  stream$$1.writable = false;
}

function onCorkedFinish(corkReq, state$$1, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state$$1.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state$$1.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroy_1.destroy;
Writable.prototype._undestroy = destroy_1.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


var _stream_duplex = Duplex$1;





inherits(Duplex$1, _stream_readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(_stream_writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex$1.prototype[method]) Duplex$1.prototype[method] = _stream_writable.prototype[method];
  }
}

function Duplex$1(options) {
  if (!(this instanceof Duplex$1)) return new Duplex$1(options);
  _stream_readable.call(this, options);
  _stream_writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex$1.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex$1.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex$1.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex$1.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

/*<replacement>*/

var Buffer$3 = safeBuffer.Buffer;
/*</replacement>*/

var isEncoding = Buffer$3.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
}
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer$3.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
var StringDecoder_1 = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer$3.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

var string_decoder = {
	StringDecoder: StringDecoder_1
};

var ERR_STREAM_PREMATURE_CLOSE = errors.codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream$$1) {
  return stream$$1.setHeader && typeof stream$$1.abort === 'function';
}

function eos(stream$$1, opts, callback) {
  if (typeof opts === 'function') return eos(stream$$1, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream$$1.readable;
  var writable = opts.writable || opts.writable !== false && stream$$1.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream$$1.writable) onfinish();
  };

  var writableEnded = stream$$1._writableState && stream$$1._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream$$1);
  };

  var readableEnded = stream$$1._readableState && stream$$1._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream$$1);
  };

  var onerror = function onerror(err) {
    callback.call(stream$$1, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream$$1._readableState || !stream$$1._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream$$1, err);
    }

    if (writable && !writableEnded) {
      if (!stream$$1._writableState || !stream$$1._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream$$1, err);
    }
  };

  var onrequest = function onrequest() {
    stream$$1.req.on('finish', onfinish);
  };

  if (isRequest(stream$$1)) {
    stream$$1.on('complete', onfinish);
    stream$$1.on('abort', onclose);
    if (stream$$1.req) onrequest();else stream$$1.on('request', onrequest);
  } else if (writable && !stream$$1._writableState) {
    // legacy streams
    stream$$1.on('end', onlegacyfinish);
    stream$$1.on('close', onlegacyfinish);
  }

  stream$$1.on('end', onend);
  stream$$1.on('finish', onfinish);
  if (opts.error !== false) stream$$1.on('error', onerror);
  stream$$1.on('close', onclose);
  return function () {
    stream$$1.removeListener('complete', onfinish);
    stream$$1.removeListener('abort', onclose);
    stream$$1.removeListener('request', onrequest);
    if (stream$$1.req) stream$$1.req.removeListener('finish', onfinish);
    stream$$1.removeListener('end', onlegacyfinish);
    stream$$1.removeListener('close', onlegacyfinish);
    stream$$1.removeListener('finish', onfinish);
    stream$$1.removeListener('end', onend);
    stream$$1.removeListener('error', onerror);
    stream$$1.removeListener('close', onclose);
  };
}

var endOfStream = eos;

var _Object$setPrototypeO;

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty$1(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty$1(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream$$1) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty$1(_Object$create, kStream, {
    value: stream$$1,
    writable: true
  }), _defineProperty$1(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty$1(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty$1(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty$1(_Object$create, kEnded, {
    value: stream$$1._readableState.endEmitted,
    writable: true
  }), _defineProperty$1(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  endOfStream(stream$$1, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream$$1.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

var async_iterator = createReadableStreamAsyncIterator;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ERR_INVALID_ARG_TYPE$1 = errors.codes.ERR_INVALID_ARG_TYPE;

function from(Readable, iterable, opts) {
  var iterator;

  if (iterable && typeof iterable.next === 'function') {
    iterator = iterable;
  } else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();else throw new ERR_INVALID_ARG_TYPE$1('iterable', ['Iterable'], iterable);

  var readable = new Readable(_objectSpread$1({
    objectMode: true
  }, opts)); // Reading boolean to protect against _read
  // being called before last iteration completion.

  var reading = false;

  readable._read = function () {
    if (!reading) {
      reading = true;
      next();
    }
  };

  function next() {
    return _next2.apply(this, arguments);
  }

  function _next2() {
    _next2 = _asyncToGenerator(function* () {
      try {
        var _ref = yield iterator.next(),
            value = _ref.value,
            done = _ref.done;

        if (done) {
          readable.push(null);
        } else if (readable.push((yield value))) {
          next();
        } else {
          reading = false;
        }
      } catch (err) {
        readable.destroy(err);
      }
    });
    return _next2.apply(this, arguments);
  }

  return readable;
}

var from_1 = from;

var _stream_readable = Readable;
/*<replacement>*/

var Duplex$2;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = events__default.EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/



/*</replacement>*/


var Buffer$4 = buffer.Buffer;

var OurUint8Array$1 = commonjsGlobal.Uint8Array || function () {};

function _uint8ArrayToBuffer$1(chunk) {
  return Buffer$4.from(chunk);
}

function _isUint8Array$1(obj) {
  return Buffer$4.isBuffer(obj) || obj instanceof OurUint8Array$1;
}
/*<replacement>*/




var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/






var getHighWaterMark$2 = state.getHighWaterMark;

var _require$codes$1 = errors.codes,
    ERR_INVALID_ARG_TYPE$2 = _require$codes$1.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes$1.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED$1 = _require$codes$1.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes$1.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder$1;
var createReadableStreamAsyncIterator$1;
var from$1;

inherits(Readable, stream$1);

var errorOrDestroy$2 = destroy_1.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream$$1, isDuplex) {
  Duplex$2 = Duplex$2 || _stream_duplex;
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream$$1 instanceof Duplex$2; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark$2(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new buffer_list();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder$1) StringDecoder$1 = string_decoder.StringDecoder;
    this.decoder = new StringDecoder$1(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex$2 = Duplex$2 || _stream_duplex;
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex$2;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  stream$1.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroy_1.destroy;
Readable.prototype._undestroy = destroy_1.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state$$1 = this._readableState;
  var skipChunkCheck;

  if (!state$$1.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state$$1.defaultEncoding;

      if (encoding !== state$$1.encoding) {
        chunk = Buffer$4.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream$$1, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state$$1 = stream$$1._readableState;

  if (chunk === null) {
    state$$1.reading = false;
    onEofChunk(stream$$1, state$$1);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state$$1, chunk);

    if (er) {
      errorOrDestroy$2(stream$$1, er);
    } else if (state$$1.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state$$1.objectMode && Object.getPrototypeOf(chunk) !== Buffer$4.prototype) {
        chunk = _uint8ArrayToBuffer$1(chunk);
      }

      if (addToFront) {
        if (state$$1.endEmitted) errorOrDestroy$2(stream$$1, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream$$1, state$$1, chunk, true);
      } else if (state$$1.ended) {
        errorOrDestroy$2(stream$$1, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state$$1.destroyed) {
        return false;
      } else {
        state$$1.reading = false;

        if (state$$1.decoder && !encoding) {
          chunk = state$$1.decoder.write(chunk);
          if (state$$1.objectMode || chunk.length !== 0) addChunk(stream$$1, state$$1, chunk, false);else maybeReadMore(stream$$1, state$$1);
        } else {
          addChunk(stream$$1, state$$1, chunk, false);
        }
      }
    } else if (!addToFront) {
      state$$1.reading = false;
      maybeReadMore(stream$$1, state$$1);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state$$1.ended && (state$$1.length < state$$1.highWaterMark || state$$1.length === 0);
}

function addChunk(stream$$1, state$$1, chunk, addToFront) {
  if (state$$1.flowing && state$$1.length === 0 && !state$$1.sync) {
    state$$1.awaitDrain = 0;
    stream$$1.emit('data', chunk);
  } else {
    // update the buffer info.
    state$$1.length += state$$1.objectMode ? 1 : chunk.length;
    if (addToFront) state$$1.buffer.unshift(chunk);else state$$1.buffer.push(chunk);
    if (state$$1.needReadable) emitReadable(stream$$1);
  }

  maybeReadMore(stream$$1, state$$1);
}

function chunkInvalid(state$$1, chunk) {
  var er;

  if (!_isUint8Array$1(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state$$1.objectMode) {
    er = new ERR_INVALID_ARG_TYPE$2('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder$1) StringDecoder$1 = string_decoder.StringDecoder;
  var decoder = new StringDecoder$1(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state$$1) {
  if (n <= 0 || state$$1.length === 0 && state$$1.ended) return 0;
  if (state$$1.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state$$1.flowing && state$$1.length) return state$$1.buffer.head.data.length;else return state$$1.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state$$1.highWaterMark) state$$1.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state$$1.length) return n; // Don't have enough

  if (!state$$1.ended) {
    state$$1.needReadable = true;
    return 0;
  }

  return state$$1.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state$$1 = this._readableState;
  var nOrig = n;
  if (n !== 0) state$$1.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state$$1.needReadable && ((state$$1.highWaterMark !== 0 ? state$$1.length >= state$$1.highWaterMark : state$$1.length > 0) || state$$1.ended)) {
    debug('read: emitReadable', state$$1.length, state$$1.ended);
    if (state$$1.length === 0 && state$$1.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state$$1); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state$$1.ended) {
    if (state$$1.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state$$1.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state$$1.length === 0 || state$$1.length - n < state$$1.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state$$1.ended || state$$1.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state$$1.reading = true;
    state$$1.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state$$1.length === 0) state$$1.needReadable = true; // call internal read method

    this._read(state$$1.highWaterMark);

    state$$1.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state$$1.reading) n = howMuchToRead(nOrig, state$$1);
  }

  var ret;
  if (n > 0) ret = fromList(n, state$$1);else ret = null;

  if (ret === null) {
    state$$1.needReadable = state$$1.length <= state$$1.highWaterMark;
    n = 0;
  } else {
    state$$1.length -= n;
    state$$1.awaitDrain = 0;
  }

  if (state$$1.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state$$1.ended) state$$1.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state$$1.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream$$1, state$$1) {
  debug('onEofChunk');
  if (state$$1.ended) return;

  if (state$$1.decoder) {
    var chunk = state$$1.decoder.end();

    if (chunk && chunk.length) {
      state$$1.buffer.push(chunk);
      state$$1.length += state$$1.objectMode ? 1 : chunk.length;
    }
  }

  state$$1.ended = true;

  if (state$$1.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream$$1);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state$$1.needReadable = false;

    if (!state$$1.emittedReadable) {
      state$$1.emittedReadable = true;
      emitReadable_(stream$$1);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream$$1) {
  var state$$1 = stream$$1._readableState;
  debug('emitReadable', state$$1.needReadable, state$$1.emittedReadable);
  state$$1.needReadable = false;

  if (!state$$1.emittedReadable) {
    debug('emitReadable', state$$1.flowing);
    state$$1.emittedReadable = true;
    process.nextTick(emitReadable_, stream$$1);
  }
}

function emitReadable_(stream$$1) {
  var state$$1 = stream$$1._readableState;
  debug('emitReadable_', state$$1.destroyed, state$$1.length, state$$1.ended);

  if (!state$$1.destroyed && (state$$1.length || state$$1.ended)) {
    stream$$1.emit('readable');
    state$$1.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state$$1.needReadable = !state$$1.flowing && !state$$1.ended && state$$1.length <= state$$1.highWaterMark;
  flow(stream$$1);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream$$1, state$$1) {
  if (!state$$1.readingMore) {
    state$$1.readingMore = true;
    process.nextTick(maybeReadMore_, stream$$1, state$$1);
  }
}

function maybeReadMore_(stream$$1, state$$1) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state$$1.reading && !state$$1.ended && (state$$1.length < state$$1.highWaterMark || state$$1.flowing && state$$1.length === 0)) {
    var len = state$$1.length;
    debug('maybeReadMore read 0');
    stream$$1.read(0);
    if (len === state$$1.length) // didn't get any data, stop spinning.
      break;
  }

  state$$1.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy$2(this, new ERR_METHOD_NOT_IMPLEMENTED$1('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state$$1 = this._readableState;

  switch (state$$1.pipesCount) {
    case 0:
      state$$1.pipes = dest;
      break;

    case 1:
      state$$1.pipes = [state$$1.pipes, dest];
      break;

    default:
      state$$1.pipes.push(dest);
      break;
  }

  state$$1.pipesCount += 1;
  debug('pipe count=%d opts=%j', state$$1.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state$$1.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state$$1.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state$$1.pipesCount === 1 && state$$1.pipes === dest || state$$1.pipesCount > 1 && indexOf(state$$1.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state$$1.awaitDrain);
        state$$1.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy$2(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state$$1.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state$$1 = src._readableState;
    debug('pipeOnDrain', state$$1.awaitDrain);
    if (state$$1.awaitDrain) state$$1.awaitDrain--;

    if (state$$1.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state$$1.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state$$1 = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state$$1.pipesCount === 0) return this; // just one destination.  most common case.

  if (state$$1.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state$$1.pipes) return this;
    if (!dest) dest = state$$1.pipes; // got a match.

    state$$1.pipes = null;
    state$$1.pipesCount = 0;
    state$$1.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state$$1.pipes;
    var len = state$$1.pipesCount;
    state$$1.pipes = null;
    state$$1.pipesCount = 0;
    state$$1.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state$$1.pipes, dest);
  if (index === -1) return this;
  state$$1.pipes.splice(index, 1);
  state$$1.pipesCount -= 1;
  if (state$$1.pipesCount === 1) state$$1.pipes = state$$1.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = stream$1.prototype.on.call(this, ev, fn);
  var state$$1 = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state$$1.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state$$1.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state$$1.endEmitted && !state$$1.readableListening) {
      state$$1.readableListening = state$$1.needReadable = true;
      state$$1.flowing = false;
      state$$1.emittedReadable = false;
      debug('on readable', state$$1.length, state$$1.reading);

      if (state$$1.length) {
        emitReadable(this);
      } else if (!state$$1.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = stream$1.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = stream$1.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state$$1 = self._readableState;
  state$$1.readableListening = self.listenerCount('readable') > 0;

  if (state$$1.resumeScheduled && !state$$1.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state$$1.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state$$1 = this._readableState;

  if (!state$$1.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state$$1.flowing = !state$$1.readableListening;
    resume(this, state$$1);
  }

  state$$1.paused = false;
  return this;
};

function resume(stream$$1, state$$1) {
  if (!state$$1.resumeScheduled) {
    state$$1.resumeScheduled = true;
    process.nextTick(resume_, stream$$1, state$$1);
  }
}

function resume_(stream$$1, state$$1) {
  debug('resume', state$$1.reading);

  if (!state$$1.reading) {
    stream$$1.read(0);
  }

  state$$1.resumeScheduled = false;
  stream$$1.emit('resume');
  flow(stream$$1);
  if (state$$1.flowing && !state$$1.reading) stream$$1.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream$$1) {
  var state$$1 = stream$$1._readableState;
  debug('flow', state$$1.flowing);

  while (state$$1.flowing && stream$$1.read() !== null) {
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream$$1) {
  var _this = this;

  var state$$1 = this._readableState;
  var paused = false;
  stream$$1.on('end', function () {
    debug('wrapped end');

    if (state$$1.decoder && !state$$1.ended) {
      var chunk = state$$1.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream$$1.on('data', function (chunk) {
    debug('wrapped data');
    if (state$$1.decoder) chunk = state$$1.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state$$1.objectMode && (chunk === null || chunk === undefined)) return;else if (!state$$1.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream$$1.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream$$1) {
    if (this[i] === undefined && typeof stream$$1[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream$$1[method].apply(stream$$1, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream$$1.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream$$1.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator$1 === undefined) {
      createReadableStreamAsyncIterator$1 = async_iterator;
    }

    return createReadableStreamAsyncIterator$1(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state$$1) {
    if (this._readableState) {
      this._readableState.flowing = state$$1;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state$$1) {
  // nothing buffered
  if (state$$1.length === 0) return null;
  var ret;
  if (state$$1.objectMode) ret = state$$1.buffer.shift();else if (!n || n >= state$$1.length) {
    // read it all, truncate the list
    if (state$$1.decoder) ret = state$$1.buffer.join('');else if (state$$1.buffer.length === 1) ret = state$$1.buffer.first();else ret = state$$1.buffer.concat(state$$1.length);
    state$$1.buffer.clear();
  } else {
    // read part of list
    ret = state$$1.buffer.consume(n, state$$1.decoder);
  }
  return ret;
}

function endReadable(stream$$1) {
  var state$$1 = stream$$1._readableState;
  debug('endReadable', state$$1.endEmitted);

  if (!state$$1.endEmitted) {
    state$$1.ended = true;
    process.nextTick(endReadableNT, state$$1, stream$$1);
  }
}

function endReadableNT(state$$1, stream$$1) {
  debug('endReadableNT', state$$1.endEmitted, state$$1.length); // Check that we didn't get one last unshift.

  if (!state$$1.endEmitted && state$$1.length === 0) {
    state$$1.endEmitted = true;
    stream$$1.readable = false;
    stream$$1.emit('end');

    if (state$$1.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream$$1._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream$$1.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from$1 === undefined) {
      from$1 = from_1;
    }

    return from$1(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}

var _stream_transform = Transform;

var _require$codes$2 = errors.codes,
    ERR_METHOD_NOT_IMPLEMENTED$2 = _require$codes$2.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK$1 = _require$codes$2.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes$2.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes$2.ERR_TRANSFORM_WITH_LENGTH_0;



inherits(Transform, _stream_duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK$1());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  _stream_duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish$1);
}

function prefinish$1() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return _stream_duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED$2('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  _stream_duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream$$1, er, data) {
  if (er) return stream$$1.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream$$1.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream$$1._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream$$1._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream$$1.push(null);
}

var _stream_passthrough = PassThrough;



inherits(PassThrough, _stream_transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  _stream_transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

var eos$1;

function once$1(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes$3 = errors.codes,
    ERR_MISSING_ARGS = _require$codes$3.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED$1 = _require$codes$3.ERR_STREAM_DESTROYED;

function noop$1(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest$1(stream$$1) {
  return stream$$1.setHeader && typeof stream$$1.abort === 'function';
}

function destroyer(stream$$1, reading, writing, callback) {
  callback = once$1(callback);
  var closed = false;
  stream$$1.on('close', function () {
    closed = true;
  });
  if (eos$1 === undefined) eos$1 = endOfStream;
  eos$1(stream$$1, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest$1(stream$$1)) return stream$$1.abort();
    if (typeof stream$$1.destroy === 'function') return stream$$1.destroy();
    callback(err || new ERR_STREAM_DESTROYED$1('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop$1;
  if (typeof streams[streams.length - 1] !== 'function') return noop$1;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream$$1, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream$$1, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

var pipeline_1 = pipeline;

var readable = createCommonjsModule(function (module, exports) {
if (process.env.READABLE_STREAM === 'disable' && stream) {
  module.exports = stream.Readable;
  Object.assign(module.exports, stream);
  module.exports.Stream = stream;
} else {
  exports = module.exports = _stream_readable;
  exports.Stream = stream || exports;
  exports.Readable = exports;
  exports.Writable = _stream_writable;
  exports.Duplex = _stream_duplex;
  exports.Transform = _stream_transform;
  exports.PassThrough = _stream_passthrough;
  exports.finished = endOfStream;
  exports.pipeline = pipeline_1;
}
});
var readable_1 = readable.Stream;
var readable_2 = readable.Readable;
var readable_3 = readable.Writable;
var readable_4 = readable.Duplex;
var readable_5 = readable.Transform;
var readable_6 = readable.PassThrough;
var readable_7 = readable.finished;
var readable_8 = readable.pipeline;

var Buffer$5 = safeBuffer.Buffer;
var Transform$1 = readable.Transform;


function throwIfNotStringOrBuffer (val, prefix) {
  if (!Buffer$5.isBuffer(val) && typeof val !== 'string') {
    throw new TypeError(prefix + ' must be a string or a buffer')
  }
}

function HashBase (blockSize) {
  Transform$1.call(this);

  this._block = Buffer$5.allocUnsafe(blockSize);
  this._blockSize = blockSize;
  this._blockOffset = 0;
  this._length = [0, 0, 0, 0];

  this._finalized = false;
}

inherits(HashBase, Transform$1);

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
  if (!Buffer$5.isBuffer(data)) data = Buffer$5.from(data, encoding);

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

var Buffer$6 = buffer.Buffer;



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
  var buffer$$1 = Buffer$6.alloc ? Buffer$6.alloc(20) : new Buffer$6(20);
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
    const hashResult = shajs('sha256').update(Buffer.from(pubKey, 'hex')).digest();
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
function promisify(events$$1, type = 'confirmation') {
    if (type === 'hash' || type === 'receipt' || type === 'confirmation') {
        return new Promise((resolve, reject) => {
            events$$1.on('error', error => reject(error));
            events$$1.on(type, data => resolve(data));
        });
    }
    else {
        throw new Error('Invalid event type.');
    }
}

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
    encodeAddress: encodeAddress,
    decodeAddress: decodeAddress,
    promisify: promisify
});

const ec$1 = new elliptic.ec('secp256k1');
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
        let key = ec$1.keyFromPrivate(this._privateKey, 'hex');
        const signMsgHash = encodeSignMsg(msgs, chainId, sequence, accountNumber, fee);
        const sig = key.sign(signMsgHash, { canonical: true });
        const sigDERHex = Buffer.from(sig.r.toArray('be', 32).concat(sig.s.toArray('be', 32))).toString('hex');
        const tx = encodeTx(msgs.map(msg => encodeMsg(msg)), new Array(key.getPublic(true, 'hex')), new Array(sigDERHex), fee);
        return tx;
    }
    signMessage(msg) {
        const key = ec$1.keyFromPrivate(this._privateKey, 'hex');
        const signByte = shajs('sha256').update(msg).digest();
        const sig = key.sign(signByte, { canonical: true });
        return Buffer.from(JSON.stringify(sig), 'utf-8').toString('hex');
    }
}

const ec$2 = new elliptic.ec('secp256k1');
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

class TransactionEvents extends events.EventEmitter {
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

const Codec = {
    'cosmos-sdk/MsgSend': jsAmino.TypeFactory.create('MsgSend', [
        {
            name: 'from_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'to_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'amount',
            type: jsAmino.Types.ArrayStruct,
        },
    ]),
};
Object.keys(Codec).forEach(codec => registerConcrete(codec, Codec[codec]));

const _types = {
    TransferMsgType: 'cosmos-sdk/MsgSend',
};
const Msgs = {
    makeTransferMsg(fromAddress, toAddress, amount) {
        const msg = new Codec[_types.TransferMsgType](fromAddress, toAddress, amount.map(am => new Coin(am.denom, am.amount)));
        return [msg];
    },
};
class Bank extends TransactionApi {
    transfer(toAddress, amount) {
        const msgs = Msgs.makeTransferMsg(this.broadcast.signer.getAddress(), toAddress, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$1 = {
    'cosmos-sdk/MsgWithdrawDelegationReward': jsAmino.TypeFactory.create('MsgWithdrawDelegationReward', [
        {
            name: 'delegator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'validator_address',
            type: jsAmino.Types.String,
        },
    ]),
    'cosmos-sdk/MsgWithdrawValidatorCommission': jsAmino.TypeFactory.create('MsgWithdrawValidatorCommission', [
        {
            name: 'validator_address',
            type: jsAmino.Types.String,
        },
    ]),
    'cosmos-sdk/MsgModifyWithdrawAddress': jsAmino.TypeFactory.create('MsgModifyWithdrawAddress', [
        {
            name: 'delegator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'withdraw_address',
            type: jsAmino.Types.String,
        },
    ]),
};
Object.keys(Codec$1).forEach(codec => registerConcrete(codec, Codec$1[codec]));

const _types$1 = {
    WithdrawDelegationRewardMsgType: 'cosmos-sdk/MsgWithdrawDelegationReward',
    WithdrawValidatorCommissionMsgType: 'cosmos-sdk/MsgWithdrawValidatorCommission',
    ModifyWithdrawAddressMsgType: 'cosmos-sdk/MsgModifyWithdrawAddress',
};
const Msgs$1 = {
    makeWithdrawDelegationRewardMsg(delegator, validator) {
        const msg = new Codec$1[_types$1.WithdrawDelegationRewardMsgType](delegator, validator);
        return [msg];
    },
    makeWithdrawValidatorCommissionMsg(validator) {
        const msg = new Codec$1[_types$1.WithdrawValidatorCommissionMsgType](validator);
        return [msg];
    },
    makeModifyWithdrawAddressMsg(delegator, withdrawAddress) {
        const msg = new Codec$1[_types$1.ModifyWithdrawAddressMsgType](delegator, withdrawAddress);
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

const Codec$2 = {
    'cosmos-sdk/MsgSubmitProposal': jsAmino.TypeFactory.create('MsgSubmitProposal', [
        {
            name: 'content',
            type: jsAmino.Types.Interface,
        },
        {
            name: 'initial_deposit',
            type: jsAmino.Types.ArrayStruct,
        },
        {
            name: 'proposer',
            type: jsAmino.Types.String,
        },
    ]),
    'cosmos-sdk/MsgDeposit': jsAmino.TypeFactory.create('MsgDeposit', [
        {
            name: 'proposal_id',
            type: jsAmino.Types.Int64,
        },
        {
            name: 'depositor',
            type: jsAmino.Types.String,
        },
        {
            name: 'amount',
            type: jsAmino.Types.ArrayStruct,
        },
    ]),
    'cosmos-sdk/MsgVote': jsAmino.TypeFactory.create('MsgVote', [
        {
            name: 'proposal_id',
            type: jsAmino.Types.Int64,
        },
        {
            name: 'voter',
            type: jsAmino.Types.String,
        },
        {
            name: 'option',
            type: jsAmino.Types.Int32,
        },
    ]),
    'cosmos-sdk/TextProposal': jsAmino.TypeFactory.create('TextProposal', [
        {
            name: 'title',
            type: jsAmino.Types.String,
        },
        {
            name: 'description',
            type: jsAmino.Types.String,
        },
    ]),
    'cosmos-sdk/ParameterChangeProposal': jsAmino.TypeFactory.create('ParameterChangeProposal', [
        {
            name: 'title',
            type: jsAmino.Types.String,
        },
        {
            name: 'description',
            type: jsAmino.Types.String,
        },
        {
            name: 'changes',
            type: jsAmino.Types.ArrayStruct,
        },
    ]),
    ParamChange: jsAmino.TypeFactory.create('ParamChange', [
        {
            name: 'subspace',
            type: jsAmino.Types.String,
        },
        {
            name: 'key',
            type: jsAmino.Types.String,
        },
        {
            name: 'value',
            type: jsAmino.Types.String,
        },
    ]),
    'cosmos-sdk/CommunityPoolSpendProposal': jsAmino.TypeFactory.create('CommunityPoolSpendProposal', [
        {
            name: 'title',
            type: jsAmino.Types.String,
        },
        {
            name: 'description',
            type: jsAmino.Types.String,
        },
        {
            name: 'recipient',
            type: jsAmino.Types.String,
        },
        {
            name: 'amount',
            type: jsAmino.Types.ArrayStruct,
        },
    ]),
    'cosmos-sdk/BurnedPoolSpendProposal': jsAmino.TypeFactory.create('BurnedPoolSpendProposal', [
        {
            name: 'title',
            type: jsAmino.Types.String,
        },
        {
            name: 'description',
            type: jsAmino.Types.String,
        },
        {
            name: 'recipient',
            type: jsAmino.Types.String,
        },
        {
            name: 'amount',
            type: jsAmino.Types.ArrayStruct,
        },
    ]),
};
Object.keys(Codec$2).forEach(codec => registerConcrete(codec, Codec$2[codec]));

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
        const msg = new Codec$2[_types$2.SubmitProposalMsgType](content, initialDeposit.map(am => new Coin(am.denom, am.amount)), proposer);
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
        const msg = new Codec$2[_types$2.VoteMsgType](proposalId, voter, numOption);
        return [msg];
    },
    makeDepositMsg(proposalId, depositor, amount) {
        const msg = new Codec$2[_types$2.DepositMsgType](proposalId, depositor, amount.map(am => new Coin(am.denom, am.amount)));
        return [msg];
    },
    makeTextProposal(proposer, initialDeposit, title, description) {
        const content = new Codec$2[_types$2.TextProposalMsgType](title, description);
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeParameterChangeProposal(proposer, initialDeposit, title, description, changes) {
        const codecChanges = changes.map(change => new Codec$2['ParamChange'](change.subspace, change.key, change.value));
        const content = new Codec$2[_types$2.ParameterChangeProposalMsgType](title, description, codecChanges);
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeCommunityPoolSpendProposal(proposer, initialDeposit, title, description, recipient, amount) {
        const content = new Codec$2[_types$2.CommunityPoolSpendProposalMsgType](title, description, recipient, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeBurnedPoolSpendProposal(proposer, initialDeposit, title, description, recipient, amount) {
        const content = new Codec$2[_types$2.BurnedPoolSpendProposalMsgType](title, description, recipient, amount.map(am => new Coin(am.denom, am.amount)));
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

const Codec$3 = {
    'cosmos-sdk/MsgUnjail': jsAmino.TypeFactory.create('MsgUnjail', [
        {
            name: 'address',
            type: jsAmino.Types.String,
        },
    ]),
};
Object.keys(Codec$3).forEach(codec => registerConcrete(codec, Codec$3[codec]));

const _types$3 = {
    UnjailMsgType: 'cosmos-sdk/MsgUnjail',
};
const Msgs$3 = {
    makeUnjailMsg(address) {
        const msg = new Codec$3[_types$3.UnjailMsgType](address);
        return [msg];
    },
};
class Slashing extends TransactionApi {
    unjail(address) {
        const msgs = Msgs$3.makeUnjailMsg(address);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$4 = {
    'cosmos-sdk/MsgCreateValidator': jsAmino.TypeFactory.create('MsgCreateValidator', [
        {
            name: 'description',
            type: jsAmino.Types.Struct,
        },
        {
            name: 'commission',
            type: jsAmino.Types.Struct,
        },
        {
            name: 'min_self_delegation',
            type: jsAmino.Types.String,
        },
        {
            name: 'delegator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'validator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'pubkey',
            type: jsAmino.Types.String,
        },
        {
            name: 'value',
            type: jsAmino.Types.Struct,
        },
    ]),
    Commission: jsAmino.TypeFactory.create('Commission', [
        {
            name: 'rate',
            type: jsAmino.Types.String,
        },
        {
            name: 'max_rate',
            type: jsAmino.Types.String,
        },
        {
            name: 'max_change_rate',
            type: jsAmino.Types.String,
        },
    ]),
    Description: jsAmino.TypeFactory.create('Description', [
        {
            name: 'moniker',
            type: jsAmino.Types.String,
        },
        {
            name: 'identity',
            type: jsAmino.Types.String,
        },
        {
            name: 'website',
            type: jsAmino.Types.String,
        },
        {
            name: 'security_contact',
            type: jsAmino.Types.String,
        },
        {
            name: 'details',
            type: jsAmino.Types.String,
        },
    ]),
    'cosmos-sdk/MsgEditValidator': jsAmino.TypeFactory.create('MsgEditValidator', [
        {
            name: 'description',
            type: jsAmino.Types.Struct,
        },
        {
            name: 'address',
            type: jsAmino.Types.String,
        },
        {
            name: 'commission_rate',
            type: jsAmino.Types.String,
        },
        {
            name: 'min_self_delegation',
            type: jsAmino.Types.String,
        },
    ]),
    'cosmos-sdk/MsgDelegate': jsAmino.TypeFactory.create('MsgDelegate', [
        {
            name: 'delegator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'validator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'amount',
            type: jsAmino.Types.Struct,
        },
    ]),
    'cosmos-sdk/MsgUndelegate': jsAmino.TypeFactory.create('MsgUndelegate', [
        {
            name: 'delegator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'validator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'amount',
            type: jsAmino.Types.Struct,
        },
    ]),
    'cosmos-sdk/MsgBeginRedelegate': jsAmino.TypeFactory.create('MsgBeginRedelegate', [
        {
            name: 'delegator_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'validator_src_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'validator_dst_address',
            type: jsAmino.Types.String,
        },
        {
            name: 'amount',
            type: jsAmino.Types.Struct,
        },
    ]),
};
Object.keys(Codec$4).forEach(codec => registerConcrete(codec, Codec$4[codec]));

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
        const msg = new Codec$4[_types$4.DelegateMsgType](delegator, validator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeUndelegateMsg(delegator, validator, amount) {
        const msg = new Codec$4[_types$4.UndelegateMsgType](delegator, validator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeBeginRedelegateMsg(delegator, srcValidator, dstValidator, amount) {
        const msg = new Codec$4[_types$4.BeginRedelegateMsgType](delegator, srcValidator, dstValidator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeCreateValidatorMsg(description, commission, minSelfDelegation, delegator, validator, pubkey, value) {
        let desc = new Codec$4[_types$4.Description](description.moniker, description.identity, description.website, description.securityContact, description.details);
        let comm = new Codec$4[_types$4.Commission](commission.rate, commission.maxRate, commission.maxChangeRate);
        const msg = new Codec$4[_types$4.CreateValidatorMsgType](desc, comm, minSelfDelegation, delegator, validator, pubkey, new Coin(value.denom, value.amount));
        return [msg];
    },
    makeEditValidatorMsg(description, address, commissionRate, minSelfDelegation) {
        let desc = new Codec$4[_types$4.Description](description.moniker, description.identity, description.website, description.securityContact, description.details);
        const msg = new Codec$4[_types$4.EditValidatorMsgType](desc, address, commissionRate, minSelfDelegation);
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

exports.Mele = Mele;
exports.Utils = index;
exports.KeyPairSigner = KeyPairSigner;
exports.MnemonicSigner = MnemonicSigner;
exports.DefaultSigner = DefaultSigner;
//# sourceMappingURL=mele-sdk.cjs.js.map
