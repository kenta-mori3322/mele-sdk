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
    value: AccountDetail;
}
export interface AccountDetail {
    address: string;
    coins: SDKCoin[];
    public_key: PubKey;
    account_number: number;
    sequence: number;
}
