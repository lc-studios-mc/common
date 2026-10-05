import * as mc from "@minecraft/server";
import {
	calculateReducedDamageFromStats,
	type DamageReductionStats,
	type ProtectionEnchantmentLevels,
} from "@src/entity";
import { describe, expect, it } from "bun:test";

function stats(
	overrides: Partial<Omit<DamageReductionStats, "enchantments">> & {
		enchantments?: Partial<ProtectionEnchantmentLevels>;
	} = {},
): DamageReductionStats {
	return {
		armor: overrides.armor ?? 0,
		toughness: overrides.toughness ?? 0,
		resistanceLevel: overrides.resistanceLevel ?? 0,
		enchantments: {
			protection: 0,
			fireProtection: 0,
			blastProtection: 0,
			projectileProtection: 0,
			featherFalling: 0,
			...overrides.enchantments,
		},
	};
}

describe("calculateReducedDamageFromStats", () => {
	describe("input handling", () => {
		it("returns damage unchanged with no reductions", () => {
			expect(calculateReducedDamageFromStats(stats(), 10)).toBe(10);
			expect(
				calculateReducedDamageFromStats(stats(), 10, mc.EntityDamageCause.entityAttack),
			).toBe(10);
		});

		it("returns 0 for zero or negative damage", () => {
			expect(calculateReducedDamageFromStats(stats({ armor: 20 }), 0)).toBe(0);
			expect(calculateReducedDamageFromStats(stats({ armor: 20 }), -5)).toBe(0);
		});

		it("passes non-finite damage through", () => {
			expect(calculateReducedDamageFromStats(stats({ armor: 20 }), NaN)).toBeNaN();
			expect(calculateReducedDamageFromStats(stats({ resistanceLevel: 5 }), Infinity)).toBe(
				Infinity,
			);
		});
	});

	describe("armor", () => {
		it("reduces a zombie attack by 77% with full diamond armor", () => {
			// 20 armor, 8 toughness, 3 damage: 20 - 12/16 = 19.25 → 77%
			const s = stats({ armor: 20, toughness: 8 });
			expect(
				calculateReducedDamageFromStats(s, 3, mc.EntityDamageCause.entityAttack),
			).toBeCloseTo(0.69);
		});

		it("never reduces below armor / 5 for high damage", () => {
			// 10 armor: floor of 2 → 8%
			expect(calculateReducedDamageFromStats(stats({ armor: 10 }), 100)).toBeCloseTo(92);
		});

		it("caps reduction at 80%", () => {
			const s = stats({ armor: 30, toughness: 20 });
			expect(calculateReducedDamageFromStats(s, 1)).toBeCloseTo(0.2);
		});

		it("caps armor points at 30", () => {
			// 30 armor, 40 damage: max(6, 30 - 20) = 10 → 40%
			expect(calculateReducedDamageFromStats(stats({ armor: 40 }), 40)).toBeCloseTo(24);
		});

		it("caps toughness at 20", () => {
			// 20 armor, 20 toughness, 40 damage: 20 - 160/28 → ~57.14%
			const s = stats({ armor: 20, toughness: 100 });
			expect(calculateReducedDamageFromStats(s, 40)).toBeCloseTo(
				40 * (1 - (20 - 160 / 28) / 25),
			);
		});

		it("is skipped for causes that bypass armor", () => {
			const s = stats({ armor: 20, toughness: 8 });
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.fall)).toBe(10);
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.magic)).toBe(10);
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.fireTick)).toBe(10);
		});
	});

	describe("protection enchantments", () => {
		it("reduces damage by 4% per Protection level", () => {
			const s = stats({ enchantments: { protection: 16 } });
			expect(calculateReducedDamageFromStats(s, 10)).toBeCloseTo(3.6);
		});

		it("caps total EPF at 20", () => {
			const s = stats({ enchantments: { protection: 25 } });
			expect(calculateReducedDamageFromStats(s, 10)).toBeCloseTo(2);
		});

		it("applies Protection to causes that bypass armor", () => {
			const s = stats({ enchantments: { protection: 4 } });
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.fall)).toBeCloseTo(
				8.4,
			);
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.magic)).toBeCloseTo(
				8.4,
			);
		});

		it("applies Feather Falling only to fall damage", () => {
			const s = stats({ enchantments: { featherFalling: 4 } });
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.fall)).toBeCloseTo(
				5.2,
			);
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.entityAttack)).toBe(
				10,
			);
		});

		it("applies Fire Protection only to fire damage", () => {
			const s = stats({ enchantments: { fireProtection: 4 } });
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.lava)).toBeCloseTo(
				6.8,
			);
			expect(
				calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.fireTick),
			).toBeCloseTo(6.8);
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.entityAttack)).toBe(
				10,
			);
		});

		it("applies Blast Protection only to explosions", () => {
			const s = stats({ enchantments: { blastProtection: 4 } });
			expect(
				calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.entityExplosion),
			).toBeCloseTo(6.8);
			expect(
				calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.blockExplosion),
			).toBeCloseTo(6.8);
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.projectile)).toBe(
				10,
			);
		});

		it("applies Projectile Protection only to projectiles", () => {
			const s = stats({ enchantments: { projectileProtection: 4 } });
			expect(
				calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.projectile),
			).toBeCloseTo(6.8);
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.entityAttack)).toBe(
				10,
			);
		});

		it("ignores specialized protections when no cause is given", () => {
			const s = stats({
				enchantments: {
					fireProtection: 4,
					blastProtection: 4,
					projectileProtection: 4,
					featherFalling: 4,
				},
			});
			expect(calculateReducedDamageFromStats(s, 10)).toBe(10);
		});

		it("sums Protection with matching specialized protection", () => {
			// 4 + 8 = 12 EPF → 48%
			const s = stats({ enchantments: { protection: 4, fireProtection: 4 } });
			expect(calculateReducedDamageFromStats(s, 10, mc.EntityDamageCause.fire)).toBeCloseTo(
				5.2,
			);
		});
	});

	describe("resistance", () => {
		it("reduces damage by 20% per level", () => {
			expect(calculateReducedDamageFromStats(stats({ resistanceLevel: 1 }), 10)).toBeCloseTo(
				8,
			);
			expect(calculateReducedDamageFromStats(stats({ resistanceLevel: 3 }), 10)).toBeCloseTo(
				4,
			);
		});

		it("blocks all damage at level 5 or higher", () => {
			expect(calculateReducedDamageFromStats(stats({ resistanceLevel: 5 }), 10)).toBe(0);
			expect(calculateReducedDamageFromStats(stats({ resistanceLevel: 7 }), 10)).toBe(0);
		});
	});

	describe("unblockable causes", () => {
		const everything = stats({
			armor: 20,
			toughness: 8,
			resistanceLevel: 2,
			enchantments: { protection: 16 },
		});

		it("does not reduce void damage at all", () => {
			expect(calculateReducedDamageFromStats(everything, 10, mc.EntityDamageCause.void)).toBe(
				10,
			);
		});

		it("does not reduce starvation damage at all", () => {
			expect(
				calculateReducedDamageFromStats(everything, 10, mc.EntityDamageCause.starve),
			).toBe(10);
		});

		it("reduces sonic boom damage only by Resistance", () => {
			expect(
				calculateReducedDamageFromStats(everything, 10, mc.EntityDamageCause.sonicBoom),
			).toBeCloseTo(6);
		});
	});

	it("multiplies armor, enchantment, and Resistance reductions", () => {
		// armor: 20 - 16/16 = 19 → ×0.24; Protection 4 → ×0.84; Resistance 1 → ×0.8
		const s = stats({
			armor: 20,
			toughness: 8,
			resistanceLevel: 1,
			enchantments: { protection: 4 },
		});
		expect(
			calculateReducedDamageFromStats(s, 4, mc.EntityDamageCause.entityAttack),
		).toBeCloseTo(4 * 0.24 * 0.84 * 0.8);
	});
});
