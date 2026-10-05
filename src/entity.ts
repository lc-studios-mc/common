import * as mc from "@minecraft/server";
import { clamp } from "./number";

/** Protection-family enchantment levels, summed across all worn armor pieces. */
export interface ProtectionEnchantmentLevels {
	protection: number;
	fireProtection: number;
	blastProtection: number;
	projectileProtection: number;
	featherFalling: number;
}

export interface DamageReductionStats {
	armor: number;
	toughness: number;
	/** Resistance effect level (amplifier + 1), or 0 if none. */
	resistanceLevel: number;
	enchantments: ProtectionEnchantmentLevels;
}

// Caps per the Minecraft Wiki (Bedrock matches Java since 1.18.30).
const MAX_ARMOR = 30;
const MAX_TOUGHNESS = 20;
const MAX_EPF = 20;

/** Causes that ignore armor, protection enchantments, and Resistance. */
const BYPASS_ALL_CAUSES: ReadonlySet<mc.EntityDamageCause> = new Set([
	mc.EntityDamageCause.starve,
	mc.EntityDamageCause.void,
	mc.EntityDamageCause.override, // Assumed to be used for `/kill`.
]);

/** Causes that are reduced only by Resistance. */
const RESISTANCE_ONLY_CAUSES: ReadonlySet<mc.EntityDamageCause> = new Set([
	mc.EntityDamageCause.sonicBoom,
]);

/** Causes that ignore armor but are reduced by protection enchantments and Resistance. */
const BYPASS_ARMOR_CAUSES: ReadonlySet<mc.EntityDamageCause> = new Set([
	mc.EntityDamageCause.fall,
	mc.EntityDamageCause.stalagmite, // Assumed to behave like fall damage.
	mc.EntityDamageCause.fireTick,
	mc.EntityDamageCause.drowning,
	mc.EntityDamageCause.magic,
	mc.EntityDamageCause.wither,
	mc.EntityDamageCause.flyIntoWall,
	mc.EntityDamageCause.freezing,
	mc.EntityDamageCause.suffocation,
	mc.EntityDamageCause.campfire,
	mc.EntityDamageCause.soulCampfire,
	mc.EntityDamageCause.thorns, // Assumed to match Java, where thorns bypasses armor.
	mc.EntityDamageCause.temperature, // Assumed to behave like freezing.
]);

const FIRE_CAUSES: ReadonlySet<mc.EntityDamageCause> = new Set([
	mc.EntityDamageCause.fire,
	mc.EntityDamageCause.fireTick,
	mc.EntityDamageCause.lava,
	mc.EntityDamageCause.magma,
	mc.EntityDamageCause.campfire,
	mc.EntityDamageCause.soulCampfire,
]);

const BLAST_CAUSES: ReadonlySet<mc.EntityDamageCause> = new Set([
	mc.EntityDamageCause.blockExplosion,
	mc.EntityDamageCause.entityExplosion,
	mc.EntityDamageCause.fireworks, // Assumed to match Java, where fireworks count as explosions.
]);

const PROJECTILE_CAUSES: ReadonlySet<mc.EntityDamageCause> = new Set([
	mc.EntityDamageCause.projectile,
]);

const FALL_CAUSES: ReadonlySet<mc.EntityDamageCause> = new Set([
	mc.EntityDamageCause.fall,
	mc.EntityDamageCause.stalagmite, // Assumed to behave like fall damage.
]);

/**
 * Applies armor, protection enchantments, and Resistance to incoming damage.
 * @param stats - Damage-reducing stats of the entity.
 * @param damage - Incoming damage.
 * @param cause - Damage cause; if omitted, specialized protections don't apply.
 * @returns The reduced damage, never negative (non-finite damage is returned as-is).
 */
