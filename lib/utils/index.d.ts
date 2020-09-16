/// <reference types="node" />
import * as bip32 from 'bip32';
import { TransactionEvents } from '../transactions/events';
import { fromUmelc, fromUmelg, smallestDenom, smallestStableDenom, toUmelc, toUmelg } from './conversion';
export { fromUmelg, fromUmelc, smallestDenom, smallestStableDenom, toUmelg, toUmelc };
export interface KeyPair {
    privateKey: string;
    publicKey: string;
}
export declare function generateMnemonic(): string;
export declare function generateKeyPair(): KeyPair;
export declare function deriveMasterKey(mnemonic: string): bip32.BIP32Interface;
export declare function deriveMasterKeyFromSeed(seed: Buffer): bip32.BIP32Interface;
export declare function deriveKeyPair(masterKey: bip32.BIP32Interface, hdPath: string): KeyPair;
export declare function deriveKeyPairFromAccountAndIndex(masterKey: bip32.BIP32Interface, account?: number, index?: number): KeyPair;
export declare function getAddressFromPublicKey(pubKey: string): string;
export declare function getPublicKeyFromPrivateKey(privKey: string): string;
export declare function validatePublicKey(pubKey: string): boolean;
export declare function encodeAddress(addr: Buffer, prefix: string): string;
export declare function decodeAddress(addr: string, prefix: string): Buffer;
export declare function promisify(events: TransactionEvents, type?: string): Promise<any>;
export declare function convertValidatorPubKey(pubkey: string): string;
