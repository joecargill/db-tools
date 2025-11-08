// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { MonsterSchema } from "./schemas/creatures/monster";
import { NpcSchema } from "./schemas/creatures/npc";

const monster = defineCollection({
  type: "data",
  schema: MonsterSchema,
});

const npc = defineCollection({
  type: "data",
  schema: NpcSchema,
});

export const collections = {
  monster,
  npc,
};
