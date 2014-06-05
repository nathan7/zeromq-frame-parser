'use strict';
module.exports = parser
var read = require('binary-types').read.be

function* parser() {
  var arr = []
    , flags
    , more = true
    , long
  while (more) {
    flags = yield* read.u8()
    more = bit(flags, 0)
    long = bit(flags, 1)
    
    var length
    if (!long)
      length = yield* read.u8()
    else {
      var upperLength = yield* read.u32()
      if (upperLength)
        throw new Error('message too large (>4GB)')
      length = yield* read.u32()
    }

    var body = yield length
    arr.push(body)
  }
  return arr
}

function bit(byte, n) {
  return !!(byte & (1 << n))
}
