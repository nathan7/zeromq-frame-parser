# zeromq-frame-parser

  Parse ZeroMQ frames.

## Installation

    npm install zeromq-frame-parser

## API

  What it says on the tin.

### parse(buffer) -> array of buffers

  Parses a single set of frames, and returns an array of their bodies.

## Extras

  The [binary-parse-fn](https://github.com/nathan7/binary-parse-fn) style parser is exposed as `zeromq-frame-parser/parser`.
  This is considered public API.

