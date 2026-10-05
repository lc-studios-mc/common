import type * as mc from "@minecraft/server";
import { mock } from "bun:test";

// `@minecraft/server` only ships type definitions, so the runtime enums used by
// `src/` are provided here for tests.
mock.module("@minecraft/server", () => ({
	EntityDamageCause: {
		anvil: "anvil",
		blockExplosion: "blockExplosion",
		campfire: "campfire",
		charging: "charging",
		contact: "contact",
		drowning: "drowning",
		entityAttack: "entityAttack",
		entityExplosion: "entityExplosion",
		fall: "fall",
		fallingBlock: "fallingBlock",
		fire: "fire",
		fireTick: "fireTick",
		fireworks: "fireworks",
		flyIntoWall: "flyIntoWall",
		freezing: "freezing",
		lava: "lava",
		lightning: "lightning",
		maceSmash: "maceSmash",
		magic: "magic",
		magma: "magma",
		none: "none",
		override: "override",
		piston: "piston",
		projectile: "projectile",
		ramAttack: "ramAttack",
		selfDestruct: "selfDestruct",
		sonicBoom: "sonicBoom",
		soulCampfire: "soulCampfire",
		stalactite: "stalactite",
		stalagmite: "stalagmite",
		starve: "starve",
		suffocation: "suffocation",
		temperature: "temperature",
		thorns: "thorns",
		void: "void",
		wither: "wither",
	} satisfies Record<keyof typeof mc.EntityDamageCause, `${mc.EntityDamageCause}`>,
	EquipmentSlot: {
		Chest: "Chest",
		Feet: "Feet",
		Head: "Head",
		Legs: "Legs",
		Mainhand: "Mainhand",
		Offhand: "Offhand",
	} satisfies Record<keyof typeof mc.EquipmentSlot, `${mc.EquipmentSlot}`>,
	EntityComponentTypes: {
		Equippable: "minecraft:equippable",
	} satisfies Partial<Record<keyof typeof mc.EntityComponentTypes, string>>,
	ItemComponentTypes: {
		Enchantable: "minecraft:enchantable",
	} satisfies Partial<Record<keyof typeof mc.ItemComponentTypes, string>>,
}));