export function calculateReducedDamageFromStats(
	stats: DamageReductionStats,
	damage: number,
	cause?: mc.EntityDamageCause,
): number {
	if (!Number.isFinite(damage)) return damage;
	if (damage <= 0) return 0;

	if (cause !== undefined && BYPASS_ALL_CAUSES.has(cause)) return damage;

	const resistanceOnly = cause !== undefined && RESISTANCE_ONLY_CAUSES.has(cause);
	const armorApplies =
		!resistanceOnly && (cause === undefined || !BYPASS_ARMOR_CAUSES.has(cause));

	let result = damage;

	if (armorApplies) {
		const armor = clamp(stats.armor, 0, MAX_ARMOR);
		const toughness = clamp(stats.toughness, 0, MAX_TOUGHNESS);
		const armorFactor = clamp(
			Math.max(armor / 5, armor - (4 * result) / (toughness + 8)),
			0,
			20,
		);
		result *= 1 - armorFactor / 25;
	}

	if (!resistanceOnly) {
		const epf = clamp(getEnchantmentProtectionFactor(stats.enchantments, cause), 0, MAX_EPF);
		result *= 1 - epf / 25;
	}

	result *= 1 - clamp(0.2 * stats.resistanceLevel, 0, 1);

	return result;
}

function getEnchantmentProtectionFactor(
	enchantments: ProtectionEnchantmentLevels,
	cause: mc.EntityDamageCause | undefined,
): number {
	let epf = enchantments.protection;
	if (cause === undefined) return epf;
	if (FIRE_CAUSES.has(cause)) epf += enchantments.fireProtection * 2;
	if (BLAST_CAUSES.has(cause)) epf += enchantments.blastProtection * 2;
	if (PROJECTILE_CAUSES.has(cause)) epf += enchantments.projectileProtection * 2;
	if (FALL_CAUSES.has(cause)) epf += enchantments.featherFalling * 3;
	return epf;
}

const ARMOR_SLOTS = [
	mc.EquipmentSlot.Head,
	mc.EquipmentSlot.Chest,
	mc.EquipmentSlot.Legs,
	mc.EquipmentSlot.Feet,
] as const;

const ENCHANTMENT_KEYS: Readonly<Record<string, keyof ProtectionEnchantmentLevels>> = {
	protection: "protection",
	fire_protection: "fireProtection",
	blast_protection: "blastProtection",
	projectile_protection: "projectileProtection",
	feather_falling: "featherFalling",
};

/**
 * Like {@link calculateReducedDamageFromStats}, but reads the stats from `entity`.
 * Entities without an equippable component (possibly many mobs) are treated as
 * having no armor.
 * @param entity - Entity taking damage.
 * @param damage - Incoming damage.
 * @param cause - Damage cause.
 * @returns The reduced damage.
 */
export function calculateReducedDamage(
	entity: mc.Entity,
	damage: number,
	cause?: mc.EntityDamageCause,
): number {
	const enchantments: ProtectionEnchantmentLevels = {
		protection: 0,
		fireProtection: 0,
		blastProtection: 0,
		projectileProtection: 0,
		featherFalling: 0,
	};

	const equippable = entity.getComponent(mc.EntityComponentTypes.Equippable);

	if (equippable) {
		for (const slot of ARMOR_SLOTS) {
			const item = equippable.getEquipment(slot);
			const itemEnchantments = item
				?.getComponent(mc.ItemComponentTypes.Enchantable)
				?.getEnchantments();
			if (!itemEnchantments) continue;

			for (const enchantment of itemEnchantments) {
				const key = ENCHANTMENT_KEYS[enchantment.type.id.replace(/^minecraft:/, "")];
				if (key) enchantments[key] += enchantment.level;
			}
		}
	}

	const stats: DamageReductionStats = {
		armor: equippable?.totalArmor ?? 0,
		toughness: equippable?.totalToughness ?? 0,
		resistanceLevel: (entity.getEffect("resistance")?.amplifier ?? -1) + 1,
		enchantments,
	};

	return calculateReducedDamageFromStats(stats, damage, cause);
}
