import { z } from "zod";

import { SKILL_NAMES } from "../../data/skillNames";
import { DICE_TYPES } from "../../data/diceTypes";

export const SkillNameSchema = z.enum(SKILL_NAMES);
export const SkillSchema = z.object({
  name: SkillNameSchema,
  level: z.number().int(),
});

export const DiceTypeSchema = z.enum(DICE_TYPES);
export const DiceSchema = z.object({
  type: DiceTypeSchema,
  count: z.number().int(),
});

export const EffectSchema = z.object({
  name: z.string(),
  description: z.string(),
});

// Types
export type Skill = z.infer<typeof SkillSchema>;
export type Effect = z.infer<typeof EffectSchema>;
