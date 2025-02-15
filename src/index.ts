// JS Typed Arrays: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays
// JS DataView: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView

// Bitwise Operators
// AND (&): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND
// AND assignment (&=): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND_assignment
// NOT (~): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT
// OR (|): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR
// OR assignment (|=): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR_assignment
// XOR (^): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
// XOR assignment (^=): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR_assignment

type ExtractT<T> = T extends { t: infer K } ? K : never;

type RemapTuple<T extends unknown[]> = {
  [K in keyof T]: ExtractT<T[K]>;
};

type ToUnion<T extends unknown[]> = Prettify<[number, ExtractT<T[number]>]>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * The base Schema class for which to extend when creating new Schema subtypes, such as uint8, f32, etc...
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export abstract class Schema<const Name extends string = string, const T = any> {
  readonly name: Name = "" as Name;
  readonly label: string = "";
  readonly t: T = undefined as T;
  abstract encode(view: DataView, offset: number, value: T): void;
  abstract decode(view: DataView, offset: number): T;
  abstract bytes(data: T): number;
}

class Int8<const Label extends string> extends Schema<"Int8", number> {
  encode(view: DataView, offset: number, value: number): void {
    view.setInt8(offset, value);
  }

  decode(view: DataView, offset: number): number {
    return view.getInt8(offset);
  }

  bytes(): number {
    return Int8Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): Int8<L> {
    return new Int8<L>();
  }
}

class UInt8<const Label extends string> extends Schema<"UInt8", number> {
  encode(view: DataView, offset: number, value: number): void {
    view.setUint8(offset, value);
  }

  decode(view: DataView, offset: number): number {
    return view.getUint8(offset);
  }

  bytes(): number {
    return Uint8Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): UInt8<L> {
    return new UInt8<L>();
  }
}

class Int16<const Label extends string> extends Schema<"Int16", number> {
  encode(view: DataView, offset: number, value: number): void {
    view.setInt16(offset, value);
  }

  decode(view: DataView, offset: number): number {
    return view.getInt16(offset);
  }

  bytes(): number {
    return Int16Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): Int16<L> {
    return new Int16<L>();
  }
}

class UInt16<const Label extends string> extends Schema<"UInt16", number> {
  encode(view: DataView, offset: number, value: number): void {
    view.setUint16(offset, value);
  }

  decode(view: DataView, offset: number): number {
    return view.getUint16(offset);
  }

  bytes(): number {
    return Uint16Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): UInt16<L> {
    return new UInt16<L>();
  }
}

class Int32<const Label extends string> extends Schema<"Int32", number> {
  encode(view: DataView, offset: number, value: number): void {
    view.setInt32(offset, value);
  }

  decode(view: DataView, offset: number): number {
    return view.getInt32(offset);
  }

  bytes(): number {
    return Int32Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): Int32<L> {
    return new Int32<L>();
  }
}

class UInt32<const Label extends string> extends Schema<"UInt32", number> {
  encode(view: DataView, offset: number, value: number): void {
    view.setUint32(offset, value);
  }

  decode(view: DataView, offset: number): number {
    return view.getUint32(offset);
  }

  bytes(): number {
    return Uint32Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): UInt32<L> {
    return new UInt32<L>();
  }
}

class Int64<const Label extends string> extends Schema<"Int64", bigint> {
  encode(view: DataView, offset: number, value: bigint): void {
    view.setBigInt64(offset, value, true);
  }

  decode(view: DataView, offset: number): bigint {
    return view.getBigInt64(offset, true);
  }

  bytes(): number {
    return BigInt64Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): Int64<L> {
    return new Int64<L>();
  }
}

class UInt64<const Label extends string> extends Schema<"UInt64", bigint> {
  encode(view: DataView, offset: number, value: bigint): void {
    view.setBigUint64(offset, value, true);
  }

  decode(view: DataView, offset: number): bigint {
    return view.getBigUint64(offset, true);
  }

