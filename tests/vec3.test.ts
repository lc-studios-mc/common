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
