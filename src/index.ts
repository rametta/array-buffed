// 1 byte  - 8-bit  byte  -128 to 127
// 2 bytes - 16-bit short -32,768 to 32,767
// 4 bytes - 32-bit int   -2,147,483,648 to 2,147,483,647
// 8 bytes - 64-bit long  -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

// 1 byte  - 8-bit  ubyte  0 to 255
// 2 bytes - 16-bit ushort 0 to 65,535
// 4 bytes - 32-bit uint   0 to 4,294,967,295
// 8 bytes - 64-bit ulong  0 to 18,446,744,073,709,551,615

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

type RemapTuple<T extends any[]> = {
  [K in keyof T]: ExtractT<T[K]>;
};

export abstract class Schema<const Name extends string = string, const T = any> {
  readonly name: Name = undefined as any;
  readonly label: string = undefined as any;
  readonly t: T = undefined as any;
  abstract encode(dataview: DataView, offset: number, value: T): void;
  abstract decode(dataview: DataView, offset: number): T;
  abstract bytes(data: any[]): number;
}

class i8<const Label extends string> extends Schema<"Int8", number> {
  encode(dataview: DataView, offset: number, value: number): void {
    dataview.setInt8(offset, value);
  }

  decode(dataview: DataView, offset: number): number {
    return dataview.getInt8(offset);
  }

  bytes() {
    return Int8Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new i8<L>();
  }
}

class u8<const Label extends string> extends Schema<"UInt8", number> {
  encode(dataview: DataView, offset: number, value: number): void {
    dataview.setUint8(offset, value);
  }

  decode(dataview: DataView, offset: number): number {
    return dataview.getUint8(offset);
  }

  bytes() {
    return Uint8Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new u8<L>();
  }
}

class i16<const Label extends string> extends Schema<"Int16", number> {
  encode(dataview: DataView, offset: number, value: number): void {
    dataview.setInt16(offset, value);
  }

  decode(dataview: DataView, offset: number): number {
    return dataview.getInt16(offset);
  }

  bytes() {
    return Int16Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new i16<L>();
  }
}

class u16<const Label extends string> extends Schema<"UInt16", number> {
  encode(dataview: DataView, offset: number, value: number): void {
    dataview.setUint16(offset, value);
  }

  decode(dataview: DataView, offset: number): number {
    return dataview.getUint16(offset);
  }

  bytes() {
    return Uint16Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new u16<L>();
  }
}

class i32<const Label extends string> extends Schema<"Int32", number> {
  encode(dataview: DataView, offset: number, value: number): void {
    dataview.setInt32(offset, value);
  }

  decode(dataview: DataView, offset: number): number {
    return dataview.getInt32(offset);
  }

  bytes() {
    return Int32Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new i32<L>();
  }
}

class u32<const Label extends string> extends Schema<"UInt32", number> {
  encode(dataview: DataView, offset: number, value: number): void {
    dataview.setUint32(offset, value);
  }

  decode(dataview: DataView, offset: number): number {
    return dataview.getUint32(offset);
  }

  bytes() {
    return Uint32Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new u32<L>();
  }
}

class i64<const Label extends string> extends Schema<"Int64", bigint> {
  encode(dataview: DataView, offset: number, value: bigint): void {
    dataview.setBigInt64(offset, value, true);
  }

  decode(dataview: DataView, offset: number): bigint {
    return dataview.getBigInt64(offset, true);
  }

  bytes() {
    return BigInt64Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new i64<L>();
  }
}

class u64<const Label extends string> extends Schema<"UInt64", bigint> {
  encode(dataview: DataView, offset: number, value: bigint): void {
    dataview.setBigUint64(offset, value, true);
  }

  decode(dataview: DataView, offset: number): bigint {
    return dataview.getBigUint64(offset, true);
  }

  bytes() {
    return BigInt64Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new u64<L>();
  }
}

class f32<const Label extends string> extends Schema<"Float32", number> {
  encode(dataview: DataView, offset: number, value: number): void {
    dataview.setFloat32(offset, value);
  }

  decode(dataview: DataView, offset: number): number {
    return dataview.getFloat32(offset);
  }

  bytes() {
    return Float32Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new f32<L>();
  }
}

