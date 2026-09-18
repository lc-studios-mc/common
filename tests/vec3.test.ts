import type { Vector3 } from "@minecraft/server";
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

describe("angle", () => {
	it("returns PI / 2 for perpendicular vectors", () => {
		expect(Vec3.angle({ x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 })).toBeCloseTo(Math.PI / 2);
	});

	it("returns 0 for parallel vectors regardless of length", () => {
		expect(Vec3.angle({ x: 1, y: 2, z: 3 }, { x: 2, y: 4, z: 6 })).toBe(0);
	});

	it("returns PI for opposite vectors", () => {
		expect(Vec3.angle({ x: 1, y: 0, z: 0 }, { x: -3, y: 0, z: 0 })).toBeCloseTo(Math.PI);
	});

	it("returns 0 if either vector is zero", () => {
		expect(Vec3.angle({ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 })).toBe(0);
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

describe("floor", () => {
	it("rounds each component down", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.floor(out, { x: 1.7, y: -1.2, z: 3 })).toEqual({ x: 1, y: -2, z: 3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.floor(out, { x: 1.5, y: 2.5, z: 3.5 })).toBe(out);
	});
});

describe("ceil", () => {
	it("rounds each component up", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.ceil(out, { x: 1.2, y: -1.7, z: 3 })).toEqual({ x: 2, y: -1, z: 3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.ceil(out, { x: 1.5, y: 2.5, z: 3.5 })).toBe(out);
	});
});

describe("round", () => {
	it("rounds each component to the nearest integer", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.round(out, { x: 1.4, y: 1.6, z: -2.4 })).toEqual({ x: 1, y: 2, z: -2 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.round(out, { x: 1.5, y: 2.5, z: 3.5 })).toBe(out);
	});
});

describe("clamp", () => {
	it("clamps each component between scalar bounds", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.clamp(out, { x: -5, y: 5, z: 15 }, 0, 10)).toEqual({ x: 0, y: 5, z: 10 });
	});

	it("clamps each component between vector bounds", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.clamp(
			out,
			{ x: 0, y: 20, z: 5 },
			{ x: 1, y: 2, z: 3 },
			{ x: 4, y: 10, z: 6 },
		);
		expect(result).toEqual({ x: 1, y: 10, z: 5 });
	});

	it("accepts a scalar min with a vector max", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.clamp(out, { x: -5, y: 5, z: 5 }, 0, { x: 10, y: 2, z: 10 })).toEqual({
			x: 0,
			y: 2,
			z: 5,
		});
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.clamp(out, { x: 1, y: 2, z: 3 }, 0, 10)).toBe(out);
	});
});

describe("lerp", () => {
	it("returns the endpoints at t = 0 and t = 1", () => {
		const out = { x: 0, y: 0, z: 0 };
		const a = { x: 1, y: 2, z: 3 };
		const b = { x: 5, y: 10, z: -3 };
		expect(Vec3.lerp(out, a, b, 0)).toEqual(a);
		expect(Vec3.lerp(out, a, b, 1)).toEqual(b);
	});

	it("interpolates linearly", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.lerp(out, { x: 0, y: 0, z: 0 }, { x: 10, y: 20, z: -30 }, 0.5)).toEqual({
			x: 5,
			y: 10,
			z: -15,
		});
	});

	it("extrapolates outside [0, 1]", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.lerp(out, { x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 }, 2)).toEqual({
			x: 2,
			y: 4,
			z: 6,
		});
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.lerp(out, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }, 0.5)).toBe(out);
	});

	it("supports out aliasing an input", () => {
		const a = { x: 0, y: 0, z: 0 };
		Vec3.lerp(a, a, { x: 2, y: 4, z: 6 }, 0.5);
		expect(a).toEqual({ x: 1, y: 2, z: 3 });
	});
});
