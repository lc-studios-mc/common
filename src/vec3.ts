import { Vector3 } from "@minecraft/server";
import { clamp as clampNumber } from "./number";

export const ZERO = { x: 0, y: 0, z: 0 } as const satisfies Vector3;

export const ONE = { x: 1, y: 1, z: 1 } as const satisfies Vector3;

export const HALF = { x: 0.5, y: 0.5, z: 0.5 } as const satisfies Vector3;

export const UP = { x: 0, y: 1, z: 0 } as const satisfies Vector3;

export const DOWN = { x: 0, y: -1, z: 0 } as const satisfies Vector3;

export const NORTH = { x: 0, y: 0, z: -1 } as const satisfies Vector3;

export const SOUTH = { x: 0, y: 0, z: 1 } as const satisfies Vector3;

export const EAST = { x: 1, y: 0, z: 0 } as const satisfies Vector3;

export const WEST = { x: -1, y: 0, z: 0 } as const satisfies Vector3;

export const FORWARD = SOUTH;

export const BACK = NORTH;

export const RIGHT = EAST;

export const LEFT = WEST;

/**
 * Creates a new `Vector3` object.
 * @param v - Components to use; missing ones default to `0`.
 * @returns A new vector.
 */
export function create(v?: Partial<Vector3>): Vector3 {
	return { x: v?.x ?? 0, y: v?.y ?? 0, z: v?.z ?? 0 };
}

/**
 * Adds two vectors.
 * @param out - Vector to write the result to.
 * @param v1 - Vector to add to.
 * @param v2 - Vector to add. Missing components default to 0.
 * @returns The mutated `out`.
 */
export function add(out: Vector3, v1: Vector3, v2: Partial<Vector3>): Vector3 {
	out.x = v1.x + (v2.x ?? 0);
	out.y = v1.y + (v2.y ?? 0);
	out.z = v1.z + (v2.z ?? 0);
	return out;
}

/**
 * Subtracts one vector from another.
 * @param out - Vector to write the result to.
 * @param v1 - Vector to subtract from.
 * @param v2 - Vector to subtract. Missing components default to 0.
 * @returns The mutated `out`.
 */
export function subtract(out: Vector3, v1: Vector3, v2: Partial<Vector3>): Vector3 {
	out.x = v1.x - (v2.x ?? 0);
	out.y = v1.y - (v2.y ?? 0);
	out.z = v1.z - (v2.z ?? 0);
	return out;
}

/**
 * Multiplies two vectors component-wise.
 * @param out - Vector to write the result to.
 * @param v1 - Vector to multiply.
 * @param v2 - Vector to multiply by. Missing components default to 1.
 * @returns The mutated `out`.
 */
export function multiply(out: Vector3, v1: Vector3, v2: Partial<Vector3>): Vector3 {
	out.x = v1.x * (v2.x ?? 1);
	out.y = v1.y * (v2.y ?? 1);
	out.z = v1.z * (v2.z ?? 1);
	return out;
}

/**
 * Multiplies a vector by a scalar.
 * @param out - Vector to write the result to.
 * @param v - Vector to multiply.
 * @param scalar - Scalar to multiply by.
 * @returns The mutated `out`.
 */
export function multiplyScalar(out: Vector3, v: Vector3, scalar: number): Vector3 {
	out.x = v.x * scalar;
	out.y = v.y * scalar;
	out.z = v.z * scalar;
	return out;
}

/**
 * Divides one vector by another component-wise.
 * @param out - Vector to write the result to.
 * @param v1 - Vector to divide.
 * @param v2 - Vector to divide by. Missing components default to 1.
 * @returns The mutated `out`.
 */
export function divide(out: Vector3, v1: Vector3, v2: Partial<Vector3>): Vector3 {
	out.x = v1.x / (v2.x ?? 1);
	out.y = v1.y / (v2.y ?? 1);
	out.z = v1.z / (v2.z ?? 1);
	return out;
}

/**
 * Divides a vector by a scalar.
 * @param out - Vector to write the result to.
 * @param v - Vector to divide.
 * @param scalar - Scalar to divide by.
 * @returns The mutated `out`.
 */
export function divideScalar(out: Vector3, v: Vector3, scalar: number): Vector3 {
	out.x = v.x / scalar;
	out.y = v.y / scalar;
	out.z = v.z / scalar;
	return out;
}

/**
 * Calculates the squared length (magnitude) of a vector.
 * @param v - Vector to measure.
 * @returns The squared length.
 */
export function lengthSq(v: Vector3): number {
	return v.x * v.x + v.y * v.y + v.z * v.z;
}

/**
 * Calculates the length (magnitude) of a vector.
 * @param v - Vector to measure.
 * @returns The length.
 */
export function length(v: Vector3): number {
	return Math.sqrt(lengthSq(v));
}

/**
 * Calculates the squared distance between two vectors.
 * @param v1 - First vector.
 * @param v2 - Second vector.
 * @returns The squared distance.
 */
