import { Transaction, TransactionApi } from '../index';
import * as Types from '../../common';
export declare const Msgs: {
    makeSubmitExecutionMsg(executor: string, content: any): any[];
    makeTextProposal(proposer: string, title: string, description: string): any[];
    makeParameterChangeProposal(proposer: string, title: string, description: string, changes: Types.ParamChange[]): any[];
    makeCommunityPoolSpendProposal(proposer: string, title: string, description: string, recipient: string, amount: Types.SDKCoin[]): any[];
    makeBurnedPoolSpendProposal(proposer: string, title: string, description: string, recipient: string, amount: Types.SDKCoin[]): any[];
    makeMintTreasurySupplyProposal(proposer: string, title: string, description: string, amount: Types.SDKCoin[]): any[];
    makeBurnTreasurySupplyProposal(proposer: string, title: string, description: string, amount: Types.SDKCoin[]): any[];
    makeSoftwareUpgradeProposal(proposer: string, title: string, description: string, plan: Types.UpgradePlan): any[];
    makeCancelSoftwareUpgradeProposal(proposer: string, title: string, description: string): any[];
};
export default class Control extends TransactionApi {
    submitTextProposal(title: string, description: string): Transaction;
    submitParameterChangeProposal(title: string, description: string, changes: Types.ParamChange[]): Transaction;
    submitCommunityPoolSpendProposal(title: string, description: string, recipient: string, amount: Types.SDKCoin[]): Transaction;
    submitBurnedPoolSpendProposal(title: string, description: string, recipient: string, amount: Types.SDKCoin[]): Transaction;
    submitMintTreasurySupplyProposal(title: string, description: string, amount: Types.SDKCoin[]): Transaction;
    submitBurnTreasurySupplyProposal(title: string, description: string, amount: Types.SDKCoin[]): Transaction;
    submitSoftwareUpgradeProposal(title: string, description: string, plan: Types.UpgradePlan): Transaction;
    submitCancelSoftwareUpgradeProposal(title: string, description: string): Transaction;
}
