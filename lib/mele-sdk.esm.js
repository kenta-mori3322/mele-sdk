import { Codec, TypeFactory, Types } from 'js-amino';
import bech32 from 'bech32';
import shajs from 'sha.js';
import util from 'util';
import buffer from 'buffer';
import readableStream from 'readable-stream';
import numberToBN from 'number-to-bn';
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
        QueryPath: 'control',
        ParametersPath: 'params',
        ExecutionsPath: 'executions',
        ExecutionPath: 'execution',
    };
})(Keys || (Keys = {}));
class ControlQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        const QueryPath = Keys.Query.QueryPath;
        const ParametersPath = Keys.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getExecutions() {
        const QueryPath = Keys.Query.QueryPath;
        const ExecutionsPath = Keys.Query.ExecutionsPath;
        return this._transport.query([], '', QueryPath, ExecutionsPath);
    }
    getExecution(id) {
        const QueryPath = Keys.Query.QueryPath;
        const ExecutionPath = Keys.Query.ExecutionPath;
        return this._transport.query([], JSON.stringify({
            ExecutionID: id,
        }), QueryPath, ExecutionPath);
    }
}

var Keys$1;
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
        BurnedPoolPath: 'burned_pool',
    };
})(Keys$1 || (Keys$1 = {}));
class DistributionQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        const QueryPath = Keys$1.Query.QueryPath;
        const ParametersPath = Keys$1.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getValidatorOutstandingRewards(validator) {
        const QueryPath = Keys$1.Query.QueryPath;
        const ValidatorOutstandingRewardsPath = Keys$1.Query.ValidatorOutstandingRewardsPath;
        return this._transport.query([], JSON.stringify({ validator_address: validator }), QueryPath, ValidatorOutstandingRewardsPath);
    }
    getValidatorCommission(validator) {
        const QueryPath = Keys$1.Query.QueryPath;
        const ValidatorCommissionPath = Keys$1.Query.ValidatorCommissionPath;
        return this._transport.query([], JSON.stringify({ validator_address: validator }), QueryPath, ValidatorCommissionPath);
    }
    getValidatorSlashes(validator, startHeight, endHeight) {
        const QueryPath = Keys$1.Query.QueryPath;
        const ValidatorSlashesPath = Keys$1.Query.ValidatorSlashesPath;
        return this._transport.query([], JSON.stringify({
            validator_address: validator,
            starting_height: startHeight,
            ending_height: endHeight,
        }), QueryPath, ValidatorSlashesPath);
    }
    getDelegationRewards(delegator, validator) {
        const QueryPath = Keys$1.Query.QueryPath;
        const DelegationRewardsPath = Keys$1.Query.DelegationRewardsPath;
        return this._transport.query([], JSON.stringify({ delegator_address: delegator, validator_address: validator }), QueryPath, DelegationRewardsPath);
    }
    getDelegatorTotalRewards(delegator) {
        const QueryPath = Keys$1.Query.QueryPath;
        const DelegatorTotalRewardsPath = Keys$1.Query.DelegatorTotalRewardsPath;
        return this._transport.query([], JSON.stringify({ delegator_address: delegator }), QueryPath, DelegatorTotalRewardsPath);
    }
    getDelegatorValidators(delegator) {
        const QueryPath = Keys$1.Query.QueryPath;
        const DelegatorValidatorsPath = Keys$1.Query.DelegatorValidatorsPath;
        return this._transport.query([], JSON.stringify({ delegator_address: delegator }), QueryPath, DelegatorValidatorsPath);
    }
    getWithdrawAddress(delegator) {
        const QueryPath = Keys$1.Query.QueryPath;
        const WithdrawAddrPath = Keys$1.Query.WithdrawAddrPath;
        return this._transport.query([], JSON.stringify({ delegator_address: delegator }), QueryPath, WithdrawAddrPath);
    }
    getCommunityPool() {
        const QueryPath = Keys$1.Query.QueryPath;
        const CommunityPoolPath = Keys$1.Query.CommunityPoolPath;
        return this._transport.query([], '', QueryPath, CommunityPoolPath);
    }
    getBurnedPool() {
        const QueryPath = Keys$1.Query.QueryPath;
        const BurnedPoolPath = Keys$1.Query.BurnedPoolPath;
        return this._transport.query([], '', QueryPath, BurnedPoolPath);
    }
}

var Keys$2;
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
})(Keys$2 || (Keys$2 = {}));
class GovQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            const QueryPath = Keys$2.Query.QueryPath;
            const ParametersPath = Keys$2.Query.ParametersPath;
            const ParamDepositPath = Keys$2.Query.ParamDepositPath;
            const ParamVotingPath = Keys$2.Query.ParamVotingPath;
            const ParamTallyingPath = Keys$2.Query.ParamTallyingPath;
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
        const QueryPath = Keys$2.Query.QueryPath;
        const ProposalsPath = Keys$2.Query.ProposalsPath;
        return this._transport.query([], JSON.stringify({
            Page: String(page),
            Limit: String(limit),
            Voter: voter,
            Depositor: depositor,
            ProposalStatus: status,
        }), QueryPath, ProposalsPath);
    }
    getProposal(id) {
        const QueryPath = Keys$2.Query.QueryPath;
        const ProposalPath = Keys$2.Query.ProposalPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
        }), QueryPath, ProposalPath);
    }
    getDeposits(id) {
        const QueryPath = Keys$2.Query.QueryPath;
        const DepositsPath = Keys$2.Query.DepositsPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
        }), QueryPath, DepositsPath);
    }
    getDeposit(id, depositor) {
        const QueryPath = Keys$2.Query.QueryPath;
        const DepositPath = Keys$2.Query.DepositPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
            Depositor: depositor,
        }), QueryPath, DepositPath);
    }
    getVotes(id, page = 1, limit = 100) {
        const QueryPath = Keys$2.Query.QueryPath;
        const VotesPath = Keys$2.Query.VotesPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
            Page: String(page),
            Limit: String(limit),
        }), QueryPath, VotesPath);
    }
    getVote(id, voter) {
        const QueryPath = Keys$2.Query.QueryPath;
        const VotePath = Keys$2.Query.VotePath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
            Voter: voter,
        }), QueryPath, VotePath);
    }
    getTally(id) {
        const QueryPath = Keys$2.Query.QueryPath;
        const TallyPath = Keys$2.Query.TallyPath;
        return this._transport.query([], JSON.stringify({
            ProposalID: id,
        }), QueryPath, TallyPath);
    }
}

