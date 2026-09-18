import { Vector3 } from "@minecraft/server";

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
