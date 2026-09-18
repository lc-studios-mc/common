import { Vector2, Vector3 } from "@minecraft/server";
import { clamp as clampNumber, degToRad } from "./number";

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
 * Copies the components of one vector into another.
 * @param out - Vector to write the result to.
 * @param v - Vector to copy.
 * @returns The mutated `out`.
 */
export function copy(out: Vector3, v: Vector3): Vector3 {
	return set(out, v.x, v.y, v.z);
}

/**
 * Adds two vectors.
 * @param out - Vector to write the result to.
 * @param v1 - Vector to add to.
 * @param v2 - Vector to add. Missing components default to 0.
 * @returns The mutated `out`.
 */
export function add(out: Vector3, v1: Vector3, v2: Partial<Vector3>): Vector3 {
	return set(out, v1.x + (v2.x ?? 0), v1.y + (v2.y ?? 0), v1.z + (v2.z ?? 0));
}

/**
 * Subtracts one vector from another.
 * @param out - Vector to write the result to.
 * @param v1 - Vector to subtract from.
 * @param v2 - Vector to subtract. Missing components default to 0.
 * @returns The mutated `out`.
 */
export function subtract(out: Vector3, v1: Vector3, v2: Partial<Vector3>): Vector3 {
	return set(out, v1.x - (v2.x ?? 0), v1.y - (v2.y ?? 0), v1.z - (v2.z ?? 0));
}

/**
 * Multiplies two vectors component-wise.
 * @param out - Vector to write the result to.
 * @param v1 - Vector to multiply.
 * @param v2 - Vector to multiply by. Missing components default to 1.
 * @returns The mutated `out`.
 */
export function multiply(out: Vector3, v1: Vector3, v2: Partial<Vector3>): Vector3 {
	return set(out, v1.x * (v2.x ?? 1), v1.y * (v2.y ?? 1), v1.z * (v2.z ?? 1));
}

/**
 * Multiplies a vector by a scalar.
 * @param out - Vector to write the result to.
 * @param v - Vector to multiply.
 * @param scalar - Scalar to multiply by.
 * @returns The mutated `out`.
 */
export function multiplyScalar(out: Vector3, v: Vector3, scalar: number): Vector3 {
	return set(out, v.x * scalar, v.y * scalar, v.z * scalar);
}

/**
 * Divides one vector by another component-wise.
 * @param out - Vector to write the result to.
 * @param v1 - Vector to divide.
 * @param v2 - Vector to divide by. Missing components default to 1.
 * @returns The mutated `out`.
 */
export function divide(out: Vector3, v1: Vector3, v2: Partial<Vector3>): Vector3 {
	return set(out, v1.x / (v2.x ?? 1), v1.y / (v2.y ?? 1), v1.z / (v2.z ?? 1));
}

/**
 * Divides a vector by a scalar.
 * @param out - Vector to write the result to.
 * @param v - Vector to divide.
 * @param scalar - Scalar to divide by.
 * @returns The mutated `out`.
 */
export function divideScalar(out: Vector3, v: Vector3, scalar: number): Vector3 {
	return set(out, v.x / scalar, v.y / scalar, v.z / scalar);
}

/**
 * Negates a vector, flipping its direction.
 * @param out - Vector to write the result to.
 * @param v - Vector to negate.
 * @returns The mutated `out`.
 */
export function negate(out: Vector3, v: Vector3): Vector3 {
	return set(out, -v.x, -v.y, -v.z);
}

/**
 * Checks whether two vectors are strictly equal, comparing each component with `===`.
 * @param v1 - First vector.
 * @param v2 - Second vector.
 * @returns `true` if all components are identical.
 */
export function equals(v1: Vector3, v2: Vector3): boolean {
	return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
}

const APPROX_EQUALS_EPSILON = 1e-6;

/**
 * Checks whether two vectors are approximately equal, comparing each component within a tolerance.
 * @param v1 - First vector.
 * @param v2 - Second vector.
 * @param epsilon - Maximum allowed absolute difference per component (inclusive).
 * @returns `true` if every component differs by at most `epsilon`.
 */