class f64<const Label extends string> extends Schema<"Float64", number> {
  encode(dataview: DataView, offset: number, value: number): void {
    dataview.setFloat64(offset, value, true);
  }

  decode(dataview: DataView, offset: number): number {
    return dataview.getFloat64(offset, true);
  }

  bytes() {
    return Float64Array.BYTES_PER_ELEMENT;
  }

  static t<L extends string = string>(label?: L) {
    return new f64<L>();
  }
}

class tuple<const Label extends string, const T extends Schema[]> extends Schema<"Tuple", RemapTuple<T>> {
  readonly name = "Tuple";
  readonly elements: T;

  constructor(children: T) {
    super();
    this.elements = children;
  }

  encode(dataview: DataView, offset: number, value: RemapTuple<T>): void {
    let localOffset = 0;
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].encode(dataview, offset + localOffset, value[i]);
      localOffset += this.elements[i].bytes(value[i]);
    }
  }

  decode(dataview: DataView, offset: number): RemapTuple<T> {
    const results: RemapTuple<T> = [] as any;

    let localOffset = 0;
    for (const element of this.elements) {
      const data = element.decode(dataview, offset + localOffset);
      results.push(data);
      localOffset += element.bytes(data);
    }

    return results;
  }

  bytes(data: RemapTuple<T>) {
    return this.elements.reduce((acc, element, index) => acc + element.bytes(data[index]), 0);
  }

  static t<L extends string, const T extends Schema[]>(label: L, children: T) {
    return new tuple<L, T>(children);
  }
}

class array<const Label extends string, const T extends Schema> extends Schema<"Array", T["t"][]> {
  readonly name = "Array";
  readonly #kind: T;

  constructor(kind: T) {
    super();
    this.#kind = kind;
  }

  encode(dataview: DataView, offset: number, values: T["t"][]): void {
    dataview.setUint32(offset, values.length);
    let localOffset = Uint32Array.BYTES_PER_ELEMENT;
    for (const value of values) {
      this.#kind.encode(dataview, offset + localOffset, value);
      localOffset += this.#kind.bytes(value);
    }
  }

  decode(dataview: DataView, offset: number): T["t"][] {
    const results: T["t"][] = [];

    const count = dataview.getUint32(offset);
    let localOffset = Uint32Array.BYTES_PER_ELEMENT;
    for (let i = 0; i < count; i++) {
      const data = this.#kind.decode(dataview, offset + localOffset);
      results.push(data);
      localOffset += this.#kind.bytes(data);
    }

    return results;
  }

  bytes(data: T["t"][]) {
    return this.#kind.bytes(data) * data.length + 4; // 4 to hold the count of items in the array
  }

  static t<L extends string, const T extends Schema>(label: L, kind: T) {
    return new array<L, T>(kind);
  }
}

export const t = {
  i8: i8.t,
  u8: u8.t,
  i16: i16.t,
  u16: u16.t,
  i32: i32.t,
  u32: u32.t,
  i64: i64.t,
  u64: u64.t,
  f32: f32.t,
  f64: f64.t,
  tuple: tuple.t,
  array: array.t,
  // union: union.t // TODO
} as const;

export type Infer<S extends Schema> = S["t"];

export function encode<S extends Schema>(schema: S, data: Infer<S>): ArrayBuffer {
  const buffer = new ArrayBuffer(schema.bytes(data));
  const dataview = new DataView(buffer);
  schema.encode(dataview, 0, data);
  return buffer;
}

export function decode<S extends Schema>(schema: S, buffer: ArrayBuffer): Infer<S> {
  const dataview = new DataView(buffer);
  return schema.decode(dataview, 0);
}

export namespace Bits {
  export type Type = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

  export function to(bits: Type): number {
    let uint8 = 0;
    for (let i = 0; i < 8; i++) {
      if (bits[i]) {
        uint8 |= 1 << (7 - i);
      }
    }

    return uint8;
  }

  export function from(uint8: number): Type {
    if (uint8 < 0 || uint8 > 255) {
      throw new Error("Input must be a uint8 number (0-255)");
    }

    let bits = [];
    for (let i = 7; i >= 0; i--) {
      bits.push(!!(uint8 & (1 << i)));
    }

    return bits as Type;
  }
}
