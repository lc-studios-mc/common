/** Clamps a number between a minimum and maximum value. */
export function clampNumber(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/** Converts an angle in degrees to radians. */
export function degToRad(degrees: number): number {
	return (degrees * Math.PI) / 180;
}

/** Converts an angle in radians to degrees. */
export function radToDeg(radians: number): number {
	return (radians * 180) / Math.PI;
}

/** Returns a random integer between min and max, inclusive. */
export function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Returns a random float between min (inclusive) and max (exclusive). */
export function randomFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
