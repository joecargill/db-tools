import { z } from "astro:content";
import { SkillSchema, EffectSchema } from "./shared";

export const MonsterSchema = z.object({
  type: z.literal("MONSTER"),
  name: z.string(),
  description: z.string().optional(),
  morale: z.number().optional(),
  ferocity: z.number().int(),
  size: z.enum(["SMALL", "NORMAL", "LARGE", "HUGE", "SWARM"]),
  move: z.number().int().multipleOf(2),
  hp: z.number().int(),

  armor: z.number().int().optional(),
  resistance: z.string().optional(),
  immunity: z.string().optional(),
  weakness: z.string().optional(),
  tags: z.array(z.string()).optional(),

  skills: z.array(SkillSchema).optional(),
  effects: z.array(EffectSchema).optional(),

  attacks: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      result: z.string(),
    })
  ),
});

export type Monster = z.infer<typeof MonsterSchema>;
