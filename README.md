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

const MouseSchema = t.tuple("Mouse", [
  t.u8("X"),
  t.u8("Y")
])
```

Step 2: Encode some data using the schema

```ts
import { t, encode } from '@rametta/array-buffed'

const buffer = encode(MouseSchema, [50, 100])
```

Step 3: Decode some binary data using the schema

```ts
import { t, decode } from '@rametta/array-buffed'

const [x,y] = decode(MouseSchema, buffer)
// x: 50
// y: 100
```

## Creating Schemas

Creating schemas is roughly based on how the data is stored in binary, so we do not use any object types with keys and values - every schema is created by defining tuples, arrays, and primitives like `u8`, `i16`, `f32`, etc.

## Inferring Types from Schemas

Use the `Infer` helper type for extracting the Typescript type for any defined schema.

```ts
import { t, type Infer } from '@rametta/array-buffed'

const MySchema = t.tuple("My Tuple", [
  t.u8(),
  t.f64("My Float"),
  t.array("My Array", t.i8())
])

type MySchema = Infer<typeof MySchema>
//   MySchema = [number, number, Array<number>]
```