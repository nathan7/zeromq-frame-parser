'use strict';
var parser = require('./parser')
  , parseFn = require('binary-parse-fn')
  , parse = module.exports = parseFn(parser)
parse.frame = parseFn(parser.frame)
