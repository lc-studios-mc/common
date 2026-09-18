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
