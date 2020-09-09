import * as Types from '../../common';
import { ITransport } from '../../transport';
import MintQuery from '../mint';
export default class StakingQuery {
    private _transport;
    private _mint;
    constructor(transport: ITransport, mint: MintQuery);
    getValidators(): Promise<Types.Validator[]>;
    getValidator(address: string): Promise<Types.Validator>;
    getValidatorDelegations(address: string): Promise<Types.Delegation[]>;
    getValidatorUnbondingDelegations(address: string): Promise<Types.Delegation[]>;
    getDelegation(delegatorAddress: string, validatorAddress: string): Promise<Types.DelegationRes>;
    getUnbondingDelegation(delegatorAddress: string, validatorAddress: string): Promise<Types.UnbondingDelegation>;
    getDelegatorDelegations(delegatorAddress: string): Promise<Types.Delegation[]>;
    getDelegatorUnbondingDelegations(delegatorAddress: string): Promise<Types.UnbondingDelegation[]>;
    getRedelegations(delegatorAddress: string, srcValidatorAddress: string, dstValidatorAddress: string): Promise<Types.Redelegation[]>;
    getDelegatorValidators(delegatorAddress: string): Promise<Types.Validator[]>;
    getDelegatorValidator(delegatorAddress: string, validatorAddress: string): Promise<Types.Validator>;
    getHistoricalInfo(height: number): Promise<Types.HistoricalInfo>;
    getParameters(): Promise<Types.StakingParams>;
    getPool(): Promise<Types.StakingPool>;
    getRewardRate(): Promise<number>;
}
