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

describe("multiply", () => {
	it("multiplies two vectors component-wise", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.multiply(out, { x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 })).toEqual({
			x: 4,
			y: 10,
			z: 18,
		});
	});

	it("defaults missing components of v2 to 1", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.multiply(out, { x: 1, y: 2, z: 3 }, { x: 4 })).toEqual({ x: 4, y: 2, z: 3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.multiply(out, { x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 });
		expect(result).toBe(out);
	});
});

describe("multiplyScalar", () => {
	it("multiplies a vector by a scalar", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.multiplyScalar(out, { x: 1, y: 2, z: 3 }, 2)).toEqual({ x: 2, y: 4, z: 6 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.multiplyScalar(out, { x: 1, y: 2, z: 3 }, 2);
		expect(result).toBe(out);
	});
});

describe("divide", () => {
	it("divides one vector by another component-wise", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.divide(out, { x: 4, y: 10, z: 18 }, { x: 4, y: 5, z: 6 })).toEqual({
			x: 1,
			y: 2,
			z: 3,
		});
	});

	it("defaults missing components of v2 to 1", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.divide(out, { x: 4, y: 2, z: 3 }, { x: 4 })).toEqual({ x: 1, y: 2, z: 3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.divide(out, { x: 4, y: 10, z: 18 }, { x: 4, y: 5, z: 6 });
		expect(result).toBe(out);
	});
});

describe("divideScalar", () => {
	it("divides a vector by a scalar", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.divideScalar(out, { x: 2, y: 4, z: 6 }, 2)).toEqual({ x: 1, y: 2, z: 3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.divideScalar(out, { x: 2, y: 4, z: 6 }, 2);
		expect(result).toBe(out);
	});
});

describe("lengthSq", () => {
	it("returns the squared length of a vector", () => {
		expect(Vec3.lengthSq({ x: 1, y: 2, z: 2 })).toBe(9);
	});

	it("returns 0 for the zero vector", () => {
		expect(Vec3.lengthSq({ x: 0, y: 0, z: 0 })).toBe(0);
	});
});

describe("length", () => {
	it("returns the length of a vector", () => {
		expect(Vec3.length({ x: 1, y: 2, z: 2 })).toBe(3);
		expect(Vec3.length({ x: 3, y: 4, z: 0 })).toBe(5);
	});

	it("returns 0 for the zero vector", () => {
		expect(Vec3.length({ x: 0, y: 0, z: 0 })).toBe(0);
	});
});
