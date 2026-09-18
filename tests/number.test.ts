import { clampNumber, degToRad, radToDeg, randomFloat, randomInt } from "@src/number";
import { describe, expect, it } from "bun:test";

describe("clampNumber", () => {
	it("returns value when within range", () => {
		expect(clampNumber(5, 0, 10)).toBe(5);
	});

	it("clamps to min or max when outside range", () => {
		expect(clampNumber(-5, 0, 10)).toBe(0);
		expect(clampNumber(15, 0, 10)).toBe(10);
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

describe("randomInt", () => {
	it("returns an integer within the inclusive range", () => {
		for (let i = 0; i < 100; i++) {
			const value = randomInt(1, 5);
			expect(Number.isInteger(value)).toBe(true);
			expect(value).toBeGreaterThanOrEqual(1);
			expect(value).toBeLessThanOrEqual(5);
		}
	});

	it("returns min when min equals max", () => {
		expect(randomInt(3, 3)).toBe(3);
	});
});

describe("randomFloat", () => {
	it("returns a float within the range [min, max)", () => {
		for (let i = 0; i < 100; i++) {
			const value = randomFloat(1, 5);
			expect(value).toBeGreaterThanOrEqual(1);
			expect(value).toBeLessThan(5);
		}
	});

	it("returns min when min equals max", () => {
		expect(randomFloat(3, 3)).toBe(3);
	});
});