export function approxEquals(v1: Vector3, v2: Vector3, epsilon = APPROX_EQUALS_EPSILON): boolean {
	return (
		Math.abs(v1.x - v2.x) <= epsilon &&
		Math.abs(v1.y - v2.y) <= epsilon &&
		Math.abs(v1.z - v2.z) <= epsilon
	);
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
	return set(
		out,
		v1.y * v2.z - v1.z * v2.y,
		v1.z * v2.x - v1.x * v2.z,
		v1.x * v2.y - v1.y * v2.x,
	);
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
		return set(out, 0, 0, 0);
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
	return set(out, Math.floor(v.x), Math.floor(v.y), Math.floor(v.z));
}

/**
 * Rounds each component of a vector up to the nearest integer.
 * @param out - Vector to write the result to.
 * @param v - Vector to round.
 * @returns The mutated `out`.
 */
export function ceil(out: Vector3, v: Vector3): Vector3 {
	return set(out, Math.ceil(v.x), Math.ceil(v.y), Math.ceil(v.z));
}

/**
 * Rounds each component of a vector to the nearest integer.
 * @param out - Vector to write the result to.
 * @param v - Vector to round.
 * @returns The mutated `out`.
 */
export function round(out: Vector3, v: Vector3): Vector3 {
	return set(out, Math.round(v.x), Math.round(v.y), Math.round(v.z));
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
	return set(
		out,
		clampNumber(v.x, minIsNum ? min : min.x, maxIsNum ? max : max.x),
		clampNumber(v.y, minIsNum ? min : min.y, maxIsNum ? max : max.y),
		clampNumber(v.z, minIsNum ? min : min.z, maxIsNum ? max : max.z),
	);
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
	return set(out, v1.x + (v2.x - v1.x) * t, v1.y + (v2.y - v1.y) * t, v1.z + (v2.z - v1.z) * t);
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
	return set(out, v.x, v.y * c - v.z * s, v.y * s + v.z * c);
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
	return set(out, v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
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
	return set(out, v.x * c - v.y * s, v.x * s + v.y * c, v.z);
}

/**
 * Converts local right/up/forward offsets into world-space points.
 * @param out - Vectors to write to; must be at least as long as `localOffsets`.
 * @param origin - World-space origin.
 * @param rotation - Pitch (`x`) and yaw (`y`) in degrees using Minecraft's convention (yaw 0 faces +Z,
 *   positive pitch looks down), e.g. from `entity.getRotation()`.
 * @param localOffsets - Local-space offsets (x=right, y=up, z=forward).
 * @returns The mutated `out`.
 * @throws If `out` or `localOffsets` has no entry at some index.
 */
export function resolveLocalOffsets<T extends Vector3[]>(
	out: T,
	origin: Vector3,
	rotation: Vector2,
	localOffsets: readonly Vector3[],
): T {
	const pitch = degToRad(rotation.x);
	const yaw = degToRad(rotation.y);

	const sinP = Math.sin(pitch);
	const cosP = Math.cos(pitch);
	const sinY = Math.sin(yaw);
	const cosY = Math.cos(yaw);

	// Basis vectors of the local frame in world space. With forward as +Z, cross(right, up) is
	// -forward, so right can't be a rotation of +X: it is negated to point at the entity's right.
	// Forward: yaw 0 faces +Z, and positive pitch looks down (-Y)
	const fx = -cosP * sinY;
	const fy = -sinP;
	const fz = cosP * cosY;
	// Right: always horizontal
	const rx = -cosY;
	const rz = -sinY;
	// Up: forward pitched a further 90° up, so it tilts back towards the entity when looking down
	const ux = -sinP * sinY;
	const uy = cosP;
	const uz = sinP * cosY;

	for (let i = 0; i < localOffsets.length; i++) {
		const v = localOffsets[i];
		const o = out[i];
		if (!v || !o) throw new Error(`Missing vector at index ${i}`);
		// origin + right * v.x + up * v.y + forward * v.z (right has no y component)
		set(
			o,
			origin.x + rx * v.x + ux * v.y + fx * v.z,
			origin.y + uy * v.y + fy * v.z,
			origin.z + rz * v.x + uz * v.y + fz * v.z,
		);
	}

	return out;
}