  bytes(): number {
    return BigInt64Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): UInt64<L> {
    return new UInt64<L>();
  }
}

class Float32<const Label extends string> extends Schema<"Float32", number> {
  encode(view: DataView, offset: number, value: number): void {
    view.setFloat32(offset, value, true);
  }

  decode(view: DataView, offset: number): number {
    return view.getFloat32(offset, true);
  }

  bytes(): number {
    return Float32Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): Float32<L> {
    return new Float32<L>();
  }
}

class Float64<const Label extends string> extends Schema<"Float64", number> {
  encode(view: DataView, offset: number, value: number): void {
    view.setFloat64(offset, value, true);
  }

  decode(view: DataView, offset: number): number {
    return view.getFloat64(offset, true);
  }

  bytes(): number {
    return Float64Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L): Float64<L> {
    return new Float64<L>();
  }
}

class Tuple<const Label extends string, const T extends Schema[]> extends Schema<"Tuple", RemapTuple<T>> {
  readonly name = "Tuple";
  readonly elements: T;

  constructor(children: T) {
    super();
    this.elements = children;
  }

  encode(view: DataView, offset: number, value: RemapTuple<T>): void {
    let localOffset = 0;
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].encode(view, offset + localOffset, value[i]);
      localOffset += this.elements[i].bytes(value[i]);
    }
  }

  decode(view: DataView, offset: number): RemapTuple<T> {
    const results: RemapTuple<T> = [] as RemapTuple<T>;

    let localOffset = 0;
    for (const element of this.elements) {
      const data = element.decode(view, offset + localOffset);
      results.push(data);
      localOffset += element.bytes(data);
    }

    return results;
  }

  bytes(data: RemapTuple<T>): number {
    return this.elements.reduce((acc, element, index) => acc + element.bytes(data[index]), 0);
  }

  static t<L extends string, const T extends Schema[]>(label: L, elements: T): Tuple<L, T> {
    return new Tuple<L, T>(elements);
  }
}

class List<const Label extends string, const T extends Schema> extends Schema<"List", T["t"][]> {
  readonly name = "List";
  readonly #kind: T;

  constructor(kind: T) {
    super();
    this.#kind = kind;
  }

  encode(view: DataView, offset: number, values: T["t"][]): void {
    view.setUint32(offset, values.length);
    let localOffset = Uint32Array.BYTES_PER_ELEMENT;
    for (const value of values) {
      this.#kind.encode(view, offset + localOffset, value);
      localOffset += this.#kind.bytes(value);
    }
  }

  decode(view: DataView, offset: number): T["t"][] {
    const results: T["t"][] = [];

    const count = view.getUint32(offset);
    let localOffset = Uint32Array.BYTES_PER_ELEMENT;
    for (let i = 0; i < count; i++) {
      const data = this.#kind.decode(view, offset + localOffset);
      results.push(data);
      localOffset += this.#kind.bytes(data);
    }

    return results;
  }

  bytes(data: T["t"][]): number {
    return this.#kind.bytes(data) * data.length + Uint32Array.BYTES_PER_ELEMENT; // Uint32Array.BYTES_PER_ELEMENT (4) to hold the count of items in the array
  }

  static t<L extends string, const T extends Schema>(label: L, kind: T): List<L, T> {
    return new List<L, T>(kind);
  }
}

class Str<const Label extends string> extends Schema<"String", string> {
  static encoder: TextEncoder = new TextEncoder();
  static decoder: TextDecoder = new TextDecoder();
  readonly name = "String";
  readonly fixedLength?: number;

  constructor(fixedLength?: number) {
    super();
    this.fixedLength = fixedLength;
  }

