import BN from 'bn.js'
import numberToBN from 'number-to-bn'

const zero: BN = new BN(0)
const negative1: BN = new BN(-1)

export const smallestDenom = 'umelc'
export const smallestStableDenom = 'umelg'

const unitMapMelc = {
    umelc: '1',
    melc: '1000000000',
}

const unitMapMelg = {
    umelg: '1',
    melg: '1000000000',
}

function fromUmelc(input: any, unit: string = 'melc'): string {
    if (!BN.isBN(input) && typeof input !== 'string') {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.')
    }

    if (typeof unit !== 'string') {
        throw new Error('Invalid unit.')
    }

    return _fromUmelc(input, unit)
}

function toUmelc(input: any, unit: string = 'melc'): any {
    if (!BN.isBN(input) && typeof input !== 'string') {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.')
    }

    if (typeof unit !== 'string') {
        throw new Error('Invalid unit.')
    }

    return BN.isBN(input) ? _toUmelc(input, unit) : _toUmelc(input, unit).toString(10)
}

function _fromUmelc(umelcInput: any, unit: string): string {
    unit = unit.toLowerCase()

    if (!unitMapMelc[unit]) {
        throw new Error('Invalid unit.')
    }

    let umelc: BN = numberToBN(umelcInput)
    let negative: boolean = umelc.lt(zero)
    const base: BN = getValueOfUnit(unit)
    const baseLength: number = unitMapMelc[unit].length - 1 || 1

    if (negative) {
        umelc = umelc.mul(negative1)
    }

    let fraction: string = umelc.mod(base).toString(10)

    while (fraction.length < baseLength) {
        fraction = `0${fraction}`
    }

    let match = fraction.match(/^([0-9]*[1-9]|0)(0*)/)

    if (match && match.length >= 2) fraction = match[1]

    let whole: string = umelc.div(base).toString(10)

    let value: string = `${whole}${fraction == '0' ? '' : `.${fraction}`}`

    if (negative) {
        value = `-${value}`
    }

    return value
}

function _toUmelc(melcInput: any, unit: string): BN {
    unit = unit.toLowerCase()

    if (!unitMapMelc[unit]) {
        throw new Error('Invalid unit.')
    }

    let melc: string = numberToString(melcInput)
    const base: BN = getValueOfUnit(unit)
    const baseLength: number = unitMapMelc[unit].length - 1 || 1

    let negative: boolean = melc.substring(0, 1) === '-'
    if (negative) {
        melc = melc.substring(1)
    }

    if (melc === '.') {
        throw new Error(`[mele-sdk] while converting number ${melcInput} to umelc, invalid value`)
    }

    let comps: Array<string> = melc.split('.')
    if (comps.length > 2) {
        throw new Error(
            `[mele-sdk] while converting number ${melc} to umelc, too many decimal points`
        )
    }

    let whole: string = comps[0]
    let fraction: string = comps[1]

    if (!whole) {
        whole = '0'
    }
    if (!fraction) {
        fraction = '0'
    }
    if (fraction.length > baseLength) {
        throw new Error(
            `[mele-sdk] while converting number ${melcInput} to umelc, too many decimal places`
        )
    }

    while (fraction.length < baseLength) {
        fraction += '0'
    }

    let wholeBN: BN = new BN(whole)
    let fractionBN: BN = new BN(fraction)
    let umelc: BN = wholeBN.mul(base).add(fractionBN)

    if (negative) {
        umelc = umelc.mul(negative1)
    }

    return new BN(umelc.toString(10), 10)
}

function fromUmelg(input: any, unit: string = 'melg'): string {
    if (!BN.isBN(input) && typeof input !== 'string') {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.')
    }

    if (typeof unit !== 'string') {
        throw new Error('Invalid unit.')
    }

    return _fromUmelg(input, unit)
}

