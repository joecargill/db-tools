import React, { useState } from "react";
import Select from "react-select";

// Base Inputs
import TextInput from "./inputs/TextInput";
import NumberInput from "./inputs/NumberInput";
import TextAreaInput from "./inputs/TextAreaInput";
import SelectInput from "./inputs/SelectInput";

// List Component
import RepeatingList from "./RepeatingList";

// Row Components
import WeaponRow from "./rows/WeaponRow";
import ArmorRow from "./rows/ArmorRow";
import SkillRow from "./rows/SkillRow";
import EffectRow from "./rows/EffectRow";
import DamageBonusRow from "./rows/DamageBonusRow";
import StringRow from "./rows/StringRow";

// Output Component
import JsonOutput from "./JsonOutput";

// Styles
import "../../styles/creature.css";
import "../../styles/creature_builder.css";

import { SKILL_NAMES } from "../../data/skillNames";

const DEFAULT_NPC = {
  type: "NPC",
  name: "",
  description: "",
  morale: undefined,
  size: "NORMAL",
  move: 10,
  hp: 10,
  wp: undefined,
  resistance: "",
  immunity: "",
  weakness: "",
  tags: [],
  skills: [],
  effects: [],
  abilities: [],
  spells: [],
  armors: [],
  weapons: [],
  damage_bonuses: [],
};

