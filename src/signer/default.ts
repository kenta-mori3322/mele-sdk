import { Signer } from './index'

export class DefaultSigner implements Signer {
    getAddress(): string {
        throw new Error('Signer not initialized.')
    }

    getPrivateKey(): string {
        throw new Error('Signer not initialized.')
    }

    getPublicKey(): string {
        throw new Error('Signer not initialized.')
    }

    signTransaction(
        msgs: any[],
        chainId: string,
        fee: number,
        sequence: number,
        accountNumber: number
    ): string {
        throw new Error('Signer not initialized.')
    }

    signMessage(msg: string): string {
        throw new Error('Signer not initialized.')
    }
}
