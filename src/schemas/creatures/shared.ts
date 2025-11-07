import { z } from "astro:content";

export const SkillNameSchema = z.enum([
  "Acrobatics",
  "Awareness",
  "Bartering",
  "Beast Lore",
  "Bluffing",
  "Bushcraft",
  "Crafting",
  "Evade",
  "Healing",
  "Hunting & Fishing",
  "Languages",
  "Myths & Legends",
  "Performance",
  "Persuasion",
  "Riding",
  "Seamanship",
  "Sleight of Hand",
  "Sneaking",
  "Spot Hidden",
  "Swimming",
  "Animism",
  "Mentalism",
  "Elementalism"
]);

export const SkillSchema = z.object({
  name: SkillNameSchema,
  level: z.number().int(),
});

export const EffectSchema = z.object({
  name: z.string(),
  description: z.string(),
});

// Types
export type Skill = z.infer<typeof SkillSchema>;
export type Effect = z.infer<typeof EffectSchema>;
