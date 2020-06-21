import bech32 from 'bech32'
import shajs from 'sha.js'

import { Coin, Fee, PubKeySecp256k1, Signature, StdTx, marshalBinary, marshalJson } from './codec'

export function encodeAddr(addr: Buffer): string {
    return bech32.encode(_PREFIX.PrefixAddress, bech32.toWords(addr))
}

export function decodeAddr(addr: string): Buffer {
    let decode = bech32.decode(addr)

    if (decode.prefix !== _PREFIX.PrefixAddress) {
        throw new Error(`invalid prefix: ${decode.prefix}\n`)
    }

    return Buffer.from(bech32.fromWords(decode.words))
}

// TODO: Find a better solution
export const encodeMsg = (msg: any) => {
    Object.keys(msg).forEach((k) => {
        if (typeof msg[k] === 'string' && msg[k].startsWith(_PREFIX.PrefixAddress)) {
            msg[k] = decodeAddr(msg[k]).toJSON().data
        } else if (typeof msg[k] == 'object' && !(msg[k] instanceof Array)) {
            msg[k] = encodeMsg(msg[k])
        } else if (typeof msg[k] == 'object' && msg[k] instanceof Array) {
            msg[k] = msg[k].map((m) => {
                return encodeMsg(m)
            })
        }
    })

    return msg
}

export function encodeSignMsg(
    stdMsg: any[],
    chainId: string,
    seq: number,
    accountNumber: number,
    maxFeeInCoin: number
): any {
    stdMsg = stdMsg.map((msg) => JSON.parse(marshalJson(msg)))

    const stdSignMsg = {
        account_number: String(accountNumber),
        chain_id: chainId,
        fee: getFee(maxFeeInCoin, stdMsg.length),
        memo: 'sdk',
        msgs: stdMsg,
        sequence: String(seq),
    }

    const jsonStr = JSON.stringify(number2StringInObject(sortObject(stdSignMsg)))

    const signMsgHash = shajs('sha256').update(jsonStr).digest()

    return signMsgHash
}

export function encodeTx(
    msgs: any[],
    rawPubKey: string[],
    rawSigDER: string[],
    maxFeeInCoin: number
): string {
    let sigs = new Array<any>()

    for (let _i = 0; _i < rawPubKey.length; _i++) {
        const sig = new Signature(
            new PubKeySecp256k1(Buffer.from(rawPubKey[_i], 'hex').toJSON().data),
            Buffer.from(rawSigDER[_i], 'hex').toJSON().data
        )

        sigs.push(sig)
    }

    const fee = getFee(maxFeeInCoin, msgs.length)

    let stdTx = new StdTx(msgs, fee, sigs, 'sdk')

    return marshalBinary(stdTx)
}

export const getFee = (maxFeeInCoin: number, msgCount: number) => {
    return new Fee([new Coin('umele', String(maxFeeInCoin))], Math.ceil(msgCount / 10) * 200000)
}

function sortObject(object) {
    if (typeof object == 'string') {
        return object
    }
    let sortedObj = {},
        keys = Object.keys(object)

    keys.sort(function (key1, key2) {
        ;(key1 = key1.toLowerCase()), (key2 = key2.toLowerCase())
        if (key1 < key2) return -1
        if (key1 > key2) return 1
        return 0
    })

    for (let index in keys) {
        let key = keys[index]

        if (typeof object[key] == 'object' && !(object[key] instanceof Array)) {
            sortedObj[key] = sortObject(object[key])
        } else if (typeof object[key] == 'object' && object[key] instanceof Array) {
            sortedObj[key] = []

            object[key].forEach((element) => {
                sortedObj[key].push(sortObject(element))
            })
        } else {
            sortedObj[key] = object[key]
        }
    }

    return sortedObj
}

function number2StringInObject(object): any {
    let resultObj = {},
        keys = Object.keys(object)

    if (typeof object == 'string') {
        return object
    }

    for (let index in keys) {
        let key = keys[index]

        if (typeof object[key] == 'object' && !(object[key] instanceof Array)) {
            resultObj[key] = number2StringInObject(object[key])
        } else if (typeof object[key] == 'object' && object[key] instanceof Array) {
            resultObj[key] = []

            object[key].forEach((element) => {
                resultObj[key].push(number2StringInObject(element))
            })
        } else {
            if (typeof object[key] == 'number') {
                resultObj[key] = String(object[key])
            } else {
                resultObj[key] = object[key]
            }
        }
    }

    return resultObj
}

const _PREFIX = {
    PrefixAddress: 'mele',
}
