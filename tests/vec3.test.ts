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

describe("distanceSq", () => {
	it("returns the squared distance between two vectors", () => {
		expect(Vec3.distanceSq({ x: 1, y: 2, z: 3 }, { x: 2, y: 4, z: 5 })).toBe(9);
	});

	it("returns 0 for identical vectors", () => {
		expect(Vec3.distanceSq({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 })).toBe(0);
	});
});

describe("distance", () => {
	it("returns the distance between two vectors", () => {
		expect(Vec3.distance({ x: 1, y: 2, z: 3 }, { x: 2, y: 4, z: 5 })).toBe(3);
		expect(Vec3.distance({ x: 0, y: 0, z: 0 }, { x: 3, y: 4, z: 0 })).toBe(5);
	});

	it("is symmetric", () => {
		const a = { x: 1, y: 2, z: 3 };
		const b = { x: -4, y: 6, z: 0 };
		expect(Vec3.distance(a, b)).toBe(Vec3.distance(b, a));
	});

	it("returns 0 for identical vectors", () => {
		expect(Vec3.distance({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 })).toBe(0);
	});
});

describe("dot", () => {
	it("returns the dot product of two vectors", () => {
		expect(Vec3.dot({ x: 1, y: 2, z: 3 }, { x: 4, y: -5, z: 6 })).toBe(12);
	});

	it("returns 0 for perpendicular vectors", () => {
		expect(Vec3.dot({ x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 })).toBe(0);
	});
});

describe("cross", () => {
	it("returns the cross product of two vectors", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.cross(out, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 })).toEqual({
			x: 0,
			y: 0,
			z: 1,
		});
		expect(Vec3.cross(out, { x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 })).toEqual({
			x: -3,
			y: 6,
			z: -3,
		});
	});

	it("is anti-commutative", () => {
		const a = { x: 1, y: 2, z: 3 };
		const b = { x: 4, y: 5, z: 6 };
		const ab = Vec3.cross({ x: 0, y: 0, z: 0 }, a, b);
		const ba = Vec3.cross({ x: 0, y: 0, z: 0 }, b, a);
		expect(ab).toEqual({ x: -ba.x, y: -ba.y, z: -ba.z });
	});

	it("works when out is the same object as an input", () => {
		const v1 = { x: 1, y: 2, z: 3 };
		expect(Vec3.cross(v1, v1, { x: 4, y: 5, z: 6 })).toEqual({ x: -3, y: 6, z: -3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.cross(out, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 });
		expect(result).toBe(out);
	});
});

describe("normalize", () => {
	it("scales a vector to a length of 1", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.normalize(out, { x: 0, y: 3, z: 4 })).toEqual({ x: 0, y: 0.6, z: 0.8 });
		expect(Vec3.length(out)).toBeCloseTo(1);
	});

	it("returns a zero vector for a zero-length vector", () => {
		const out = { x: 1, y: 2, z: 3 };
		expect(Vec3.normalize(out, { x: 0, y: 0, z: 0 })).toEqual({ x: 0, y: 0, z: 0 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.normalize(out, { x: 0, y: 3, z: 4 });
		expect(result).toBe(out);
	});
});
