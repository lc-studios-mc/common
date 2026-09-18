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
 * Sets the components of a vector.
 * @param out - Vector to write the result to.
 * @param x - X component.
 * @param y - Y component.
 * @param z - Z component.
 * @returns The mutated `out`.
 */
export function set(out: Vector3, x: number, y: number, z: number): Vector3 {
	out.x = x;
	out.y = y;
	out.z = z;
	return out;
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

const scrSlerpScaled1 = create();
const scrSlerpScaled2 = create();
const scrSlerpAxis = create();

const SLERP_EPSILON = 1e-6;

/**
 * Spherically interpolates between two unit vectors, rotating at constant angular speed.
 *
 * Both inputs must be normalized; the result is not a valid spherical interpolation otherwise. If
 * the vectors are opposite, the rotation plane is ambiguous, so an arbitrary one is used.
 *
 * @param out - Vector to write the result to.
 * @param v1 - Start unit vector, returned when `t` is 0.
 * @param v2 - End unit vector, returned when `t` is 1.
 * @param t - Interpolation factor. Values outside [0, 1] continue along the same great circle.
 * @returns The mutated `out`.
 */
export function slerp(out: Vector3, v1: Vector3, v2: Vector3, t: number): Vector3 {
	const d = Math.min(1, Math.max(-1, dot(v1, v2)));
	const theta = Math.acos(d);
	const sinTheta = Math.sin(theta);

	if (sinTheta < SLERP_EPSILON) {
		// Nearly parallel: the arc is negligible, so lerp is accurate and avoids dividing by ~0
		if (d > 0) return lerp(out, v1, v2, t);

		// Opposite: any great circle through v1 is valid, so rotate towards an arbitrary perpendicular
		const ax = Math.abs(v1.x);
		const ay = Math.abs(v1.y);
		const az = Math.abs(v1.z);
		// Cross with the axis least aligned with v1 for a well-conditioned perpendicular
		if (ax <= ay && ax <= az) set(scrSlerpAxis, 1, 0, 0);
		else if (ay <= az) set(scrSlerpAxis, 0, 1, 0);
		else set(scrSlerpAxis, 0, 0, 1);
		cross(scrSlerpAxis, v1, scrSlerpAxis);
		normalize(scrSlerpAxis, scrSlerpAxis);

		multiplyScalar(scrSlerpScaled1, v1, Math.cos(t * Math.PI));
		multiplyScalar(scrSlerpScaled2, scrSlerpAxis, Math.sin(t * Math.PI));
		return add(out, scrSlerpScaled1, scrSlerpScaled2);
	}

	const t1 = Math.sin((1 - t) * theta) / sinTheta;
	const t2 = Math.sin(t * theta) / sinTheta;
	multiplyScalar(scrSlerpScaled1, v1, t1);
	multiplyScalar(scrSlerpScaled2, v2, t2);
	return add(out, scrSlerpScaled1, scrSlerpScaled2);
}

/**
 * Rotates a vector around the X axis. Positive angles rotate +Y towards +Z.
 * @param out - Vector to write the result to.
 * @param v - Vector to rotate.
 * @param radians - Rotation angle in radians.
 * @returns The mutated `out`.
 */
export function rotateX(out: Vector3, v: Vector3, radians: number): Vector3 {
	const c = Math.cos(radians);
	const s = Math.sin(radians);
	const y = v.y * c - v.z * s;
	const z = v.y * s + v.z * c;
	out.x = v.x;
	out.y = y;
	out.z = z;
	return out;
}

/**
 * Rotates a vector around the Y axis. Positive angles rotate +Z towards +X (east towards north),
 * the opposite of Minecraft's yaw; negate a yaw before passing it in.
 * @param out - Vector to write the result to.
 * @param v - Vector to rotate.
 * @param radians - Rotation angle in radians.
 * @returns The mutated `out`.
 */
export function rotateY(out: Vector3, v: Vector3, radians: number): Vector3 {
	const c = Math.cos(radians);
	const s = Math.sin(radians);
	const x = v.x * c + v.z * s;
	const z = -v.x * s + v.z * c;
	out.x = x;
	out.y = v.y;
	out.z = z;
	return out;
}

/**
 * Rotates a vector around the Z axis. Positive angles rotate +X towards +Y.
 * @param out - Vector to write the result to.
 * @param v - Vector to rotate.
 * @param radians - Rotation angle in radians.
 * @returns The mutated `out`.
 */
export function rotateZ(out: Vector3, v: Vector3, radians: number): Vector3 {
	const c = Math.cos(radians);
	const s = Math.sin(radians);
	const x = v.x * c - v.y * s;
	const y = v.x * s + v.y * c;
	out.x = x;
	out.y = y;
	out.z = v.z;
	return out;
}
