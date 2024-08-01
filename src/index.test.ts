import { expect, test } from "bun:test";
import { Bits, type Infer, decode, encode, t } from ".";

test("i8", () => {
  const schema = t.i8();
  expect(schema.bytes()).toBe(1);

  const value = -9;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(1);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setInt8(0, value);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("u8", () => {
  const schema = t.u8();
  expect(schema.bytes()).toBe(1);

  const value = 100;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(1);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setUint8(0, value);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("i16", () => {
  const schema = t.i16();
  expect(schema.bytes()).toBe(2);

  const value = -900;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(2);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setInt16(0, value);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("u16", () => {
  const schema = t.u16();
  expect(schema.bytes()).toBe(2);

  const value = 900;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(2);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setUint16(0, value);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("i32", () => {
  const schema = t.i32();
  expect(schema.bytes()).toBe(4);

  const value = -9000;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(4);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setInt32(0, value);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("u32", () => {
  const schema = t.u32();
  expect(schema.bytes()).toBe(4);

  const value = 9000;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(4);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setUint32(0, value);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("i64", () => {
  const schema = t.i64();
  expect(schema.bytes()).toBe(8);

  const value = -90000n;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(8);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setBigInt64(0, value, true);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("u64", () => {
  const schema = t.u64();
  expect(schema.bytes()).toBe(8);

  const value = 90000n;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(8);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setBigUint64(0, value, true);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("f32", () => {
  const schema = t.f32();
  expect(schema.bytes()).toBe(4);

  const value = 90.5;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(4);

  const expected = new DataView(new ArrayBuffer(schema.bytes()));
  expected.setFloat32(0, value);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("f64", () => {
  const schema = t.f64();
  const bytes = schema.bytes();
  expect(bytes).toBe(8);

  const value = 99999.5;
  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(bytes);

  const expected = new DataView(new ArrayBuffer(bytes));
  expected.setFloat64(0, value, true);

  const out = decode(schema, buffer);
  expect(buffer).toStrictEqual(expected.buffer);
  expect(out).toEqual(value);
});

test("str - dynamic", () => {
  const schema = t.str();
  const value = "hello";
  const bytes = schema.bytes(value);
  expect(bytes).toBe(9);

  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(bytes);

  const out = decode(schema, buffer);
  expect(out).toEqual(value);
});

test("str - fixed", () => {
  const schema = t.str("My String", 5);
  const value = "hello";
  const bytes = schema.bytes(value);
  expect(bytes).toBe(5);

  const buffer = encode(schema, value);
  expect(buffer.byteLength).toBe(bytes);

  const out = decode(schema, buffer);
  expect(out).toEqual(value);
});

test("str - fixed with incorrect length", () => {
  const schema = t.str("My String", 5);
  const value = "this is bigger than 5 bytes";
  expect(() => encode(schema, value)).toThrowError();
});

test("tuple - only primitives", () => {
  const schema = t.tuple("Some Tuple", [t.i8(), t.u8(), t.i16(), t.u16(), t.i32(), t.u32(), t.i64(), t.u64()]);
  const values: Infer<typeof schema> = [-5, 9, -8, 10, -800, 1000, -100_000n, 100_000n];
  const bytes = schema.bytes(values);
  const buffer = encode(schema, values);

  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getInt8(0)).toBe(values[0]);
  expect(view.getUint8(1)).toBe(values[1]);
  expect(view.getInt16(2)).toBe(values[2]);
  expect(view.getUint16(4)).toBe(values[3]);
  expect(view.getInt32(6)).toBe(values[4]);
  expect(view.getUint32(10)).toBe(values[5]);
  expect(view.getBigInt64(14, true)).toBe(values[6]);
  expect(view.getBigUint64(22, true)).toBe(values[7]);
});

test("tuple - nested", () => {
  const schema = t.tuple("Some Tuple", [
    t.u8(),
    t.tuple("Nested", [t.u8(), t.tuple("Double", [t.u8(), t.u16(), t.u32(), t.u8()])]),
    t.u8(),
  ]);
  const values: Infer<typeof schema> = [5, [9, [100, 101, 102, 103]], 8];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(11);
  // const buffer = encode(schema, values);
  // expect(buffer.byteLength).toBe(bytes);

  // const view = new DataView(buffer);
  // expect(view.getUint8(0)).toBe(values[0]); // 5
  // expect(view.getUint8(1)).toBe(values[1][0]); // 9
  // expect(view.getUint8(2)).toBe(values[1][1][0]); // 100
  // expect(view.getUint16(3)).toBe(values[1][1][1]); // 101
  // expect(view.getUint32(5)).toBe(values[1][1][2]); // 102
  // expect(view.getUint8(9)).toBe(values[1][1][3]); // 103
  // expect(view.getUint8(10)).toBe(values[2]); // 8
});

test("array - u8", () => {
  const schema = t.array("Some Array", t.u8());
  const values: Infer<typeof schema> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(14); // 1 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getUint8(4)).toBe(values[0]);
  expect(view.getUint8(5)).toBe(values[1]);
  expect(view.getUint8(6)).toBe(values[2]);
  expect(view.getUint8(7)).toBe(values[3]);
  expect(view.getUint8(8)).toBe(values[4]);
  expect(view.getUint8(9)).toBe(values[5]);
  expect(view.getUint8(10)).toBe(values[6]);
  expect(view.getUint8(11)).toBe(values[7]);
  expect(view.getUint8(12)).toBe(values[8]);
  expect(view.getUint8(13)).toBe(values[9]);
});

test("array - u16", () => {
  const schema = t.array("Some Array", t.u16());
  const values: Infer<typeof schema> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(24); // 2 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getUint16(4)).toBe(values[0]);
  expect(view.getUint16(6)).toBe(values[1]);
  expect(view.getUint16(8)).toBe(values[2]);
  expect(view.getUint16(10)).toBe(values[3]);
  expect(view.getUint16(12)).toBe(values[4]);
  expect(view.getUint16(14)).toBe(values[5]);
  expect(view.getUint16(16)).toBe(values[6]);
  expect(view.getUint16(18)).toBe(values[7]);
  expect(view.getUint16(20)).toBe(values[8]);
  expect(view.getUint16(22)).toBe(values[9]);
});

test("array - u32", () => {
  const schema = t.array("Some Array", t.u32());
  const values: Infer<typeof schema> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(44); // 4 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getUint32(4)).toBe(values[0]);
  expect(view.getUint32(8)).toBe(values[1]);
  expect(view.getUint32(12)).toBe(values[2]);
  expect(view.getUint32(16)).toBe(values[3]);
  expect(view.getUint32(20)).toBe(values[4]);
  expect(view.getUint32(24)).toBe(values[5]);
  expect(view.getUint32(28)).toBe(values[6]);
  expect(view.getUint32(32)).toBe(values[7]);
  expect(view.getUint32(36)).toBe(values[8]);
  expect(view.getUint32(40)).toBe(values[9]);
});

test("array - u64", () => {
  const schema = t.array("Some Array", t.u64());
  const values: Infer<typeof schema> = [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n, 10n];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(84); // 8 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getBigUint64(4, true)).toBe(values[0]);
  expect(view.getBigUint64(8 * 1 + 4, true)).toBe(values[1]);
  expect(view.getBigUint64(8 * 2 + 4, true)).toBe(values[2]);
  expect(view.getBigUint64(8 * 3 + 4, true)).toBe(values[3]);
  expect(view.getBigUint64(8 * 4 + 4, true)).toBe(values[4]);
  expect(view.getBigUint64(8 * 5 + 4, true)).toBe(values[5]);
  expect(view.getBigUint64(8 * 6 + 4, true)).toBe(values[6]);
  expect(view.getBigUint64(8 * 7 + 4, true)).toBe(values[7]);
  expect(view.getBigUint64(8 * 8 + 4, true)).toBe(values[8]);
  expect(view.getBigUint64(8 * 9 + 4, true)).toBe(values[9]);
});

test("array - i8", () => {
  const schema = t.array("Some Array", t.i8());
  const values: Infer<typeof schema> = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(14); // 1 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getInt8(4)).toBe(values[0]);
  expect(view.getInt8(5)).toBe(values[1]);
  expect(view.getInt8(6)).toBe(values[2]);
  expect(view.getInt8(7)).toBe(values[3]);
  expect(view.getInt8(8)).toBe(values[4]);
  expect(view.getInt8(9)).toBe(values[5]);
  expect(view.getInt8(10)).toBe(values[6]);
  expect(view.getInt8(11)).toBe(values[7]);
  expect(view.getInt8(12)).toBe(values[8]);
  expect(view.getInt8(13)).toBe(values[9]);
});

test("array - i16", () => {
  const schema = t.array("Some Array", t.i16());
  const values: Infer<typeof schema> = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(24); // 2 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getInt16(4)).toBe(values[0]);
  expect(view.getInt16(6)).toBe(values[1]);
  expect(view.getInt16(8)).toBe(values[2]);
  expect(view.getInt16(10)).toBe(values[3]);
  expect(view.getInt16(12)).toBe(values[4]);
  expect(view.getInt16(14)).toBe(values[5]);
  expect(view.getInt16(16)).toBe(values[6]);
  expect(view.getInt16(18)).toBe(values[7]);
  expect(view.getInt16(20)).toBe(values[8]);
  expect(view.getInt16(22)).toBe(values[9]);
});

test("array - i32", () => {
  const schema = t.array("Some Array", t.i32());
  const values: Infer<typeof schema> = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(44); // 4 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getInt32(4)).toBe(values[0]);
  expect(view.getInt32(8)).toBe(values[1]);
  expect(view.getInt32(12)).toBe(values[2]);
  expect(view.getInt32(16)).toBe(values[3]);
  expect(view.getInt32(20)).toBe(values[4]);
  expect(view.getInt32(24)).toBe(values[5]);
  expect(view.getInt32(28)).toBe(values[6]);
  expect(view.getInt32(32)).toBe(values[7]);
  expect(view.getInt32(36)).toBe(values[8]);
  expect(view.getInt32(40)).toBe(values[9]);
});

test("array - i64", () => {
  const schema = t.array("Some Array", t.i64());
  const values: Infer<typeof schema> = [-1n, -2n, -3n, -4n, -5n, -6n, -7n, -8n, -9n, -10n];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(84); // 8 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getBigInt64(4, true)).toBe(values[0]);
  expect(view.getBigInt64(8 * 1 + 4, true)).toBe(values[1]);
  expect(view.getBigInt64(8 * 2 + 4, true)).toBe(values[2]);
  expect(view.getBigInt64(8 * 3 + 4, true)).toBe(values[3]);
  expect(view.getBigInt64(8 * 4 + 4, true)).toBe(values[4]);
  expect(view.getBigInt64(8 * 5 + 4, true)).toBe(values[5]);
  expect(view.getBigInt64(8 * 6 + 4, true)).toBe(values[6]);
  expect(view.getBigInt64(8 * 7 + 4, true)).toBe(values[7]);
  expect(view.getBigInt64(8 * 8 + 4, true)).toBe(values[8]);
  expect(view.getBigInt64(8 * 9 + 4, true)).toBe(values[9]);
});

test("array - f32", () => {
  const schema = t.array("Some Array", t.f32());
  const values: Infer<typeof schema> = [-1.5, -2.5, -3.5, -4.5, -5.5, 6.5, 7.5, 8.5, 9.5, 10.5];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(44); // 4 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getFloat32(4)).toBe(values[0]);
  expect(view.getFloat32(8)).toBe(values[1]);
  expect(view.getFloat32(12)).toBe(values[2]);
  expect(view.getFloat32(16)).toBe(values[3]);
  expect(view.getFloat32(20)).toBe(values[4]);
  expect(view.getFloat32(24)).toBe(values[5]);
  expect(view.getFloat32(28)).toBe(values[6]);
  expect(view.getFloat32(32)).toBe(values[7]);
  expect(view.getFloat32(36)).toBe(values[8]);
  expect(view.getFloat32(40)).toBe(values[9]);
});

test("array - f64", () => {
  const schema = t.array("Some Array", t.f64());
  const values: Infer<typeof schema> = [-1.5, -2.5, -3.5, -4.5, -5.5, -6.5, -7.5, -8.5, -9.5, -10.5];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(84); // 8 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getFloat64(4, true)).toBe(values[0]);
  expect(view.getFloat64(8 * 1 + 4, true)).toBe(values[1]);
  expect(view.getFloat64(8 * 2 + 4, true)).toBe(values[2]);
  expect(view.getFloat64(8 * 3 + 4, true)).toBe(values[3]);
  expect(view.getFloat64(8 * 4 + 4, true)).toBe(values[4]);
  expect(view.getFloat64(8 * 5 + 4, true)).toBe(values[5]);
  expect(view.getFloat64(8 * 6 + 4, true)).toBe(values[6]);
  expect(view.getFloat64(8 * 7 + 4, true)).toBe(values[7]);
  expect(view.getFloat64(8 * 8 + 4, true)).toBe(values[8]);
  expect(view.getFloat64(8 * 9 + 4, true)).toBe(values[9]);
});

test("array with tuple", () => {
  const schema = t.array("Some Array", t.tuple("Im in an array", [t.u8(), t.u8()]));
  const values: Infer<typeof schema> = [
    [1, 1],
    [2, 2],
    [3, 3],
  ];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(10); // 2 per item + 4 at the start for the count
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(bytes);

  const view = new DataView(buffer);
  expect(view.getUint32(0)).toBe(values.length);
  expect(view.getUint8(4)).toBe(values[0][0]);
  expect(view.getUint8(5)).toBe(values[0][1]);
  expect(view.getUint8(6)).toBe(values[1][0]);
  expect(view.getUint8(7)).toBe(values[1][1]);
  expect(view.getUint8(8)).toBe(values[2][0]);
  expect(view.getUint8(9)).toBe(values[2][1]);
});

test("tuple with array", () => {
  const schema = t.tuple("My tuple", [t.u8(), t.array("Im in an array", t.u8()), t.u8()]);
  const values: Infer<typeof schema> = [100, [1, 3], 200];
  const bytes = schema.bytes(values);
  expect(bytes).toBe(8); // [1, [1,1], 1] + 4 for array length
  const buffer = encode(schema, values);
  expect(buffer.byteLength).toBe(schema.bytes(values));

  const view = new DataView(buffer);
  expect(view.getUint8(0)).toBe(values[0]);
  expect(view.getUint32(1)).toBe(values[1].length);
  expect(view.getUint8(5)).toBe(values[1][0]);
  expect(view.getUint8(6)).toBe(values[1][1]);
  expect(view.getUint8(7)).toBe(values[2]);
});

test("Bits", () => {
  const bits1: Bits.Type = [true, true, true, true, true, true, true, true];
  const num1 = Bits.to(bits1);
  expect(num1).toBe(255);
  expect(Bits.from(num1)).toStrictEqual(bits1);

  const bits2: Bits.Type = [false, false, false, false, false, false, false, false];
  const num2 = Bits.to(bits2);
  expect(num2).toBe(0);
  expect(Bits.from(num2)).toStrictEqual(bits2);

  const bits3: Bits.Type = [true, false, true, false, true, false, true, false];
  const num3 = Bits.to(bits3);
  expect(Bits.from(num3)).toStrictEqual(bits3);

  const bits4: Bits.Type = [false, true, false, true, false, true, false, true];
  const num4 = Bits.to(bits4);
  expect(Bits.from(num4)).toStrictEqual(bits4);

  const bits5: Bits.Type = [false, false, false, false, true, true, true, true];
  const num5 = Bits.to(bits5);
  expect(Bits.from(num5)).toStrictEqual(bits5);

  const bits6: Bits.Type = [true, true, true, true, false, false, false, false];
  const num6 = Bits.to(bits6);
  expect(Bits.from(num6)).toStrictEqual(bits6);
});

test("bytes", () => {
  expect(t.u8().bytes()).toBe(1);
  expect(t.u16().bytes()).toBe(2);
  expect(t.u32().bytes()).toBe(4);
  expect(t.u64().bytes()).toBe(8);
  expect(t.i8().bytes()).toBe(1);
  expect(t.i16().bytes()).toBe(2);
  expect(t.i32().bytes()).toBe(4);
  expect(t.i64().bytes()).toBe(8);
  expect(t.f32().bytes()).toBe(4);
  expect(t.f64().bytes()).toBe(8);

  expect(t.str().bytes("")).toBe(4);
  expect(t.str().bytes("h")).toBe(5);
  expect(t.str().bytes("hello")).toBe(9);

  expect(t.tuple("", []).bytes([])).toBe(0);
  expect(t.tuple("", [t.u8()]).bytes([1])).toBe(1);
  expect(t.tuple("", [t.u8(), t.u16()]).bytes([1, 1])).toBe(3);
  expect(t.tuple("", [t.u8(), t.array("", t.u8())]).bytes([1, [1]])).toBe(1 + 4 + 1);

  expect(t.array("", t.u8()).bytes([])).toBe(4);
  expect(t.array("", t.u8()).bytes([1])).toBe(5);
  expect(t.array("", t.u16()).bytes([1, 1])).toBe(8);
  expect(t.array("", t.tuple("", [t.u8(), t.u8()])).bytes([[1, 1]])).toBe(4 + 1 + 1);
});
