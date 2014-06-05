'use strict'; /* global it:true */
var parse = require('./')
  , assert = require('assert')

it('should parse single short frames', function() {
  var message = [0xd5, 0x94, 0x71, 0x54, 0xc4, 0xc1, 0xab, 0x65, 0xac, 0xc3, 0xb4, 0x9e, 0x7e, 0x80, 0x06, 0x01]
    , frame = new Buffer([0x00, message.length].concat(message))
    , parsed = unbuffer(parse(frame))
  assert.deepEqual(parsed, [message])
})

it('should parse single long frames', function() {
  var message = [0xd5, 0x94, 0x71, 0x54, 0xc4, 0xc1, 0xab, 0x65, 0xac, 0xc3, 0xb4, 0x9e, 0x7e, 0x80, 0x06, 0x01]
    , frame = new Buffer([0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, message.length].concat(message))
    , parsed = unbuffer(parse(frame))
  assert.deepEqual(parsed, [message])
})

it('should parse multiple short frames', function() {
  var messages =
      [ [0xf2, 0x56, 0x38, 0xce, 0x7b, 0xc6, 0x83, 0xae, 0x4e, 0x57, 0xcf, 0xb3, 0x3c, 0xb6, 0x75, 0x2f]
      , [0x1b, 0xcc, 0x07, 0x28, 0x95, 0x7b, 0x9b, 0x1a, 0x35, 0x4f, 0x58, 0xab, 0x63, 0x27, 0x7d, 0x0f]
      , [0x5c, 0xa8, 0xf8, 0xa9, 0x48, 0xea, 0xbe, 0xb3, 0xe5, 0x69, 0xce, 0x91, 0x66, 0x5b, 0xb5, 0xd9]
      ]
    , frame = new Buffer(
      [0x01, messages[0].length].concat(messages[0])
      .concat(
      [0x01, messages[1].length].concat(messages[1]))
      .concat(
      [0x00, messages[2].length].concat(messages[2]))
      )
    , parsed = unbuffer(parse(frame))
  assert.deepEqual(parsed, messages)
})

it('should parse multiple long frames', function() {
  var messages =
      [ [0xf2, 0x56, 0x38, 0xce, 0x7b, 0xc6, 0x83, 0xae, 0x4e, 0x57, 0xcf, 0xb3, 0x3c, 0xb6, 0x75, 0x2f]
      , [0x1b, 0xcc, 0x07, 0x28, 0x95, 0x7b, 0x9b, 0x1a, 0x35, 0x4f, 0x58, 0xab, 0x63, 0x27, 0x7d, 0x0f]
      , [0x5c, 0xa8, 0xf8, 0xa9, 0x48, 0xea, 0xbe, 0xb3, 0xe5, 0x69, 0xce, 0x91, 0x66, 0x5b, 0xb5, 0xd9]
      ]
    , frame = new Buffer(
        [0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, messages[0].length].concat(messages[0])
        .concat(
        [0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, messages[1].length].concat(messages[1]))
        .concat(
        [0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, messages[2].length].concat(messages[2]))
        )
    , parsed = unbuffer(parse(frame))
  assert.deepEqual(parsed, messages)
})

it('should parse multiple interleaved frames', function() {
  var messages =
      [ [0xf2, 0x56, 0x38, 0xce, 0x7b, 0xc6, 0x83, 0xae, 0x4e, 0x57, 0xcf, 0xb3, 0x3c, 0xb6, 0x75, 0x2f]
      , [0x1b, 0xcc, 0x07, 0x28, 0x95, 0x7b, 0x9b, 0x1a, 0x35, 0x4f, 0x58, 0xab, 0x63, 0x27, 0x7d, 0x0f]
      , [0x5c, 0xa8, 0xf8, 0xa9, 0x48, 0xea, 0xbe, 0xb3, 0xe5, 0x69, 0xce, 0x91, 0x66, 0x5b, 0xb5, 0xd9]
      , [0x84, 0xa4, 0x91, 0x46, 0xf9, 0x7d, 0xbe, 0x51, 0x32, 0x12, 0x22, 0x7a, 0xa0, 0xe8, 0x63, 0xea]
      ]
    , frame = new Buffer(
        [0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, messages[0].length].concat(messages[0])
        .concat(
        [0x01, messages[1].length].concat(messages[1]))
        .concat(
        [0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, messages[2].length].concat(messages[2]))
        .concat(
        [0x00, messages[3].length].concat(messages[3]))
        )
    , parsed = unbuffer(parse(frame))
  assert.deepEqual(parsed, messages)
})

function unbuffer(arr) {
  return arr.map(function(buf) { return [].slice.call(buf) })
}
