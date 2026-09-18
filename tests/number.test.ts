import { clamp, degToRad, radToDeg } from "@src/number";
import { describe, expect, it } from "bun:test";

describe("clamp", () => {
	it("returns value when within range", () => {
		expect(clamp(5, 0, 10)).toBe(5);
	});

	it("clamps to min or max when outside range", () => {
		expect(clamp(-5, 0, 10)).toBe(0);
		expect(clamp(15, 0, 10)).toBe(10);
	});
});

describe("degToRad", () => {
	it("converts degrees to radians", () => {
		expect(degToRad(180)).toBe(Math.PI);
		expect(degToRad(90)).toBe(Math.PI / 2);
		expect(degToRad(0)).toBe(0);
	});
});

describe("radToDeg", () => {
	it("converts radians to degrees", () => {
		expect(radToDeg(Math.PI)).toBe(180);
		expect(radToDeg(Math.PI / 2)).toBe(90);
		expect(radToDeg(0)).toBe(0);
	});
});
