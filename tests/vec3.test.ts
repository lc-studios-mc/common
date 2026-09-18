import type { Vector3 } from "@minecraft/server";
import { Vec3 } from "@src/index";
import { describe, expect, it } from "bun:test";
import { degToRad } from "@src/number";

describe("create", () => {
	it("creates a vector from the given components", () => {
		expect(Vec3.create({ x: 1, y: 2, z: 3 })).toEqual({ x: 1, y: 2, z: 3 });
	});

	it("defaults missing components to 0", () => {
		expect(Vec3.create({ x: 5 })).toEqual({ x: 5, y: 0, z: 0 });
		expect(Vec3.create()).toEqual({ x: 0, y: 0, z: 0 });
	});
});

describe("set", () => {
	it("sets the components of out", () => {
		const out = { x: 0, y: 0, z: 0 };
		Vec3.set(out, 1, 2, 3);
		expect(out).toEqual({ x: 1, y: 2, z: 3 });
	});

	it("returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.set(out, 1, 2, 3)).toBe(out);
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

describe("copy", () => {
	it("copies each component into out", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.copy(out, { x: 1, y: -2, z: 3 })).toEqual({ x: 1, y: -2, z: 3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.copy(out, { x: 1, y: 2, z: 3 });
		expect(result).toBe(out);
	});

	it("does not modify the source vector", () => {
		const v = { x: 1, y: 2, z: 3 };
		Vec3.copy({ x: 0, y: 0, z: 0 }, v);
		expect(v).toEqual({ x: 1, y: 2, z: 3 });
	});
});

describe("negate", () => {
	it("flips the sign of each component", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.negate(out, { x: 1, y: -2, z: 3 })).toEqual({ x: -1, y: 2, z: -3 });
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		const result = Vec3.negate(out, { x: 1, y: 2, z: 3 });
		expect(result).toBe(out);
	});
});

describe("equals", () => {
	it("compares components strictly", () => {
		expect(Vec3.equals({ x: 1, y: 2, z: 3 }, { x: 1, y: 2, z: 3 })).toBe(true);
		expect(Vec3.equals({ x: 1, y: 2, z: 3 }, { x: 1 + 1e-12, y: 2, z: 3 })).toBe(false);
	});
});

describe("approxEquals", () => {
	it("compares components within epsilon", () => {
		const a = { x: 1, y: 2, z: 3 };
		expect(Vec3.approxEquals(a, { x: 1 + 1e-7, y: 2, z: 3 })).toBe(true);
		expect(Vec3.approxEquals(a, { x: 1, y: 2, z: 3.001 })).toBe(false);
		expect(Vec3.approxEquals(a, { x: 1.05, y: 2, z: 3 }, 0.1)).toBe(true);
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

describe("setDirection", () => {
	it("points towards the direction while keeping the length", () => {
		const out = { x: 0, y: 0, z: 0 };
		// The direction is deliberately not normalized
		Vec3.setDirection(out, { x: 0, y: 3, z: 4 }, { x: 10, y: 0, z: 0 });
		expect(out.x).toBeCloseTo(5);
		expect(out.y).toBeCloseTo(0);
		expect(out.z).toBeCloseTo(0);
	});

	it("returns a zero vector if the vector or the direction has zero length", () => {
		const zero = { x: 0, y: 0, z: 0 };
		expect(Vec3.setDirection({ x: 1, y: 2, z: 3 }, { x: 0, y: 3, z: 4 }, zero)).toEqual(zero);
		expect(Vec3.setDirection({ x: 1, y: 2, z: 3 }, zero, { x: 1, y: 0, z: 0 })).toEqual(zero);
	});

	it("writes the result to and returns out, even if out is v", () => {
		const v = { x: 0, y: 3, z: 4 };
		expect(Vec3.setDirection(v, v, { x: 1, y: 0, z: 0 })).toBe(v);
		expect(v.x).toBeCloseTo(5);
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

describe("slerp", () => {
	const x = { x: 1, y: 0, z: 0 };
	const y = { x: 0, y: 1, z: 0 };

	it("returns the endpoints at t = 0 and t = 1", () => {
		const out = { x: 0, y: 0, z: 0 };
		const a = Vec3.normalize({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 });
		const b = Vec3.normalize({ x: 0, y: 0, z: 0 }, { x: -2, y: 1, z: 4 });

		Vec3.slerp(out, a, b, 0);
		expect(out.x).toBeCloseTo(a.x);
		expect(out.y).toBeCloseTo(a.y);
		expect(out.z).toBeCloseTo(a.z);

		Vec3.slerp(out, a, b, 1);
		expect(out.x).toBeCloseTo(b.x);
		expect(out.y).toBeCloseTo(b.y);
		expect(out.z).toBeCloseTo(b.z);
	});

	it("interpolates along the arc at constant angular speed", () => {
		const out = { x: 0, y: 0, z: 0 };

		Vec3.slerp(out, x, y, 0.5);
		expect(out.x).toBeCloseTo(Math.SQRT1_2);
		expect(out.y).toBeCloseTo(Math.SQRT1_2);
		expect(out.z).toBeCloseTo(0);

		Vec3.slerp(out, x, y, 1 / 3);
		expect(out.x).toBeCloseTo(Math.cos(Math.PI / 6));
		expect(out.y).toBeCloseTo(Math.sin(Math.PI / 6));
		expect(out.z).toBeCloseTo(0);
	});

	it("keeps the result unit length for unit inputs", () => {
		const out = { x: 0, y: 0, z: 0 };
		const a = Vec3.normalize({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 3 });
		const b = Vec3.normalize({ x: 0, y: 0, z: 0 }, { x: -2, y: 1, z: 4 });
		for (const t of [0.1, 0.25, 0.5, 0.9]) {
			Vec3.slerp(out, a, b, t);
			expect(Vec3.length(out)).toBeCloseTo(1);
		}
	});

	it("extrapolates along the same great circle outside [0, 1]", () => {
		const out = { x: 0, y: 0, z: 0 };
		Vec3.slerp(out, x, y, 2);
		expect(out.x).toBeCloseTo(-1);
		expect(out.y).toBeCloseTo(0);
		expect(out.z).toBeCloseTo(0);

		Vec3.slerp(out, x, y, -1);
		expect(out.x).toBeCloseTo(0);
		expect(out.y).toBeCloseTo(-1);
		expect(out.z).toBeCloseTo(0);
	});

	it("returns the vector itself when both inputs are identical", () => {
		const out = { x: 0, y: 0, z: 0 };
		Vec3.slerp(out, y, y, 0.5);
		expect(out.x).toBeCloseTo(0);
		expect(out.y).toBeCloseTo(1);
		expect(out.z).toBeCloseTo(0);
	});

	it("handles nearly parallel vectors without producing NaN", () => {
		const out = { x: 0, y: 0, z: 0 };
		const b = Vec3.normalize({ x: 0, y: 0, z: 0 }, { x: 1, y: 1e-9, z: 0 });
		Vec3.slerp(out, x, b, 0.5);
		expect(Number.isNaN(out.x + out.y + out.z)).toBe(false);
		expect(out.x).toBeCloseTo(1);
	});

	it("handles opposite vectors by producing a finite unit vector", () => {
		const out = { x: 0, y: 0, z: 0 };
		Vec3.slerp(out, x, { x: -1, y: 0, z: 0 }, 0.5);
		expect(Number.isFinite(out.x + out.y + out.z)).toBe(true);
		expect(Vec3.length(out)).toBeCloseTo(1);
		// Midpoint of a half-turn is perpendicular to both endpoints
		expect(Vec3.dot(out, x)).toBeCloseTo(0);
	});

	it("writes the result to and returns out", () => {
		const out = { x: 0, y: 0, z: 0 };
		expect(Vec3.slerp(out, x, y, 0.5)).toBe(out);
	});

	it("supports out aliasing an input", () => {
		const a = { ...x };
		Vec3.slerp(a, a, y, 0.5);
		expect(a.x).toBeCloseTo(Math.SQRT1_2);
		expect(a.y).toBeCloseTo(Math.SQRT1_2);
		expect(a.z).toBeCloseTo(0);
	});
});

describe("rotateX", () => {
	it("rotates +Y towards +Z for positive angles", () => {
		const out = { x: 0, y: 0, z: 0 };
		Vec3.rotateX(out, { x: 0, y: 1, z: 0 }, Math.PI / 2);
		expect(out.x).toBeCloseTo(0);
		expect(out.y).toBeCloseTo(0);
		expect(out.z).toBeCloseTo(1);
	});

	it("leaves the X component unchanged and supports aliasing", () => {
		const v = { x: 5, y: 0, z: 1 };
		Vec3.rotateX(v, v, Math.PI);
		expect(v.x).toBe(5);
		expect(v.y).toBeCloseTo(0);
		expect(v.z).toBeCloseTo(-1);
	});
});

describe("rotateY", () => {
	it("rotates +Z towards +X for positive angles", () => {
		const out = { x: 0, y: 0, z: 0 };
		Vec3.rotateY(out, { x: 0, y: 0, z: 1 }, Math.PI / 2);
		expect(out.x).toBeCloseTo(1);
		expect(out.y).toBeCloseTo(0);
		expect(out.z).toBeCloseTo(0);
	});

	it("turns east into north (counterclockwise seen from above)", () => {
		const out = { x: 0, y: 0, z: 0 };
		Vec3.rotateY(out, Vec3.EAST, Math.PI / 2);
		expect(out.x).toBeCloseTo(Vec3.NORTH.x);
		expect(out.z).toBeCloseTo(Vec3.NORTH.z);
	});

	it("supports aliasing", () => {
		const v = { x: 1, y: 2, z: 0 };
		Vec3.rotateY(v, v, Math.PI);
		expect(v.x).toBeCloseTo(-1);
		expect(v.y).toBe(2);
		expect(v.z).toBeCloseTo(0);
	});
});

describe("rotateZ", () => {
	it("rotates +X towards +Y for positive angles", () => {
		const out = { x: 0, y: 0, z: 0 };
		Vec3.rotateZ(out, { x: 1, y: 0, z: 0 }, Math.PI / 2);
		expect(out.x).toBeCloseTo(0);
		expect(out.y).toBeCloseTo(1);
		expect(out.z).toBeCloseTo(0);
	});

	it("preserves length", () => {
		const out = { x: 0, y: 0, z: 0 };
		const v = { x: 1, y: 2, z: 3 };
		Vec3.rotateZ(out, v, 0.7);
		expect(Vec3.length(out)).toBeCloseTo(Vec3.length(v));
		expect(out.z).toBe(3);
	});
});

describe("resolveLocalOffsets", () => {
	const origin = { x: 10, y: 20, z: 30 };
	const resolve = (rotation: { x: number; y: number }, offset: Vector3): Vector3 => {
		const [out] = Vec3.resolveLocalOffsets([Vec3.create()], origin, rotation, [offset]);
		return out!;
	};
	const expectVec = (v: Vector3, x: number, y: number, z: number) => {
		expect(v.x).toBeCloseTo(x);
		expect(v.y).toBeCloseTo(y);
		expect(v.z).toBeCloseTo(z);
	};

	it("returns the same out array", () => {
		const out = [Vec3.create()];
		expect(Vec3.resolveLocalOffsets(out, origin, { x: 0, y: 0 }, [Vec3.ONE])).toBe(out);
	});

	it("faces south (+Z) at yaw 0, with right to the west", () => {
		expectVec(resolve({ x: 0, y: 0 }, { x: 0, y: 0, z: 1 }), 10, 20, 31);
		expectVec(resolve({ x: 0, y: 0 }, { x: 1, y: 0, z: 0 }), 9, 20, 30);
		expectVec(resolve({ x: 0, y: 0 }, { x: 0, y: 1, z: 0 }), 10, 21, 30);
	});

	it("faces west (-X) at yaw 90, with right to the north", () => {
		expectVec(resolve({ x: 0, y: 90 }, { x: 0, y: 0, z: 1 }), 9, 20, 30);
		expectVec(resolve({ x: 0, y: 90 }, { x: 1, y: 0, z: 0 }), 10, 20, 29);
	});

	it("faces north (-Z) at yaw 180, with right to the east", () => {
		expectVec(resolve({ x: 0, y: 180 }, { x: 0, y: 0, z: 1 }), 10, 20, 29);
		expectVec(resolve({ x: 0, y: 180 }, { x: 1, y: 0, z: 0 }), 11, 20, 30);
	});

	it("resolves a combined non-axis-aligned yaw and pitch", () => {
		// Expected value derived independently: forward from the view direction,
		// right = cross(forward, up), up = cross(right, forward)
		expectVec(
			resolve({ x: 20, y: 30 }, { x: 1, y: 2, z: 3 }),
			7.38241552,
			20.85332481,
			32.53378931,
		);
	});

	it("looks down at positive pitch", () => {
		expectVec(resolve({ x: 90, y: 0 }, { x: 0, y: 0, z: 1 }), 10, 19, 30);
		// Up tilts back towards the player
		expectVec(resolve({ x: 90, y: 0 }, { x: 0, y: 1, z: 0 }), 10, 20, 31);
	});

	it("matches the view direction for forward offsets", () => {
		const r = { x: 30, y: 45 };
		const p = degToRad(r.x);
		const y = degToRad(r.y);
		const view = {
			x: -Math.cos(p) * Math.sin(y),
			y: -Math.sin(p),
			z: Math.cos(p) * Math.cos(y),
		};
		expectVec(
			resolve(r, { x: 0, y: 0, z: 3 }),
			10 + view.x * 3,
			20 + view.y * 3,
			30 + view.z * 3,
		);
	});

	it("resolves multiple offsets and preserves their lengths", () => {
		const offsets = [
			{ x: 1, y: 2, z: 3 },
			{ x: -4, y: 0, z: 1 },
		];
		const out = [Vec3.create(), Vec3.create()];
		Vec3.resolveLocalOffsets(out, origin, { x: 20, y: 70 }, offsets);
		for (let i = 0; i < offsets.length; i++) {
			expect(Vec3.distance(out[i]!, origin)).toBeCloseTo(Vec3.length(offsets[i]!));
		}
	});

	it("forms a left-handed right/up/forward frame (cross(right, up) = -forward)", () => {
		const right = resolve({ x: 25, y: 130 }, { x: 1, y: 0, z: 0 });
		const up = resolve({ x: 25, y: 130 }, { x: 0, y: 1, z: 0 });
		const forward = resolve({ x: 25, y: 130 }, { x: 0, y: 0, z: 1 });
		const r = Vec3.subtract(Vec3.create(), right, origin);
		const u = Vec3.subtract(Vec3.create(), up, origin);
		const f = Vec3.subtract(Vec3.create(), forward, origin);
		expect(Vec3.dot(Vec3.cross(Vec3.create(), r, u), f)).toBeCloseTo(-1);
	});

	it("throws if out has fewer entries than localOffsets", () => {
		expect(() => Vec3.resolveLocalOffsets([], origin, { x: 0, y: 0 }, [Vec3.ONE])).toThrow();
	});
});
