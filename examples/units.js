const { Utils } = require('../lib/mele-sdk.cjs.js')

console.log(Utils.fromUmelg('1000000000', 'melg'))
console.log(Utils.toUmelg('10', 'melg'))

console.log(Utils.fromUmelc('100000000001', 'melc'))
console.log(Utils.toUmelc('100', 'melc'))
