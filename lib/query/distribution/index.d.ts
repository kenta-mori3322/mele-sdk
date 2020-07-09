import * as Types from '../../common';
import { ITransport } from '../../transport';
export default class DistributionQuery {
    private _transport;
    constructor(transport: ITransport);
    getParameters(): Promise<Types.DistributionParams>;
    getValidatorOutstandingRewards(validator: string): Promise<Types.SDKCoin[]>;
    getValidatorCommission(validator: string): Promise<Types.SDKCoin[]>;
    getValidatorSlashes(validator: string, startHeight: string, endHeight: string): Promise<Types.ValidatorSlashEvent[]>;
    getDelegationRewards(delegator: string, validator: string): Promise<Types.SDKCoin[]>;
    getDelegatorTotalRewards(delegator: string): Promise<Types.DelegatorTotalRewardsRes[]>;
    getDelegatorValidators(delegator: string): Promise<string[]>;
    getWithdrawAddress(delegator: string): Promise<string>;
    getCommunityPool(): Promise<Types.SDKCoin[]>;
}