var Keys$3;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'mint',
        ParametersPath: 'parameters',
        InflationPath: 'inflation',
        AnnualProvisionsPath: 'annual_provisions',
    };
})(Keys$3 || (Keys$3 = {}));
class MintQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        const QueryPath = Keys$3.Query.QueryPath;
        const ParametersPath = Keys$3.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getInflation() {
        const QueryPath = Keys$3.Query.QueryPath;
        const InflationPath = Keys$3.Query.InflationPath;
        return this._transport.query([], '', QueryPath, InflationPath);
    }
    getAnnualProvisions() {
        const QueryPath = Keys$3.Query.QueryPath;
        const AnnualProvisionsPath = Keys$3.Query.AnnualProvisionsPath;
        return this._transport.query([], '', QueryPath, AnnualProvisionsPath);
    }
}

var Keys$4;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'slashing',
        ParametersPath: 'parameters',
        SigningInfoPath: 'signingInfo',
        SigningInfosPath: 'signingInfos',
    };
})(Keys$4 || (Keys$4 = {}));
class SlashingQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        const QueryPath = Keys$4.Query.QueryPath;
        const ParametersPath = Keys$4.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getSigningInfo(consAddress) {
        const QueryPath = Keys$4.Query.QueryPath;
        const SigningInfoPath = Keys$4.Query.SigningInfoPath;
        return this._transport.query([], JSON.stringify({
            ConsAddress: consAddress,
        }), QueryPath, SigningInfoPath);
    }
    getSigningInfos() {
        const QueryPath = Keys$4.Query.QueryPath;
        const SigningInfosPath = Keys$4.Query.SigningInfosPath;
        return this._transport.query([], JSON.stringify({
            Page: '1',
            Limit: '0',
        }), QueryPath, SigningInfosPath);
    }
}

var Keys$5;
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
})(Keys$5 || (Keys$5 = {}));
class StakingQuery {
    constructor(transport, mint) {
        this._transport = transport;
        this._mint = mint;
    }
    getValidators() {
        const QueryPath = Keys$5.Query.QueryPath;
        const ValidatorsPath = Keys$5.Query.ValidatorsPath;
        return this._transport.query([], JSON.stringify({
            Status: 'Bonded',
            Page: '1',
            Limit: '1000',
        }), QueryPath, ValidatorsPath);
    }
    getValidator(address) {
        const QueryPath = Keys$5.Query.QueryPath;
        const ValidatorPath = Keys$5.Query.ValidatorPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorPath);
    }
    getValidatorDelegations(address) {
        const QueryPath = Keys$5.Query.QueryPath;
        const ValidatorDelegationsPath = Keys$5.Query.ValidatorDelegationsPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorDelegationsPath);
    }
    getValidatorUnbondingDelegations(address) {
        const QueryPath = Keys$5.Query.QueryPath;
        const ValidatorUnbondingDelegationsPath = Keys$5.Query.ValidatorUnbondingDelegationsPath;
        return this._transport.query([], JSON.stringify({ ValidatorAddr: address }), QueryPath, ValidatorUnbondingDelegationsPath);
    }
    getDelegation(delegatorAddress, validatorAddress) {
        const QueryPath = Keys$5.Query.QueryPath;
        const DelegationPath = Keys$5.Query.DelegationPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, DelegationPath);
    }
    getUnbondingDelegation(delegatorAddress, validatorAddress) {
        const QueryPath = Keys$5.Query.QueryPath;
        const UnbondingDelegationPath = Keys$5.Query.UnbondingDelegationPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, UnbondingDelegationPath);
    }
    getDelegatorDelegations(delegatorAddress) {
        const QueryPath = Keys$5.Query.QueryPath;
        const DelegatorDelegationsPath = Keys$5.Query.DelegatorDelegationsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorDelegationsPath);
    }
    getDelegatorUnbondingDelegations(delegatorAddress) {
        const QueryPath = Keys$5.Query.QueryPath;
        const DelegatorUnbondingDelegationsPath = Keys$5.Query.DelegatorUnbondingDelegationsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorUnbondingDelegationsPath);
    }
    getRedelegations(delegatorAddress, srcValidatorAddress, dstValidatorAddress) {
        const QueryPath = Keys$5.Query.QueryPath;
        const RedelegationsPath = Keys$5.Query.RedelegationsPath;
        return this._transport.query([], JSON.stringify({
            DelegatorAddr: delegatorAddress,
            SrcValidatorAddr: srcValidatorAddress,
            DstValidatorAddr: dstValidatorAddress,
        }), QueryPath, RedelegationsPath);
    }
    getDelegatorValidators(delegatorAddress) {
        const QueryPath = Keys$5.Query.QueryPath;
        const DelegatorValidatorsPath = Keys$5.Query.DelegatorValidatorsPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress }), QueryPath, DelegatorValidatorsPath);
    }
    getDelegatorValidator(delegatorAddress, validatorAddress) {
        const QueryPath = Keys$5.Query.QueryPath;
        const DelegatorValidatorPath = Keys$5.Query.DelegatorValidatorPath;
        return this._transport.query([], JSON.stringify({ DelegatorAddr: delegatorAddress, ValidatorAddr: validatorAddress }), QueryPath, DelegatorValidatorPath);
    }
    getHistoricalInfo(height) {
        const QueryPath = Keys$5.Query.QueryPath;
        const HistoricalInfoPath = Keys$5.Query.HistoricalInfoPath;
        return this._transport.query([], JSON.stringify({ Height: String(height) }), QueryPath, HistoricalInfoPath);
    }
    getParameters() {
        const QueryPath = Keys$5.Query.QueryPath;
        const ParametersPath = Keys$5.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getPool() {
        const QueryPath = Keys$5.Query.QueryPath;
        const PoolPath = Keys$5.Query.PoolPath;
        return this._transport.query([], '', QueryPath, PoolPath);
    }
    getRewardRate() {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield this.getPool();
            let inflation = yield this._mint.getInflation();
            let mintParams = yield this._mint.getParameters();
            inflation = Number(inflation) * (1 + Number(mintParams.inflation_rate_change || 0));
            let rRate = ((Number(pool.not_bonded_tokens) + Number(pool.bonded_tokens)) * Number(inflation)) /
                Number(pool.bonded_tokens);
            return rRate;
        });
    }
}

