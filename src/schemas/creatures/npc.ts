import { z } from "zod";

import { SkillSchema, DiceSchema, EffectSchema } from "./shared";

export const NpcSchema = z.object({
  statblock: z.literal("NPC"),
  name: z.string(),
  description: z.string().optional(),
  morale: z.number().optional(),
  size: z.enum(["SMALL", "NORMAL", "LARGE", "HUGE", "SWARM"]),
  move: z.number().int().multipleOf(2),
  hp: z.number().int(),
  wp: z.number().int().optional(),

  resistance: z.string().optional(),
  immunity: z.string().optional(),
  weakness: z.string().optional(),
  tags: z.object({
    type: z.array(z.string()).default([]),
    environment: z.array(z.string()).default([]),
    trait: z.array(z.string()).default([]),
  }).default({ type: [], environment: [], trait: [] }),

  skills: z.array(SkillSchema).optional(),
  effects: z.array(EffectSchema).optional(),

  abilities: z.array(z.string()).optional(),
  spells: z.array(z.string()).optional(),

  weapons: z.array(
    z.object({
      name: z.string(),
      level: z.number().int(),
      damage_dice: DiceSchema,
      durability: z.number().int(),
    })
  ).optional(),

  armors: z.array(
    z.object({
      name: z.string(),
      rating: z.number().int(),
    })
  ).optional(),

  damage_bonuses: z.array(
    z.object({
      type: z.enum(["STR", "AGL"]),
      value: z.number().int(),
    })
  ).optional(),
});

export type Npc = z.infer<typeof NpcSchema>;
