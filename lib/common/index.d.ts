export interface SDKCoin {
    denom: string;
    amount: number;
}
export interface PubKey {
    type: string;
    value: string;
}
export interface AccSignInfo {
    address: string;
    accountNumber: number;
    sequence: number;
}
export interface Account {
    type: string;
    value: AccountDetail | ContinuousVestingAccount | DelayedVestingAccount | PeriodicVestingAccount;
}
export interface AccountDetail {
    address: string;
    coins: SDKCoin[];
    public_key: PubKey;
    account_number: number;
    sequence: number;
}
export interface BaseVestingAccount {
    BaseAccount: AccountDetail;
    original_vesting: SDKCoin[];
    delegated_free: SDKCoin[];
    delegated_vesting: SDKCoin[];
    end_time: string;
}
export interface ContinuousVestingAccount {
    BaseVestingAccount: BaseVestingAccount;
    start_time: string;
}
export interface DelayedVestingAccount {
    BaseVestingAccount: BaseVestingAccount;
}
export interface Period {
    length: number;
    amount: SDKCoin[];
}
export interface PeriodicVestingAccount {
    BaseVestingAccount: BaseVestingAccount;
    vesting_periods: Period[];
}
export interface Description {
    moniker: string;
    identity: string;
    website: string;
    securityContact: string;
    details: string;
}
export interface Commission {
    rate: string;
    maxRate: string;
    maxChangeRate: string;
}
export interface Validator {
    operator_address: string;
    consensus_pubkey: string;
    jailed: boolean;
    status: number;
    tokens: number;
    delegator_shares: number;
    description: Description;
    unbonding_height: number;
    unbonding_time: string;
    commission: Commission;
    min_self_delegation: number;
}
export interface Delegation {
    delegator_address: string;
    validator_address: string;
    shares: number;
    balance: SDKCoin;
}
export interface DelegationRes {
    Delegation: Delegation;
    balance: SDKCoin;
}
export interface UnbondingDelegationEntry {
    creation_height: number;
    completion_time: string;
    initial_balance: number;
    balance: number;
}
export interface UnbondingDelegation {
    delegator_address: string;
    validator_address: string;
    entries: UnbondingDelegationEntry[];
}
export interface RedelegationEntry {
    creation_height: number;
    completion_time: string;
    initial_balance: number;
    shares_dst: string;
}
export interface Redelegation {
    delegator_address: string;
    validator_src_address: string;
    validator_dst_address: string;
    entries: RedelegationEntry[];
}
export interface StakingParams {
    unbonding_time: string;
    max_validators: number;
    max_entries: number;
    historical_entries: number;
    bond_denom: string;
}
export interface StakingPool {
    not_bonded_tokens: number;
    bonded_tokens: number;
}
export interface ABCIVersion {
    Block: number;
    App: number;
}
export interface ABCIPartSetHeader {
    total: number;
    hash: string;
}
export interface ABCIBlockId {
    hash: string;
    parts_header: ABCIPartSetHeader;
}
export interface ABCIHeader {
    version: ABCIVersion;
    chain_id: string;
    height: number;
    time: string;
    last_block_id: ABCIBlockId;
    last_commit_hash: string;
    data_hash: string;
    validators_hash: string;
    next_validators_hash: string;
    consensus_hash: string;
    app_hash: string;
    last_results_hash: string;
    evidence_hash: string;
    proposer_address: string;
}
export interface HistoricalInfo {
    header: ABCIHeader;
    valset: Validator[];
}
export interface SlashingParams {
    signed_blocks_window: number;
    min_signed_per_window: number;
    downtime_jail_duration: string;
    slash_fraction_double_sign: number;
    slash_fraction_downtime: number;
}
export interface SigningInfo {
    address: string;
    start_height: number;
    index_offset: number;
    jailed_until: string;
    tombstoned: boolean;
    missed_blocks_counter: number;
}
export interface DistributionParams {
    community_tax: string;
    base_proposer_reward: string;
    bonus_proposer_reward: string;
    withdraw_addr_enabled: boolean;
}
export interface ValidatorSlashEvent {
    validator_period: string;
    fraction: string;
}
export interface DelegationDelegatorReward {
    validator_address: string;
    reward: SDKCoin[];
}
export interface DelegatorTotalRewardsRes {
    rewards: DelegationDelegatorReward[];
    total: SDKCoin[];
}
export interface ParamChange {
    subspace: string;
    key: string;
    value: string;
}
export interface DepositParams {
    min_deposit: SDKCoin[];
    max_deposit_period: string;
}
export interface TallyParams {
    quorum: number;
    threshold: number;
    veto: number;
}
export interface VotingParams {
    voting_period: string;
}
export interface GovParams {
    deposit: DepositParams;
    tally: TallyParams;
    voting: VotingParams;
}
export interface TallyResult {
    yes: number;
    abstain: number;
    no: number;
    no_with_veto: number;
}
export interface Proposal {
    content: any;
    id: number;
    proposal_status: number;
    final_tally_result: TallyResult;
    submit_time: string;
    deposit_end_time: string;
    total_deposit: SDKCoin[];
    voting_start_time: string;
    voting_end_time: string;
}
export interface Deposit {
    proposal_id: number;
    depositor: string;
    amount: SDKCoin[];
}
export interface Vote {
    proposal_id: number;
    voter: string;
    option: string;
}
export interface MintParams {
    mint_denom: string;
    inflation_rate_change: number;
    inflation_max: number;
    inflation_min: number;
    goal_bonded: number;
    blocks_per_year: number;
}