var Keys$6;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'supply',
        TotalSupplyPath: 'total_supply',
    };
})(Keys$6 || (Keys$6 = {}));
class SupplyQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getTotalSupply() {
        const QueryPath = Keys$6.Query.QueryPath;
        const TotalSupplyPath = Keys$6.Query.TotalSupplyPath;
        return this._transport.query([], JSON.stringify({
            Page: '1',
            Limit: '0',
        }), QueryPath, TotalSupplyPath);
    }
}

var Keys$7;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'treasury',
        ParametersPath: 'parameters',
        TreasuryPath: 'treasury',
        OperatorsPath: 'operators',
        DisbursementsPath: 'disbursements',
        BurnsPath: 'burns',
    };
})(Keys$7 || (Keys$7 = {}));
class TreasuryQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getParameters() {
        const QueryPath = Keys$7.Query.QueryPath;
        const ParametersPath = Keys$7.Query.ParametersPath;
        return this._transport.query([], '', QueryPath, ParametersPath);
    }
    getTreasury() {
        const QueryPath = Keys$7.Query.QueryPath;
        const TreasuryPath = Keys$7.Query.TreasuryPath;
        return this._transport.query([], '', QueryPath, TreasuryPath);
    }
    getOperators() {
        const QueryPath = Keys$7.Query.QueryPath;
        const OperatorsPath = Keys$7.Query.OperatorsPath;
        return this._transport.query([], '', QueryPath, OperatorsPath);
    }
    getDisbursements() {
        const QueryPath = Keys$7.Query.QueryPath;
        const DisbursementsPath = Keys$7.Query.DisbursementsPath;
        return this._transport.query([], '', QueryPath, DisbursementsPath);
    }
    getBurns() {
        const QueryPath = Keys$7.Query.QueryPath;
        const BurnsPath = Keys$7.Query.BurnsPath;
        return this._transport.query([], '', QueryPath, BurnsPath);
    }
}

var Keys$8;
(function (Keys) {
    Keys.Query = {
        QueryPath: 'upgrade',
        CurrentPath: 'current',
        AppliedPath: 'applied',
    };
})(Keys$8 || (Keys$8 = {}));
class UpgradeQuery {
    constructor(transport) {
        this._transport = transport;
    }
    getCurrent() {
        const QueryPath = Keys$8.Query.QueryPath;
        const CurrentPath = Keys$8.Query.CurrentPath;
        return this._transport.query([], '', QueryPath, CurrentPath);
    }
    getApplied(name) {
        const QueryPath = Keys$8.Query.QueryPath;
        const AppliedPath = Keys$8.Query.AppliedPath;
        return this._transport.query([], JSON.stringify({
            Name: name
        }), QueryPath, AppliedPath);
    }
}

