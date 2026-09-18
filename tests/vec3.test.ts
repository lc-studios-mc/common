import { Vec3 } from "@src/index";
import { describe, expect, it } from "bun:test";

describe("create", () => {
	it("creates a vector from the given components", () => {
		expect(Vec3.create({ x: 1, y: 2, z: 3 })).toEqual({ x: 1, y: 2, z: 3 });
	});

	it("defaults missing components to 0", () => {
		expect(Vec3.create({ x: 5 })).toEqual({ x: 5, y: 0, z: 0 });
		expect(Vec3.create()).toEqual({ x: 0, y: 0, z: 0 });
	});
});

describe("add", () => {
	it("adds two vectors component-wise", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.add(out, { x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 })).toEqual({
			x: 5,
			y: 7,
			z: 9,
		});
	});

	it("defaults missing components of v2 to 0", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.add(out, { x: 1, y: 2, z: 3 }, { x: 1 })).toEqual({ x: 2, y: 2, z: 3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.add(out, { x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 });
		expect(result).toBe(out);
	});
});

describe("subtract", () => {
	it("subtracts one vector from another component-wise", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.subtract(out, { x: 4, y: 5, z: 6 }, { x: 1, y: 2, z: 3 })).toEqual({
			x: 3,
			y: 3,
			z: 3,
		});
	});

	it("defaults missing components of v2 to 0", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.subtract(out, { x: 4, y: 5, z: 6 }, { x: 1 })).toEqual({ x: 3, y: 5, z: 6 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.subtract(out, { x: 4, y: 5, z: 6 }, { x: 1, y: 2, z: 3 });
		expect(result).toBe(out);
	});
});