export default function NpcBuilder({ existingNpcs = [] }) {
  const [npc, setNpc] = useState(DEFAULT_NPC);
  const [selectedNpcId, setSelectedNpcId] = useState("");

  //
  // ─── BASE UPDATERS ──────────────────────────────────────────────
  //
  const update = (field, value) => {
    setNpc((o) => ({ ...o, [field]: value }));
  };

  const updateListItem = (field, index, updated) => {
    setNpc((o) => ({
      ...o,
      [field]: o[field].map((item, i) => (i === index ? updated : item)),
    }));
  };

  const removeListItem = (field, index) => {
    setNpc((o) => ({
      ...o,
      [field]: o[field].filter((_, i) => i !== index),
    }));
  };

  //
  // ─── LIST ADDERS ────────────────────────────────────────────────
  //
  const addWeapon = () =>
    update("weapons", [
      ...npc.weapons,
      { name: "", level: 10, damage_dice: { count: 1, type: "d6" }, durability: 10 },
    ]);

  const addArmor = () =>
    update("armors", [...npc.armors, { name: "", rating: 1 }]);

  const addSkill = () => {
    const used = npc.skills.map((s) => s.name);
    const available = SKILL_NAMES.filter((name) => !used.includes(name));
    const firstUnused = available[0] ?? "";

    update("skills", [...npc.skills, { name: firstUnused, level: 10 }]);
  };

  const addEffect = () =>
    update("effects", [...npc.effects, { name: "", description: "" }]);

  const addDamageBonus = () =>
    update("damage_bonuses", [...npc.damage_bonuses, { type: "STR", value: 1 }]);

  const addString = (field) => update(field, [...npc[field], ""]);

  //
  // ─── HANDLE EXISTING NPC SELECTION ─────────────────────────────
  //
  const handleSelectNpc = (id) => {
    setSelectedNpcId(id);
    const base = existingNpcs.find((n) => n.id === id);
    if (base) {
      setNpc({ ...DEFAULT_NPC, ...base }); // fill form with existing NPC
    } else {
      setNpc(DEFAULT_NPC); // reset to blank
    }
  };

  //
  // ─── CLEAN OUTPUT ───────────────────────────────────────────────
  //
  const replacer = (key, value) => {
    if (key === "id") return undefined;
    if (value === "" || value === null || value === undefined) return undefined;
    if (Array.isArray(value)) {
      const filtered = value.filter((v) => v !== "" && v != null);
      return filtered.length > 0 ? filtered : undefined;
    }
    return value;
  };

  const output = JSON.parse(JSON.stringify(npc, replacer));

  //
  // ─── RENDER ─────────────────────────────────────────────────────
  //
  const npcOptions = existingNpcs.map((n) => ({
    value: n.id,
    label: n.name || n.id, // fallback if name is empty
  }));

  return (
    <div className="page-columns">
      <div style={{ marginBottom: "1rem" }}>
        <label className="statblock-label">Start From Existing NPC:</label>
        <Select
          options={npcOptions}
          value={npcOptions.find((o) => o.value === selectedNpcId) || null}
          onChange={(option) => handleSelectNpc(option?.value)}
          isClearable
          placeholder="Select an NPC..."
          classNames={{
            control: () => "bg-dark-800 border border-dark-600 rounded p-1",
            menu: () => "db-select-input bg-dark-900 border border-dark-600",
            option: (state) =>
              state.isSelected
                ? "bg-dark-600 text-white"
                : state.isFocused
                ? "bg-dark-700 text-white"
                : "bg-dark-900 text-gray-300",
          }}
        />
      </div>

      <div>
        <label className="statblock-label">Name:</label>
        <TextInput value={npc.name} onChange={(v) => update("name", v)} />
      </div>

      <div>
        <label className="statblock-label">Description:</label>
        <TextAreaInput value={npc.description} onChange={(v) => update("description", v)} />
      </div>

      <div>
        <RepeatingList
          title="Tags"
          items={npc.tags}
          renderItem={(value, cb) => <StringRow className={"d-inline-block"} size={10} value={value} onChange={cb} />}
          onAdd={() => addString("tags")}
          onChange={(i, v) => updateListItem("tags", i, v.toLowerCase())}
          onRemove={(i) => removeListItem("tags", i)}
        />
      </div>

      <div className="stats-box db-font-normal mb-5 mb-lg-4 builder-container">
        <table className="stats-table builder-table">
          <tbody>
            
            
            <tr>
              <td>
                <label className="statblock-label">Morale:</label>
                <NumberInput className={"d-inline-block"} value={npc.morale} onChange={(v) => update("morale", v)} width={2} max={12} min={2} required={false}/>
              </td>
              <td colSpan="3">
                <RepeatingList 
                  title="Damage Bonuses" 
                  maxItems={2}
                  items={npc.damage_bonuses} 
                  renderItem={(bonus, cb) => <DamageBonusRow bonus={bonus} onChange={cb} usedAttributes={npc.damage_bonuses.map(db => db.type)}/>} 
                  onAdd={addDamageBonus} 
                  onChange={(i, b) => updateListItem("damage_bonuses", i, b)} 
                  onRemove={(i) => removeListItem("damage_bonuses", i)}
                />
              </td>
            </tr>
              
            <tr>
              <td>
                <label className="statblock-label">Move:</label>
                <NumberInput className={"d-inline-block"} value={npc.move} onChange={(v) => update("move", v)} required={true} min={0} max={99}/>
              </td>
              <td>
                <label className="statblock-label">HP:</label>
                <NumberInput className={"d-inline-block"} value={npc.hp} onChange={(v) => update("hp", v)} min={1} max={99} required={true} />

                <label className="ms-2">WP:</label>
                <NumberInput className={"d-inline-block"} value={npc.wp} onChange={(v) => update("wp", v)} min={1} max={99} required={false} />
              </td>
            </tr>
            
            <tr>
              
            </tr>
            
            <tr>
              <td>
                <label className="statblock-label">Size:</label>
                <SelectInput value={npc.size} options={["SMALL", "NORMAL", "LARGE", "HUGE", "SWARM"]} onChange={(v) => update("size", v)} />
              </td>
            </tr>
            
            <tr>
              <td>
                <label className="statblock-label">Resistance:</label>
                <TextInput className={"d-inline-block"} value={npc.resistance} onChange={(v) => update("resistance", v)} />
              </td>
            </tr>
            
            <tr>
              <td>
                <label className="statblock-label">Immunity:</label>
                <TextInput className={"d-inline-block"} value={npc.immunity} onChange={(v) => update("immunity", v)} />
              </td>
            </tr>
            
            <tr>
              <td>
                <label className="statblock-label">Weakness:</label>
                <TextInput className={"d-inline-block"} value={npc.weakness} onChange={(v) => update("weakness", v)} />
              </td>
            </tr>
            
            <tr>
              <td colSpan="3">
                <RepeatingList
                  title="Abilities"
                  items={npc.abilities}
                  renderItem={(value, cb) => <StringRow size={12} value={value} onChange={cb} />}
                  onAdd={() => addString("abilities")}
                  onChange={(i, v) => updateListItem("abilities", i, v)}
                  onRemove={(i) => removeListItem("abilities", i)}
                />
              </td>
            </tr>
            
            <tr>
              <td colSpan="3">
                <RepeatingList
                  title="Spells"
                  items={npc.spells}
                  renderItem={(value, cb) => <StringRow size={12} value={value} onChange={cb} />}
                  onAdd={() => addString("spells")}
                  onChange={(i, v) => updateListItem("spells", i, v)}
                  onRemove={(i) => removeListItem("spells", i)}
                />
              </td>
            </tr>
            
            <tr>
              <td colSpan="3">
                <RepeatingList 
                  title="Weapons" 
                  items={npc.weapons} 
                  renderItem={(weapon, cb) => ( <WeaponRow weapon={weapon} onChange={cb} /> )} 
                  onAdd={addWeapon} 
                  onChange={(i, w) => updateListItem("weapons", i, w)} 
                  onRemove={(i) => removeListItem("weapons", i)}
                />
              </td>
            </tr>
            
            <tr>
              <td colSpan="3">
                <RepeatingList 
                  title="Armors" 
                  items={npc.armors} 
                  renderItem={(armor, cb) => <ArmorRow armor={armor} onChange={cb} />} 
                  onAdd={addArmor} 
                  onChange={(i, a) => updateListItem("armors", i, a)} 
                  onRemove={(i) => removeListItem("armors", i)}
                />
              </td>
            </tr>
            
            <tr>
              <td colSpan="3">
                <RepeatingList 
                  title="Skills" 
                  items={npc.skills} 
                  renderItem={(skill, cb) => ( <SkillRow skill={skill} onChange={cb} usedNames={npc.skills.map(s => s.name)} /> )} 
                  onAdd={addSkill} 
                  onChange={(i, s) => updateListItem("skills", i, s)} 
                  onRemove={(i) => removeListItem("skills", i)}
                />
              </td>
            </tr>
            
            <tr>
              <td colSpan="3">
                <RepeatingList 
                  title="Effects" 
                  items={npc.effects} 
                  renderItem={(effect, cb) => <EffectRow effect={effect} onChange={cb} />} 
                  onAdd={addEffect} 
                  onChange={(i, e) => updateListItem("effects", i, e)} 
                  onRemove={(i) => removeListItem("effects", i)}
                />
              </td>
            </tr>
            
            <tr>
              
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <JsonOutput data={output} />
      </div>
    </div>
  );
}