  encode(view: DataView, offset: number, str: string): void {
    const encoded = Str.encoder.encode(str);

    if (this.fixedLength == null) {
      view.setUint32(offset, encoded.byteLength);
    } else {
      if (encoded.byteLength !== this.fixedLength) {
        throw new Error(
          `Failed to encode Str. Str has a fixed length ${this.fixedLength}. Tried to encode string of different size ${encoded.byteLength}. String: ${str} `,
        );
      }
    }

    let localOffset = this.fixedLength == null ? Uint32Array.BYTES_PER_ELEMENT : 0;
    for (const value of encoded) {
      view.setUint8(offset + localOffset, value);
      localOffset++;
    }
  }

  decode(view: DataView, offset: number): string {
    const length = this.fixedLength ?? view.getUint32(offset);
    const results = new Uint8Array(length);

    let localOffset = this.fixedLength == null ? Uint32Array.BYTES_PER_ELEMENT : 0;
    for (let i = 0; i < length; i++) {
      results[i] = view.getUint8(offset + localOffset);
      localOffset++;
    }

    return Str.decoder.decode(results);
  }

  bytes(data: string): number {
    return this.fixedLength ?? Str.encoder.encode(data).byteLength + Uint32Array.BYTES_PER_ELEMENT; // Uint32Array.BYTES_PER_ELEMENT (4) to hold the string length
  }

  static t<L extends string>(label?: L, fixedLength?: number): Str<L> {
    return new Str<L>(fixedLength);
  }
}

class Union<const Label extends string, const T extends Schema[]> extends Schema<"Union", ToUnion<T>> {
  readonly name = "Union";
  readonly #schemas: T;

  constructor(schemas: T) {
    super();
    this.#schemas = schemas;
  }

  encode(view: DataView, offset: number, data: ToUnion<T>): void {
    view.setUint8(offset, data[0]); // union index
    const localOffset = Uint8Array.BYTES_PER_ELEMENT;
    const schema = this.#schemas[data[0]];
    schema.encode(view, offset + localOffset, data[1]);
  }

  decode(view: DataView, offset: number): ToUnion<T> {
    const unionIndex = view.getUint8(offset);
    const schema = this.#schemas[unionIndex];
    const localOffset = Uint8Array.BYTES_PER_ELEMENT;
    return [unionIndex, schema.decode(view, offset + localOffset)];
  }

  bytes(data: ToUnion<T>): number {
    const schema = this.#schemas[data[0]];
    return schema.bytes(data[1]) + Uint8Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string, const T extends Schema[]>(label: L, schemas: T): Union<L, T> {
    return new Union<L, T>(schemas);
  }
}

class Buffer<const Label extends string> extends Schema<"Buffer", ArrayBufferLike> {
  readonly name = "Buffer";

  encode(view: DataView, offset: number, data: ArrayBufferLike): void {
    view.setUint32(offset, data.byteLength);

    let localOffset = Uint32Array.BYTES_PER_ELEMENT;
    for (const byte of new Uint8Array(data)) {
      view.setUint8(offset + localOffset, byte);
      localOffset += Uint8Array.BYTES_PER_ELEMENT;
    }
  }

  decode(view: DataView, offset: number): ArrayBufferLike {
    const length = view.getUint32(offset);
    const uint8array = new Uint8Array(length);

    let localOffset = Uint32Array.BYTES_PER_ELEMENT;
    for (let i = 0; i < length; i++) {
      uint8array[i] = view.getUint8(localOffset + offset);
      localOffset += Uint8Array.BYTES_PER_ELEMENT;
    }

    return uint8array.buffer;
  }