function toUmelg(input: any, unit: string = 'melg'): any {
    if (!BN.isBN(input) && typeof input !== 'string') {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.')
    }

    if (typeof unit !== 'string') {
        throw new Error('Invalid unit.')
    }

    return BN.isBN(input) ? _toUmelg(input, unit) : _toUmelg(input, unit).toString(10)
}

function _fromUmelg(umelgInput: any, unit: string): string {
    unit = unit.toLowerCase()

    if (!unitMapMelg[unit]) {
        throw new Error('Invalid unit.')
    }

    let umelg: BN = numberToBN(umelgInput)
    let negative: boolean = umelg.lt(zero)
    const base: BN = getValueOfUnitUmelg(unit)
    const baseLength: number = unitMapMelg[unit].length - 1 || 1

    if (negative) {
        umelg = umelg.mul(negative1)
    }

    let fraction: string = umelg.mod(base).toString(10)

    while (fraction.length < baseLength) {
        fraction = `0${fraction}`
    }

    let match = fraction.match(/^([0-9]*[1-9]|0)(0*)/)

    if (match && match.length >= 2) fraction = match[1]

    let whole: string = umelg.div(base).toString(10)

    let value: string = `${whole}${fraction == '0' ? '' : `.${fraction}`}`

    if (negative) {
        value = `-${value}`
    }

    return value
}

function _toUmelg(melgInput: any, unit: string): BN {
    unit = unit.toLowerCase()

    if (!unitMapMelg[unit]) {
        throw new Error('Invalid unit.')
    }

    let melg: string = numberToString(melgInput)
    const base: BN = getValueOfUnitUmelg(unit)
    const baseLength: number = unitMapMelg[unit].length - 1 || 1

    let negative: boolean = melg.substring(0, 1) === '-'
    if (negative) {
        melg = melg.substring(1)
    }

    if (melg === '.') {
        throw new Error(`[mele-sdk] while converting number ${melgInput} to umelg, invalid value`)
    }

    let comps: Array<string> = melg.split('.')
    if (comps.length > 2) {
        throw new Error(
            `[mele-sdk] while converting number ${melgInput} to umelg,  too many decimal points`
        )
    }

    let whole: string = comps[0]
    let fraction: string = comps[1]

    if (!whole) {
        whole = '0'
    }
    if (!fraction) {
        fraction = '0'
    }
    if (fraction.length > baseLength) {
        throw new Error(
            `[mele-sdk] while converting number ${melgInput} to umelg, too many decimal places`
        )
    }

    while (fraction.length < baseLength) {
        fraction += '0'
    }

    let wholeBN: BN = new BN(whole)
    let fractionBN: BN = new BN(fraction)
    let umelg: BN = wholeBN.mul(base).add(fractionBN)

    if (negative) {
        umelg = umelg.mul(negative1)
    }

    return new BN(umelg.toString(10), 10)
}

function getValueOfUnit(unitInput: string): BN {
    const unit: string = unitInput ? unitInput.toLowerCase() : 'melc'
    let unitValue: string = unitMapMelc[unit]

    return new BN(unitValue, 10)
}

function getValueOfUnitUmelg(unitInput: string): BN {
    const unit: string = unitInput ? unitInput.toLowerCase() : 'melg'
    let unitValue: string = unitMapMelg[unit]

    return new BN(unitValue, 10)
}

function numberToString(arg: any): string {
    if (typeof arg === 'string') {
        if (!arg.match(/^-?[0-9.]+$/)) {
            throw new Error(
                `while converting number to string, invalid number value '${arg}', should be a number matching (^-?[0-9.]+).`
            )
        }
        return arg
    } else if (typeof arg === 'number') {
        return String(arg)
    } else if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
        if (arg.toPrecision) {
            return String(arg.toPrecision())
        } else {
            return arg.toString(10)
        }
    }
    throw new Error(
        `while converting number to string, invalid number value '${arg}' type ${typeof arg}.`
    )
}

export { fromUmelc, toUmelc, fromUmelg, toUmelg }