export function distanceSq(v1: Vector3, v2: Vector3): number {
	const dx = v1.x - v2.x;
	const dy = v1.y - v2.y;
	const dz = v1.z - v2.z;
	return dx * dx + dy * dy + dz * dz;
}

/**
 * Calculates the distance between two vectors.
 * @param v1 - First vector.
 * @param v2 - Second vector.
 * @returns The distance.
 */
export function distance(v1: Vector3, v2: Vector3): number {
	return Math.sqrt(distanceSq(v1, v2));
}

/**
 * Calculates the angle between two vectors.
 * @param v1 - First vector.
 * @param v2 - Second vector.
 * @returns The angle in radians, in the range [0, π]. Returns 0 if either vector has zero length.
 */
export function angle(v1: Vector3, v2: Vector3): number {
	const denom = Math.sqrt(lengthSq(v1) * lengthSq(v2));
	if (denom === 0) return 0;
	return Math.acos(clampNumber(dot(v1, v2) / denom, -1, 1));
}

/**
 * Calculates the dot product of two vectors.
 * @param v1 - First vector.
 * @param v2 - Second vector.
 * @returns The dot product.
 */
export function dot(v1: Vector3, v2: Vector3): number {
	return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

/**
 * Calculates the cross product of two vectors.
 * @param out - Vector to write the result to.
 * @param v1 - First vector.
 * @param v2 - Second vector.
 * @returns The mutated `out`.
 */
export function cross(out: Vector3, v1: Vector3, v2: Vector3): Vector3 {
	const x = v1.y * v2.z - v1.z * v2.y;
	const y = v1.z * v2.x - v1.x * v2.z;
	const z = v1.x * v2.y - v1.y * v2.x;
	out.x = x;
	out.y = y;
	out.z = z;
	return out;
}

/**
 * Normalizes a vector to a length of 1.
 * @param out - Vector to write the result to.
 * @param v - Vector to normalize. A zero-length vector results in a zero vector.
 * @returns The mutated `out`.
 */
export function normalize(out: Vector3, v: Vector3): Vector3 {
	const len = length(v);
	if (len === 0) {
		out.x = 0;
		out.y = 0;
		out.z = 0;
		return out;
	}
	return divideScalar(out, v, len);
}

/**
 * Rounds each component of a vector down to the nearest integer.
 * @param out - Vector to write the result to.
 * @param v - Vector to round.
 * @returns The mutated `out`.
 */
export function floor(out: Vector3, v: Vector3): Vector3 {
	out.x = Math.floor(v.x);
	out.y = Math.floor(v.y);
	out.z = Math.floor(v.z);
	return out;
}

/**
 * Rounds each component of a vector up to the nearest integer.
 * @param out - Vector to write the result to.
 * @param v - Vector to round.
 * @returns The mutated `out`.
 */
export function ceil(out: Vector3, v: Vector3): Vector3 {
	out.x = Math.ceil(v.x);
	out.y = Math.ceil(v.y);
	out.z = Math.ceil(v.z);
	return out;
}

/**
 * Rounds each component of a vector to the nearest integer.
 * @param out - Vector to write the result to.
 * @param v - Vector to round.
 * @returns The mutated `out`.
 */
export function round(out: Vector3, v: Vector3): Vector3 {
	out.x = Math.round(v.x);
	out.y = Math.round(v.y);
	out.z = Math.round(v.z);
	return out;
}

/**
 * Clamps each component of a vector between a minimum and maximum.
 * @param out - Vector to write the result to.
 * @param v - Vector to clamp.
 * @param min - Minimum value, either a number applied to all components or a per-component vector.
 * @param max - Maximum value, either a number applied to all components or a per-component vector.
 * @returns The mutated `out`.
 */
export function clamp(
	out: Vector3,
	v: Vector3,
	min: number | Vector3,
	max: number | Vector3,
): Vector3 {
	const minIsNum = typeof min === "number";
	const maxIsNum = typeof max === "number";
	out.x = clampNumber(v.x, minIsNum ? min : min.x, maxIsNum ? max : max.x);
	out.y = clampNumber(v.y, minIsNum ? min : min.y, maxIsNum ? max : max.y);
	out.z = clampNumber(v.z, minIsNum ? min : min.z, maxIsNum ? max : max.z);
	return out;
}

/**
 * Linearly interpolates between two vectors.
 * @param out - Vector to write the result to.
 * @param v1 - Start vector, returned when `t` is 0.
 * @param v2 - End vector, returned when `t` is 1.
 * @param t - Interpolation factor.
 * @returns The mutated `out`.
 */
export function lerp(out: Vector3, v1: Vector3, v2: Vector3, t: number): Vector3 {
	out.x = v1.x + (v2.x - v1.x) * t;
	out.y = v1.y + (v2.y - v1.y) * t;
	out.z = v1.z + (v2.z - v1.z) * t;
	return out;
}
