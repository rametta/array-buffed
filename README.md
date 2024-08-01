# 🧬 @rametta/array-buffed

> Strongly typed schemas for binary data encoding and decoding.

Do you work with [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)?

Do you wish it was easier to work with complex binary data?

Do you love enforcing schema shapes with TypeScript types?

**Then this package is for you!**

## Installation

```bash
# bun
bunx jsr add @rametta/array-buffed

# pnpm
pnpm dlx jsr add @rametta/array-buffed

# deno
deno add @rametta/array-buffed

# npm
npx jsr add @rametta/array-buffed

# yarn
yarn dlx jsr add @rametta/array-buffed
```

## Usage

Step 1: Define a schema

```ts
import { t } from '@rametta/array-buffed'

const schema = t.tuple("Vector", [
  t.u32("x"),
  t.u32("y"),
  t.u32("z"),
])
```

Step 2: Encode data using the schema

```ts
import { t, encode } from '@rametta/array-buffed'

const buffer = encode(schema, [50, 100, 1])
```

Step 3: Decode binary data using the schema

```ts
import { t, decode } from '@rametta/array-buffed'

const [x,y,z] = decode(schema, buffer)
// x: 50
// y: 100
// z: 1
```

## Creating Schemas

Creating schemas is roughly based on how the data is stored in binary, so we do not use any object types with keys and values - every schema is created by defining tuples, arrays, and primitives like `u8`, `i16`, `f32`, etc.

```ts
import { t } from '@rametta/array-buffed'

// labels are optional for primitives, but useful for describing your data
const schema = t.tuple("World", [
  // tuples are fixed length arrays
  t.tuple("world", [t.i32("x"), t.i32("y")]),
  t.tuple("color", [t.u8("r"), t.u8("g"), t.u8("b")])
  // arrays have dynamic lengths and can only be one type, although that type can also be a tuple type
  t.array("heights", t.u16())
  // various primitives
  t.u16("width"),
  t.u16("height"),
  t.u8("depth")
])
```

## Inferring Types from Schemas

Use the `Infer` helper type for extracting the Typescript type for any defined schema.

```ts
import { t, type Infer } from '@rametta/array-buffed'

const schema = t.tuple("My Tuple", [
  t.u8(),
  t.f64("My Float"),
  t.array("My Array", t.i8())
])

type Schema = Infer<typeof schema>
//   Schema = [number, number, Array<number>]

const data: Schema = [101, 3.5, [-4, 7, 9, 100, 74]] // type check compiles - woohoo
```

## All Schemas

For a list of all supported schema types, [click here](https://jsr.io/@rametta/array-buffed/doc/~/t)