[![Build Status](https://travis-ci.org/nathan7/zeromq-frame-parser.svg?branch=master)](https://travis-ci.org/nathan7/zeromq-frame-parser?branch=master)

# zeromq-frame-parser

  Parse ZeroMQ frames.

## Installation

    npm install zeromq-frame-parser

## API

  What it says on the tin.

### parse(buffer) -> array of buffers

  Parses a single set of frames, and returns an array of their bodies.

### parse.frame(buffer) -> { body: Buffer, more: Boolean }

  Parses a single frame.

## Extras

  The [binary-parse-fn](https://github.com/nathan7/binary-parse-fn) style parsers are exposed as `zeromq-frame-parser/parser`.
  They are exposed under the same names as the parse functions.
  This is considered public API.