  bytes(buffer: ArrayBufferLike): number {
    return buffer.byteLength + Uint32Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string>(label?: L): Buffer<L> {
    return new Buffer<L>();
  }
}

/**
 * Schema types that can be used for constructing a schema shape.
 */
export namespace t {
  /**
   * Int8 from `-128` to `127`
   *
   * 1 byte / 8-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A Int8 schema
   * @example const schema = t.i8()
   */
  export const i8: <L extends string = string>(label?: L) => Int8<L> = Int8.t;
  /**
   * UInt8 from `0` to `255`
   *
   * 1 byte / 8-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A UInt8 schema
   * @example const schema = t.u8()
   */
  export const u8: <L extends string = string>(label?: L) => UInt8<L> = UInt8.t;
  /**
   * Int16 from `-32,768` to `32,767`
   *
   * 2 bytes / 16-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A Int16 schema
   * @example const schema = t.i16()
   */
  export const i16: <L extends string = string>(label?: L) => Int16<L> = Int16.t;
  /**
   * UInt16 from `0` to `65,535`
   *
   * 2 bytes / 16-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A UInt16 schema
   * @example const schema = t.u16()
   */
  export const u16: <L extends string = string>(label?: L) => UInt16<L> = UInt16.t;
  /**
   * Int32 from `-2,147,483,648` to `2,147,483,647`
   *
   * 4 bytes / 32-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A Int32 schema
   * @example const schema = t.i32()
   */
  export const i32: <L extends string = string>(label?: L) => Int32<L> = Int32.t;
  /**
   * UInt32 from `0` to `4,294,967,295`
   *
   * 4 bytes / 32-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A UInt32 schema
   * @example const schema = t.u32()
   */
  export const u32: <L extends string = string>(label?: L) => UInt32<L> = UInt32.t;
  /**
   * Int64 (aka BigInt) from `-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807`
   *
   * 8 bytes / 64-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A Int64 schema
   * @example const schema = t.i64()
   */
  export const i64: <L extends string = string>(label?: L) => Int64<L> = Int64.t;
  /**
   * UInt64 (aka BigUInt) from `0` to `18,446,744,073,709,551,615`
   *
   * 8 bytes / 64-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A UInt64 schema
   * @example const schema = t.u64()
   */
  export const u64: <L extends string = string>(label?: L) => UInt64<L> = UInt64.t;
  /**
   * Float32 - a 32-bit single-precision floating-point number
   *
   * 4 bytes / 32-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A Float32 schema
   * @example const schema = t.f32()
   */
  export const f32: <L extends string = string>(label?: L) => Float32<L> = Float32.t;
  /**
   * Float64 - a 64-bit double-precision floating-point number
   *
   * 8 bytes / 64-bit
   *
   * @param label Optional label describing the data held in this number.
   * @returns A Float64 schema
   * @example const schema = t.f64()
   */
  export const f64: <L extends string = string>(label?: L) => Float64<L> = Float64.t;
  /**
   * Tuple - fixed length array of any number of other different schemas
   *
   * Bytes depends on bytes of schemas included
   *
   * @param label Required label describing the data held in the tuple.
   * @param elements Array of schema types.
   * @returns An tuple schema bound to the types specified in the elements array.
   * @example const schema = t.tuple("Vector", [t.u8("x"), t.u8("y")])
   */
  export const tuple: <L extends string, const T extends Schema[]>(label: L, elements: T) => Tuple<L, T> = Tuple.t;
  /**
   * Array - dynamic length array of only one other type of schema, which can include Tuples.
   *
   * Bytes depends on amount of items in the array at encode time.
   *
   * @param label Required label describing the data held in the array.
   * @param kind The schema type of every child in the array.
   * @returns An array schema bound to a certain type.
   * @example const schema = t.array("My List", t.u8())
   */
  export const array: <L extends string, const T extends Schema>(label: L, kind: T) => List<L, T> = List.t;
  /**
   * String - a dynamic or fixed length string. Fixed length if a `fixedLength` option is provided, otherwise dynamic.
   *
   * Bytes depends on the size of the string at encode time or `fixedLength` if provided. Uses `TextEncoder`.
   *
   * @param label Optional label describing the string
   * @param fixedLength If you know the string being encoded is always the same size, save space by providing a fixedLength, this will avoid 4 extra bytes being encoded for the length.
   * @returns A String schema
   * @example const schema = t.str()
   */
  export const str: <L extends string>(label?: L, fixedLength?: number) => Str<L> = Str.t;

