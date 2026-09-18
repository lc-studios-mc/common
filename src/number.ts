/** Clamps a number between a minimum and maximum value. */
export function clamp(value: number, min: number, max: number): number {
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