var Keys$9;
(function (Keys) {
    Keys.Query = {
        AuthModuleQueryPath: 'acc',
        AccountPath: 'account',
    };
})(Keys$9 || (Keys$9 = {}));
class Query {
    constructor(transport) {
        this._transport = transport;
        this._mint = new MintQuery(this._transport);
        this._staking = new StakingQuery(this._transport, this._mint);
        this._slashing = new SlashingQuery(this._transport);
        this._distribution = new DistributionQuery(this._transport);
        this._gov = new GovQuery(this._transport);
        this._treasury = new TreasuryQuery(this._transport);
        this._control = new ControlQuery(this._transport);
        this._supply = new SupplyQuery(this._transport);
        this._upgrade = new UpgradeQuery(this._transport);
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
    get mint() {
        return this._mint;
    }
    get treasury() {
        return this._treasury;
    }
    get control() {
        return this._control;
    }
    get supply() {
        return this._supply;
    }
    get upgrade() {
        return this._upgrade;
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
        const AuthModuleQueryPath = Keys$9.Query.AuthModuleQueryPath;
        const AccountPath = Keys$9.Query.AccountPath;
        return this._transport.query([], JSON.stringify({ Address: address }), AuthModuleQueryPath, AccountPath);
    }
    getAccSignInfo(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let accountInfo = yield this.getAccountInfo(address);
            let accSignInfo;
            if ('address' in accountInfo.value) {
                accSignInfo = {
                    address: accountInfo.value.address,
                    accountNumber: accountInfo.value.account_number,
                    sequence: accountInfo.value.sequence,
                };
            }
            else {
                accSignInfo = {
                    address: accountInfo.value.BaseVestingAccount.BaseAccount.address,
                    accountNumber: accountInfo.value.BaseVestingAccount.BaseAccount.account_number,
                    sequence: accountInfo.value.BaseVestingAccount.BaseAccount.sequence,
                };
            }
            return accSignInfo;
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

var bn = createCommonjsModule(function (module) {
(function (module, exports) {

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    Buffer = buffer.Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) ; else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      if (r.strip !== undefined) {
        // r is BN v4 instance
        r.strip();
      } else {
        // r is BN v5 instance
        r._strip();
      }
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})(module, commonjsGlobal);
});

const zero = new bn(0);
const negative1 = new bn(-1);
const smallestDenom = 'umelc';
const smallestStableDenom = 'umelg';
const unitMapMelc = {
    umelc: '1',
    melc: '1000000000',
};
const unitMapMelg = {
    umelg: '1',
    melg: '1000000000',
};
function fromUmelc(input, unit = 'melc') {
    if (!bn.isBN(input) && typeof input !== 'string') {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }
    if (typeof unit !== 'string') {
        throw new Error('Invalid unit.');
    }
    return _fromUmelc(input, unit);
}
function toUmelc(input, unit = 'melc') {
    if (!bn.isBN(input) && typeof input !== 'string') {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }
    if (typeof unit !== 'string') {
        throw new Error('Invalid unit.');
    }
    return bn.isBN(input) ? _toUmelc(input, unit) : _toUmelc(input, unit).toString(10);
}
function _fromUmelc(umelcInput, unit) {
    unit = unit.toLowerCase();
    if (!unitMapMelc[unit]) {
        throw new Error('Invalid unit.');
    }
    let umelc = numberToBN(umelcInput);
    let negative = umelc.lt(zero);
    const base = getValueOfUnit(unit);
    const baseLength = unitMapMelc[unit].length - 1 || 1;
    if (negative) {
        umelc = umelc.mul(negative1);
    }
    let fraction = umelc.mod(base).toString(10);
    while (fraction.length < baseLength) {
        fraction = `0${fraction}`;
    }
    let match = fraction.match(/^([0-9]*[1-9]|0)(0*)/);
    if (match && match.length >= 2)
        fraction = match[1];
    let whole = umelc.div(base).toString(10);
    let value = `${whole}${fraction == '0' ? '' : `.${fraction}`}`;
    if (negative) {
        value = `-${value}`;
    }
    return value;
}
function _toUmelc(melcInput, unit) {
    unit = unit.toLowerCase();
    if (!unitMapMelc[unit]) {
        throw new Error('Invalid unit.');
    }
    let melc = numberToString(melcInput);
    const base = getValueOfUnit(unit);
    const baseLength = unitMapMelc[unit].length - 1 || 1;
    let negative = melc.substring(0, 1) === '-';
    if (negative) {
        melc = melc.substring(1);
    }
    if (melc === '.') {
        throw new Error(`[mele-sdk] while converting number ${melcInput} to umelc, invalid value`);
    }
    let comps = melc.split('.');
    if (comps.length > 2) {
        throw new Error(`[mele-sdk] while converting number ${melc} to umelc, too many decimal points`);
    }
    let whole = comps[0];
    let fraction = comps[1];
    if (!whole) {
        whole = '0';
    }
    if (!fraction) {
        fraction = '0';
    }
    if (fraction.length > baseLength) {
        throw new Error(`[mele-sdk] while converting number ${melcInput} to umelc, too many decimal places`);
    }
    while (fraction.length < baseLength) {
        fraction += '0';
    }
    let wholeBN = new bn(whole);
    let fractionBN = new bn(fraction);
    let umelc = wholeBN.mul(base).add(fractionBN);
    if (negative) {
        umelc = umelc.mul(negative1);
    }
    return new bn(umelc.toString(10), 10);
}
function fromUmelg(input, unit = 'melg') {
    if (!bn.isBN(input) && typeof input !== 'string') {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }
    if (typeof unit !== 'string') {
        throw new Error('Invalid unit.');
    }
    return _fromUmelg(input, unit);
}
function toUmelg(input, unit = 'melg') {
    if (!bn.isBN(input) && typeof input !== 'string') {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }
    if (typeof unit !== 'string') {
        throw new Error('Invalid unit.');
    }
    return bn.isBN(input) ? _toUmelg(input, unit) : _toUmelg(input, unit).toString(10);
}
function _fromUmelg(umelgInput, unit) {
    unit = unit.toLowerCase();
    if (!unitMapMelg[unit]) {
        throw new Error('Invalid unit.');
    }
    let umelg = numberToBN(umelgInput);
    let negative = umelg.lt(zero);
    const base = getValueOfUnitUmelg(unit);
    const baseLength = unitMapMelg[unit].length - 1 || 1;
    if (negative) {
        umelg = umelg.mul(negative1);
    }
    let fraction = umelg.mod(base).toString(10);
    while (fraction.length < baseLength) {
        fraction = `0${fraction}`;
    }
    let match = fraction.match(/^([0-9]*[1-9]|0)(0*)/);
    if (match && match.length >= 2)
        fraction = match[1];
    let whole = umelg.div(base).toString(10);
    let value = `${whole}${fraction == '0' ? '' : `.${fraction}`}`;
    if (negative) {
        value = `-${value}`;
    }
    return value;
}
function _toUmelg(melgInput, unit) {
    unit = unit.toLowerCase();
    if (!unitMapMelg[unit]) {
        throw new Error('Invalid unit.');
    }
    let melg = numberToString(melgInput);
    const base = getValueOfUnitUmelg(unit);
    const baseLength = unitMapMelg[unit].length - 1 || 1;
    let negative = melg.substring(0, 1) === '-';
    if (negative) {
        melg = melg.substring(1);
    }
    if (melg === '.') {
        throw new Error(`[mele-sdk] while converting number ${melgInput} to umelg, invalid value`);
    }
    let comps = melg.split('.');
    if (comps.length > 2) {
        throw new Error(`[mele-sdk] while converting number ${melgInput} to umelg,  too many decimal points`);
    }
    let whole = comps[0];
    let fraction = comps[1];
    if (!whole) {
        whole = '0';
    }
    if (!fraction) {
        fraction = '0';
    }
    if (fraction.length > baseLength) {
        throw new Error(`[mele-sdk] while converting number ${melgInput} to umelg, too many decimal places`);
    }
    while (fraction.length < baseLength) {
        fraction += '0';
    }
    let wholeBN = new bn(whole);
    let fractionBN = new bn(fraction);
    let umelg = wholeBN.mul(base).add(fractionBN);
    if (negative) {
        umelg = umelg.mul(negative1);
    }
    return new bn(umelg.toString(10), 10);
}
function getValueOfUnit(unitInput) {
    const unit = unitInput ? unitInput.toLowerCase() : 'melc';
    let unitValue = unitMapMelc[unit];
    return new bn(unitValue, 10);
}
function getValueOfUnitUmelg(unitInput) {
    const unit = unitInput ? unitInput.toLowerCase() : 'melg';
    let unitValue = unitMapMelg[unit];
    return new bn(unitValue, 10);
}
function numberToString(arg) {
    if (typeof arg === 'string') {
        if (!arg.match(/^-?[0-9.]+$/)) {
            throw new Error(`while converting number to string, invalid number value '${arg}', should be a number matching (^-?[0-9.]+).`);
        }
        return arg;
    }
    else if (typeof arg === 'number') {
        return String(arg);
    }
    else if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
        if (arg.toPrecision) {
            return String(arg.toPrecision());
        }
        else {
            return arg.toString(10);
        }
    }
    throw new Error(`while converting number to string, invalid number value '${arg}' type ${typeof arg}.`);
}

const ec$1 = new ec('secp256k1');
function generateMnemonic$1() {
    return generateMnemonic();
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
function convertValidatorPubKey(pubkey) {
    let pubkeyAminoPrefix = Buffer.from('1624DE6420', 'hex');
    let buffer$$1 = Buffer.from(bech32.fromWords(bech32.decode(pubkey).words));
    let key = buffer$$1.slice(pubkeyAminoPrefix.length);
    const hashResult = shajs('sha256').update(key).digest('hex');
    return hashResult.slice(0, 40).toUpperCase();
}

var index = /*#__PURE__*/Object.freeze({
    fromUmelg: fromUmelg,
    fromUmelc: fromUmelc,
    smallestDenom: smallestDenom,
    smallestStableDenom: smallestStableDenom,
    toUmelg: toUmelg,
    toUmelc: toUmelc,
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
    promisify: promisify,
    convertValidatorPubKey: convertValidatorPubKey
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
    'treasury/MintTreasurySupplyProposal': TypeFactory.create('MintTreasurySupplyProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'treasury/BurnTreasurySupplyProposal': TypeFactory.create('BurnTreasurySupplyProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'cosmos-sdk/SoftwareUpgradeProposal': TypeFactory.create('SoftwareUpgradeProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
        {
            name: 'plan',
            type: Types.Struct,
        },
    ]),
    UpgradePlan: TypeFactory.create('UpgradePlan', [
        {
            name: 'name',
            type: Types.String,
        },
        {
            name: 'height',
            type: Types.Int64,
        },
        {
            name: 'planInfo',
            type: Types.String,
        },
    ]),
    'cosmos-sdk/CancelSoftwareUpgradeProposal': TypeFactory.create('CancelSoftwareUpgradeProposal', [
        {
            name: 'title',
            type: Types.String,
        },
        {
            name: 'description',
            type: Types.String,
        },
    ]),
};
Object.keys(Codec$2).forEach(codec => registerConcrete(codec, Codec$2[codec]));

const Codec$3 = {
    'cosmos-sdk/MsgSubmitExecution': TypeFactory.create('MsgSubmitExecution', [
        {
            name: 'content',
            type: Types.Interface,
        },
        {
            name: 'executor',
            type: Types.String,
        },
    ]),
};
Object.keys(Codec$3).forEach(codec => registerConcrete(codec, Codec$3[codec]));

const _types$1 = {
    SubmitExecutionMsgType: 'cosmos-sdk/MsgSubmitExecution',
    TextProposalMsgType: 'cosmos-sdk/TextProposal',
    ParameterChangeProposalMsgType: 'cosmos-sdk/ParameterChangeProposal',
    CommunityPoolSpendProposalMsgType: 'cosmos-sdk/CommunityPoolSpendProposal',
    BurnedPoolSpendProposalMsgType: 'cosmos-sdk/BurnedPoolSpendProposal',
    MintTreasurySupplyProposalMsgType: 'treasury/MintTreasurySupplyProposal',
    BurnTreasurySupplyProposalMsgType: 'treasury/BurnTreasurySupplyProposal',
    SoftwareUpgradeProposalMsgType: 'cosmos-sdk/SoftwareUpgradeProposal',
    CancelSoftwareUpgradeProposalMsgType: 'cosmos-sdk/CancelSoftwareUpgradeProposal',
};
const Msgs$1 = {
    makeSubmitExecutionMsg(executor, content) {
        const msg = new Codec$3[_types$1.SubmitExecutionMsgType](content, executor);
        return [msg];
    },
    makeTextProposal(proposer, title, description) {
        const content = new Codec$2[_types$1.TextProposalMsgType](title, description);
        return this.makeSubmitExecutionMsg(proposer, content);
    },
    makeParameterChangeProposal(proposer, title, description, changes) {
        const codecChanges = changes.map(change => new Codec$2['ParamChange'](change.subspace, change.key, change.value));
        const content = new Codec$2[_types$1.ParameterChangeProposalMsgType](title, description, codecChanges);
        return this.makeSubmitExecutionMsg(proposer, content);
    },
    makeCommunityPoolSpendProposal(proposer, title, description, recipient, amount) {
        const content = new Codec$2[_types$1.CommunityPoolSpendProposalMsgType](title, description, recipient, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitExecutionMsg(proposer, content);
    },
    makeBurnedPoolSpendProposal(proposer, title, description, recipient, amount) {
        const content = new Codec$2[_types$1.BurnedPoolSpendProposalMsgType](title, description, recipient, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitExecutionMsg(proposer, content);
    },
    makeMintTreasurySupplyProposal(proposer, title, description, amount) {
        const content = new Codec$2[_types$1.MintTreasurySupplyProposalMsgType](title, description, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitExecutionMsg(proposer, content);
    },
    makeBurnTreasurySupplyProposal(proposer, title, description, amount) {
        const content = new Codec$2[_types$1.BurnTreasurySupplyProposalMsgType](title, description, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitExecutionMsg(proposer, content);
    },
    makeSoftwareUpgradeProposal(proposer, title, description, plan) {
        const cPlan = new Codec$2['UpgradePlan'](plan.name, plan.height, plan.info);
        const content = new Codec$2[_types$1.SoftwareUpgradeProposalMsgType](title, description, cPlan);
        return this.makeSubmitExecutionMsg(proposer, content);
    },
    makeCancelSoftwareUpgradeProposal(proposer, title, description) {
        const content = new Codec$2[_types$1.CancelSoftwareUpgradeProposalMsgType](title, description);
        return this.makeSubmitExecutionMsg(proposer, content);
    },
};
class Control extends TransactionApi {
    submitTextProposal(title, description) {
        const msgs = Msgs$1.makeTextProposal(this.broadcast.signer.getAddress(), title, description);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitParameterChangeProposal(title, description, changes) {
        const msgs = Msgs$1.makeParameterChangeProposal(this.broadcast.signer.getAddress(), title, description, changes);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitCommunityPoolSpendProposal(title, description, recipient, amount) {
        const msgs = Msgs$1.makeCommunityPoolSpendProposal(this.broadcast.signer.getAddress(), title, description, recipient, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitBurnedPoolSpendProposal(title, description, recipient, amount) {
        const msgs = Msgs$1.makeBurnedPoolSpendProposal(this.broadcast.signer.getAddress(), title, description, recipient, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitMintTreasurySupplyProposal(title, description, amount) {
        const msgs = Msgs$1.makeMintTreasurySupplyProposal(this.broadcast.signer.getAddress(), title, description, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitBurnTreasurySupplyProposal(title, description, amount) {
        const msgs = Msgs$1.makeBurnTreasurySupplyProposal(this.broadcast.signer.getAddress(), title, description, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitSoftwareUpgradeProposal(title, description, plan) {
        const msgs = Msgs$1.makeSoftwareUpgradeProposal(this.broadcast.signer.getAddress(), title, description, plan);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitCancelSoftwareUpgradeProposal(title, description) {
        const msgs = Msgs$1.makeCancelSoftwareUpgradeProposal(this.broadcast.signer.getAddress(), title, description);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$4 = {
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
    'cosmos-sdk/MsgFundCommunityPool': TypeFactory.create('MsgFundCommunityPool', [
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
        {
            name: 'depositor',
            type: Types.String,
        },
    ]),
};
Object.keys(Codec$4).forEach(codec => registerConcrete(codec, Codec$4[codec]));

const _types$2 = {
    WithdrawDelegationRewardMsgType: 'cosmos-sdk/MsgWithdrawDelegationReward',
    WithdrawValidatorCommissionMsgType: 'cosmos-sdk/MsgWithdrawValidatorCommission',
    ModifyWithdrawAddressMsgType: 'cosmos-sdk/MsgModifyWithdrawAddress',
    FundCommunityPoolMsgType: 'cosmos-sdk/MsgFundCommunityPool',
};
const Msgs$2 = {
    makeWithdrawDelegationRewardMsg(delegator, validator) {
        const msg = new Codec$4[_types$2.WithdrawDelegationRewardMsgType](delegator, validator);
        return [msg];
    },
    makeWithdrawValidatorCommissionMsg(validator) {
        const msg = new Codec$4[_types$2.WithdrawValidatorCommissionMsgType](validator);
        return [msg];
    },
    makeModifyWithdrawAddressMsg(delegator, withdrawAddress) {
        const msg = new Codec$4[_types$2.ModifyWithdrawAddressMsgType](delegator, withdrawAddress);
        return [msg];
    },
    makeFundCommunityPool(amount, depositor) {
        const msg = new Codec$4[_types$2.FundCommunityPoolMsgType](amount.map(am => new Coin(am.denom, am.amount)), depositor);
        return [msg];
    },
};
class Distribution extends TransactionApi {
    withdrawDelegationReward(validator) {
        const msgs = Msgs$2.makeWithdrawDelegationRewardMsg(this.broadcast.signer.getAddress(), validator);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    withdrawValidatorCommission(validator) {
        const msgs = Msgs$2.makeWithdrawValidatorCommissionMsg(validator);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    modifyWithdrawAddress(withdrawAddress) {
        const msgs = Msgs$2.makeModifyWithdrawAddressMsg(this.broadcast.signer.getAddress(), withdrawAddress);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    fundCommunityPool(amount) {
        const msgs = Msgs$2.makeFundCommunityPool(amount, this.broadcast.signer.getAddress());
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const _types$3 = {
    SubmitProposalMsgType: 'cosmos-sdk/MsgSubmitProposal',
    DepositMsgType: 'cosmos-sdk/MsgDeposit',
    VoteMsgType: 'cosmos-sdk/MsgVote',
    TextProposalMsgType: 'cosmos-sdk/TextProposal',
    ParameterChangeProposalMsgType: 'cosmos-sdk/ParameterChangeProposal',
    CommunityPoolSpendProposalMsgType: 'cosmos-sdk/CommunityPoolSpendProposal',
    BurnedPoolSpendProposalMsgType: 'cosmos-sdk/BurnedPoolSpendProposal',
    MintTreasurySupplyProposalMsgType: 'treasury/MintTreasurySupplyProposal',
    BurnTreasurySupplyProposalMsgType: 'treasury/BurnTreasurySupplyProposal',
    SoftwareUpgradeProposalMsgType: 'cosmos-sdk/SoftwareUpgradeProposal',
    CancelSoftwareUpgradeProposalMsgType: 'cosmos-sdk/CancelSoftwareUpgradeProposal',
};
const Msgs$3 = {
    makeSubmitProposalMsg(proposer, initialDeposit, content) {
        const msg = new Codec$2[_types$3.SubmitProposalMsgType](content, initialDeposit.map(am => new Coin(am.denom, am.amount)), proposer);
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
        const msg = new Codec$2[_types$3.VoteMsgType](proposalId, voter, numOption);
        return [msg];
    },
    makeDepositMsg(proposalId, depositor, amount) {
        const msg = new Codec$2[_types$3.DepositMsgType](proposalId, depositor, amount.map(am => new Coin(am.denom, am.amount)));
        return [msg];
    },
    makeTextProposal(proposer, initialDeposit, title, description) {
        const content = new Codec$2[_types$3.TextProposalMsgType](title, description);
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeParameterChangeProposal(proposer, initialDeposit, title, description, changes) {
        const codecChanges = changes.map(change => new Codec$2['ParamChange'](change.subspace, change.key, change.value));
        const content = new Codec$2[_types$3.ParameterChangeProposalMsgType](title, description, codecChanges);
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeCommunityPoolSpendProposal(proposer, initialDeposit, title, description, recipient, amount) {
        const content = new Codec$2[_types$3.CommunityPoolSpendProposalMsgType](title, description, recipient, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeBurnedPoolSpendProposal(proposer, initialDeposit, title, description, recipient, amount) {
        const content = new Codec$2[_types$3.BurnedPoolSpendProposalMsgType](title, description, recipient, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeMintTreasurySupplyProposal(proposer, initialDeposit, title, description, amount) {
        const content = new Codec$2[_types$3.MintTreasurySupplyProposalMsgType](title, description, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeBurnTreasurySupplyProposal(proposer, initialDeposit, title, description, amount) {
        const content = new Codec$2[_types$3.BurnTreasurySupplyProposalMsgType](title, description, amount.map(am => new Coin(am.denom, am.amount)));
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeSoftwareUpgradeProposal(proposer, initialDeposit, title, description, plan) {
        const cPlan = new Codec$2['UpgradePlan'](plan.name, plan.height, plan.info);
        const content = new Codec$2[_types$3.SoftwareUpgradeProposalMsgType](title, description, cPlan);
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
    makeCancelSoftwareUpgradeProposal(proposer, initialDeposit, title, description) {
        const content = new Codec$2[_types$3.CancelSoftwareUpgradeProposalMsgType](title, description);
        return this.makeSubmitProposalMsg(proposer, initialDeposit, content);
    },
};
class Gov extends TransactionApi {
    vote(proposalId, option) {
        const msgs = Msgs$3.makeVoteMsg(proposalId, this.broadcast.signer.getAddress(), option);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    deposit(proposalId, amount) {
        const msgs = Msgs$3.makeDepositMsg(proposalId, this.broadcast.signer.getAddress(), amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitTextProposal(initialDeposit, title, description) {
        const msgs = Msgs$3.makeTextProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitParameterChangeProposal(initialDeposit, title, description, changes) {
        const msgs = Msgs$3.makeParameterChangeProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, changes);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitCommunityPoolSpendProposal(initialDeposit, title, description, recipient, amount) {
        const msgs = Msgs$3.makeCommunityPoolSpendProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, recipient, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitBurnedPoolSpendProposal(initialDeposit, title, description, recipient, amount) {
        const msgs = Msgs$3.makeBurnedPoolSpendProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, recipient, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitMintTreasurySupplyProposal(initialDeposit, title, description, amount) {
        const msgs = Msgs$3.makeMintTreasurySupplyProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitBurnTreasurySupplyProposal(initialDeposit, title, description, amount) {
        const msgs = Msgs$3.makeBurnTreasurySupplyProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitSoftwareUpgradeProposal(initialDeposit, title, description, plan) {
        const msgs = Msgs$3.makeSoftwareUpgradeProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description, plan);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    submitCancelSoftwareUpgradeProposal(initialDeposit, title, description) {
        const msgs = Msgs$3.makeCancelSoftwareUpgradeProposal(this.broadcast.signer.getAddress(), initialDeposit, title, description);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$5 = {
    'cosmos-sdk/MsgUnjail': TypeFactory.create('MsgUnjail', [
        {
            name: 'address',
            type: Types.String,
        },
    ]),
};
Object.keys(Codec$5).forEach(codec => registerConcrete(codec, Codec$5[codec]));

const _types$4 = {
    UnjailMsgType: 'cosmos-sdk/MsgUnjail',
};
const Msgs$4 = {
    makeUnjailMsg(address) {
        const msg = new Codec$5[_types$4.UnjailMsgType](address);
        return [msg];
    },
};
class Slashing extends TransactionApi {
    unjail(address) {
        const msgs = Msgs$4.makeUnjailMsg(address);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$6 = {
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
Object.keys(Codec$6).forEach(codec => registerConcrete(codec, Codec$6[codec]));

const _types$5 = {
    CreateValidatorMsgType: 'cosmos-sdk/MsgCreateValidator',
    EditValidatorMsgType: 'cosmos-sdk/MsgEditValidator',
    DelegateMsgType: 'cosmos-sdk/MsgDelegate',
    UndelegateMsgType: 'cosmos-sdk/MsgUndelegate',
    BeginRedelegateMsgType: 'cosmos-sdk/MsgBeginRedelegate',
    Description: 'Description',
    Commission: 'Commission',
};
const Msgs$5 = {
    makeDelegateMsg(delegator, validator, amount) {
        const msg = new Codec$6[_types$5.DelegateMsgType](delegator, validator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeUndelegateMsg(delegator, validator, amount) {
        const msg = new Codec$6[_types$5.UndelegateMsgType](delegator, validator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeBeginRedelegateMsg(delegator, srcValidator, dstValidator, amount) {
        const msg = new Codec$6[_types$5.BeginRedelegateMsgType](delegator, srcValidator, dstValidator, new Coin(amount.denom, amount.amount));
        return [msg];
    },
    makeCreateValidatorMsg(description, commission, minSelfDelegation, delegator, validator, pubkey, value) {
        let desc = new Codec$6[_types$5.Description](description.moniker, description.identity, description.website, description.securityContact, description.details);
        let comm = new Codec$6[_types$5.Commission](commission.rate, commission.maxRate, commission.maxChangeRate);
        const msg = new Codec$6[_types$5.CreateValidatorMsgType](desc, comm, minSelfDelegation, delegator, validator, pubkey, new Coin(value.denom, value.amount));
        return [msg];
    },
    makeEditValidatorMsg(description, address, commissionRate, minSelfDelegation) {
        let desc = new Codec$6[_types$5.Description](description.moniker, description.identity, description.website, description.securityContact, description.details);
        const msg = new Codec$6[_types$5.EditValidatorMsgType](desc, address, commissionRate, minSelfDelegation);
        return [msg];
    },
};
class Staking extends TransactionApi {
    createValidator(description, commission, minSelfDelegation, delegator, validator, pubkey, value) {
        const msgs = Msgs$5.makeCreateValidatorMsg(description, commission, minSelfDelegation, this.broadcast.signer.getAddress(), validator, pubkey, value);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    editValidator(description, address, commissionRate, minSelfDelegation) {
        const msgs = Msgs$5.makeEditValidatorMsg(description, address, commissionRate, minSelfDelegation);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    delegate(validator, amount) {
        const msgs = Msgs$5.makeDelegateMsg(this.broadcast.signer.getAddress(), validator, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    undelegate(validator, amount) {
        const msgs = Msgs$5.makeUndelegateMsg(this.broadcast.signer.getAddress(), validator, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    beginRedelegate(srcValidator, dstValidator, amount) {
        const msgs = Msgs$5.makeBeginRedelegateMsg(this.broadcast.signer.getAddress(), srcValidator, dstValidator, amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
}

const Codec$7 = {
    'treasury/AddOperator': TypeFactory.create('AddOperator', [
        {
            name: 'sender',
            type: Types.String,
        },
        {
            name: 'operator',
            type: Types.String,
        },
    ]),
    'treasury/RemoveOperator': TypeFactory.create('RemoveOperator', [
        {
            name: 'sender',
            type: Types.String,
        },
        {
            name: 'operator',
            type: Types.String,
        },
    ]),
    'treasury/Disburse': TypeFactory.create('Disburse', [
        {
            name: 'operator',
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
        {
            name: 'reference',
            type: Types.String,
        },
    ]),
    'treasury/ApproveDisbursement': TypeFactory.create('ApproveDisbursement', [
        {
            name: 'manager',
            type: Types.String,
        },
        {
            name: 'recipient',
            type: Types.String,
        },
        {
            name: 'scheduled_for',
            type: Types.String,
        },
    ]),
    'treasury/CancelDisbursement': TypeFactory.create('CancelDisbursement', [
        {
            name: 'manager',
            type: Types.String,
        },
        {
            name: 'recipient',
            type: Types.String,
        },
        {
            name: 'scheduled_for',
            type: Types.String,
        },
    ]),
    'treasury/Burn': TypeFactory.create('Burn', [
        {
            name: 'operator',
            type: Types.String,
        },
        {
            name: 'amount',
            type: Types.ArrayStruct,
        },
    ]),
    'treasury/ApproveBurn': TypeFactory.create('ApproveBurn', [
        {
            name: 'manager',
            type: Types.String,
        },
        {
            name: 'scheduled_for',
            type: Types.String,
        },
    ]),
    'treasury/CancelBurn': TypeFactory.create('CancelBurn', [
        {
            name: 'manager',
            type: Types.String,
        },
        {
            name: 'scheduled_for',
            type: Types.String,
        },
    ]),
};
Object.keys(Codec$7).forEach(codec => registerConcrete(codec, Codec$7[codec]));

const _types$6 = {
    AddOperatorMsgType: 'treasury/AddOperator',
    RemoveOperatorMsgType: 'treasury/RemoveOperator',
    DisburseMsgType: 'treasury/Disburse',
    ApproveDisbursementMsgType: 'treasury/ApproveDisbursement',
    CancelDisbursementMsgType: 'treasury/CancelDisbursement',
    BurnMsgType: 'treasury/Burn',
    ApproveBurnMsgType: 'treasury/ApproveBurn',
    CancelBurnMsgType: 'treasury/CancelBurn',
};
const Msgs$6 = {
    makeAddOperatorMsg(sender, operator) {
        const msg = new Codec$7[_types$6.AddOperatorMsgType](sender, operator);
        return [msg];
    },
    makeRemoveOperatorMsg(sender, operator) {
        const msg = new Codec$7[_types$6.RemoveOperatorMsgType](sender, operator);
        return [msg];
    },
    makeDisburseMsg(operator, recipient, amount, reference) {
        const msg = new Codec$7[_types$6.DisburseMsgType](operator, recipient, amount.map(am => new Coin(am.denom, am.amount)), reference);
        return [msg];
    },
    makeApproveDisbursementMsg(mananger, recipient, scheduled_for) {
        const msg = new Codec$7[_types$6.ApproveDisbursementMsgType](mananger, recipient, scheduled_for);
        return [msg];
    },
    makeCancelDisbursementMsg(mananger, recipient, scheduled_for) {
        const msg = new Codec$7[_types$6.CancelDisbursementMsgType](mananger, recipient, scheduled_for);
        return [msg];
    },
    makeBurnMsg(operator, amount) {
        const msg = new Codec$7[_types$6.BurnMsgType](operator, amount.map(am => new Coin(am.denom, am.amount)));
        return [msg];
    },
    makeApproveBurnMsg(mananger, scheduled_for) {
        const msg = new Codec$7[_types$6.ApproveBurnMsgType](mananger, scheduled_for);
        return [msg];
    },
    makeCancelBurnMsg(mananger, scheduled_for) {
        const msg = new Codec$7[_types$6.CancelBurnMsgType](mananger, scheduled_for);
        return [msg];
    },
};
class Treasury extends TransactionApi {
    addOperator(operator) {
        const msgs = Msgs$6.makeAddOperatorMsg(this.broadcast.signer.getAddress(), operator);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    removeOperator(operator) {
        const msgs = Msgs$6.makeRemoveOperatorMsg(this.broadcast.signer.getAddress(), operator);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    disburse(recipient, amount, reference) {
        const msgs = Msgs$6.makeDisburseMsg(this.broadcast.signer.getAddress(), recipient, amount, reference);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    approveDisbursement(recipient, scheduled_for) {
        const msgs = Msgs$6.makeApproveDisbursementMsg(this.broadcast.signer.getAddress(), recipient, scheduled_for);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    cancelDisbursement(recipient, scheduled_for) {
        const msgs = Msgs$6.makeCancelDisbursementMsg(this.broadcast.signer.getAddress(), recipient, scheduled_for);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    burn(amount) {
        const msgs = Msgs$6.makeBurnMsg(this.broadcast.signer.getAddress(), amount);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    approveBurn(scheduled_for) {
        const msgs = Msgs$6.makeApproveBurnMsg(this.broadcast.signer.getAddress(), scheduled_for);
        return new Transaction(msgs, msgs => this.broadcast.sendTransaction(msgs));
    }
    cancelBurn(scheduled_for) {
        const msgs = Msgs$6.makeCancelBurnMsg(this.broadcast.signer.getAddress(), scheduled_for);
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
    validatorUptime(pubkey) {
        return __awaiter(this, void 0, void 0, function* () {
            let valAddress = convertValidatorPubKey(pubkey);
            return IndexerApi.get(this._opts.endpoint, `validator/${valAddress}`);
        });
    }
    history(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return IndexerApi.get(this._opts.endpoint, 'history', query);
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
        this._treasury = new Treasury(this._broadcast);
        this._control = new Control(this._broadcast);
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
    get treasury() {
        return this._treasury;
    }
    get control() {
        return this._control;
    }
    get indexer() {
        return this._indexer;
    }
}

export { Mele, index as Utils, KeyPairSigner, MnemonicSigner, DefaultSigner };
//# sourceMappingURL=mele-sdk.esm.js.map
