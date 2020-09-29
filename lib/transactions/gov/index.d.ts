import { Transaction, TransactionApi } from '../index';
import * as Types from '../../common';
export declare const Msgs: {
    makeSubmitProposalMsg(proposer: string, initialDeposit: Types.SDKCoin[], content: any): any[];
    makeVoteMsg(proposalId: number, voter: string, option: string): any[];
    makeDepositMsg(proposalId: number, depositor: string, amount: Types.SDKCoin[]): any[];
    makeTextProposal(proposer: string, initialDeposit: Types.SDKCoin[], title: string, description: string): any[];
    makeParameterChangeProposal(proposer: string, initialDeposit: Types.SDKCoin[], title: string, description: string, changes: Types.ParamChange[]): any[];
    makeCommunityPoolSpendProposal(proposer: string, initialDeposit: Types.SDKCoin[], title: string, description: string, recipient: string, amount: Types.SDKCoin[]): any[];
    makeBurnedPoolSpendProposal(proposer: string, initialDeposit: Types.SDKCoin[], title: string, description: string, recipient: string, amount: Types.SDKCoin[]): any[];
    makeMintTreasurySupplyProposal(proposer: string, initialDeposit: Types.SDKCoin[], title: string, description: string, amount: Types.SDKCoin[]): any[];
    makeBurnTreasurySupplyProposal(proposer: string, initialDeposit: Types.SDKCoin[], title: string, description: string, amount: Types.SDKCoin[]): any[];
};
export default class Gov extends TransactionApi {
    vote(proposalId: number, option: string): Transaction;
    deposit(proposalId: number, amount: Types.SDKCoin[]): Transaction;
    submitTextProposal(initialDeposit: Types.SDKCoin[], title: string, description: string): Transaction;
    submitParameterChangeProposal(initialDeposit: Types.SDKCoin[], title: string, description: string, changes: Types.ParamChange[]): Transaction;
    submitCommunityPoolSpendProposal(initialDeposit: Types.SDKCoin[], title: string, description: string, recipient: string, amount: Types.SDKCoin[]): Transaction;
    submitBurnedPoolSpendProposal(initialDeposit: Types.SDKCoin[], title: string, description: string, recipient: string, amount: Types.SDKCoin[]): Transaction;
    submitMintTreasurySupplyProposal(initialDeposit: Types.SDKCoin[], title: string, description: string, amount: Types.SDKCoin[]): Transaction;
    submitBurnTreasurySupplyProposal(initialDeposit: Types.SDKCoin[], title: string, description: string, amount: Types.SDKCoin[]): Transaction;
}