  /**
   * Union - a choice between different schemas. The union index must be provided in the data as it is encoded into the data for 1 byte.
   *
   * @param label Required label describing the union
   * @param schemas An array of schemas that can possibly take this place in the array buffer
   * @returns A Union schema
   * @example
   *
   * const schema = t.union("My Union", [t.u8(), t.i64()])
   * // This schema can encode either a u8 or a i64
   * const data: Infer<typeof schema> = [0, 255] // first item in the union, 0 is the index of the union choices, so u8 gere
   * // or
   * const data2: Infer<typeof schema> = [1, -90_000] // second item in the union, 1 is the index of the union choices, so i64 here
   *
   * encode(schema, data) // or data2
   */
  export const union: <L extends string, const T extends Schema[]>(label: L, schemas: T) => Union<L, T> = Union.t;

  /**
   * Buffer - an existing array buffer to include with the other data.
   *
   * @param label Optional label describing the data in the buffer
   * @returns A buffer schema
   * @example
   *
   * const schema = t.buffer()
   * const data: Infer<typeof schema> = new ArrayBuffer(20)
   * schema.bytes(data) // 24 -- 20 + 4 bytes for the byte length
   */
  export const buffer: <L extends string>(label?: L) => Buffer<L> = Buffer.t;
}

/**
 * Helper type for extracting the Schema base type from the Schema.
 *
 * @example
 * const schema = t.tuple("My Tuple", [t.u8(), t.u8()])
 *
 * type Schema = Infer<typeof schema>
 * // Schema is type: [number, number]
 */
export type Infer<S extends Schema> = S["t"];

/**
 * Encode some data into a binary ArrayBuffer using the given schema.
 * @param schema The schema to use to encode the data into binary.
 * @param data The data to encode into the ArrayBuffer.
 * @returns An ArrayBuffer that holds the binary data in the shape of the schema.
 */
export function encode<S extends Schema>(schema: S, data: Infer<S>): ArrayBuffer {
  const buffer = new ArrayBuffer(schema.bytes(data));
  const dataview = new DataView(buffer);
  schema.encode(dataview, 0, data);
  return buffer;
}

/**
 * Decode an existing ArrayBuffer using the given schema.
 * @param schema The schema to use to decode the binary data.
 * @param buffer The Array Buffer that holds the raw binary data.
 * @returns The decoded data from the buffer that matches the schema shape.
 */
export function decode<S extends Schema>(schema: S, buffer: ArrayBuffer): Infer<S> {
  const dataview = new DataView(buffer);
  return schema.decode(dataview, 0);
}

/**
 * Helpers for handling bits.
 * Convert a uint8 number (0-255) to 8 bits, or 8 bits to one uint8 number for convenient storage.
 */
export namespace Bits {
  /**
   * 8 boolean values in a tuple.
   */
  export type Type = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

  /**
   * Convert a bits tuple into a single uint8 number.
   * @param bits The array of 8 boolean values.
   * @returns The uint8 number (0-255) representing the bits.
   */
  export function to(bits: Type): number {
    let uint8 = 0;
    for (let i = 0; i < 8; i++) {
      if (bits[i]) {
        uint8 |= 1 << (7 - i);
      }
    }

    return uint8;
  }

  /**
   * Converts a uint8 number (0-255) to a tuple of 8 booleans.
   * @param uint8 A number between 0-255
   * @returns A tuple of 8 booleans.
   */
  export function from(uint8: number): Type {
    if (uint8 < 0 || uint8 > 255) {
      throw new Error("Input must be a uint8 number (0-255)");
    }

    const bits = [];
    for (let i = 7; i >= 0; i--) {
      bits.push(!!(uint8 & (1 << i)));
    }

    return bits as Type;
  }
}
