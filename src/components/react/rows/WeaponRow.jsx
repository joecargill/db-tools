import React from "react";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import NumberInput from "../inputs/NumberInput";

import { DICE_TYPES } from "../../../data/diceTypes";

export default function WeaponRow({ weapon, onChange }) {
  const update = (field, value) => {
    onChange({ ...weapon, [field]: value });
  };

  const updateNested = (field, nestedField, value) => {
    onChange({
      ...weapon,
      [field]: {
        ...weapon[field],
        [nestedField]: value,
      },
    });
  };

  return (
    <div className="row-flex">
      <TextInput
        label="Name"
        value={weapon.name}
        onChange={(v) => update("name", v)}
      />
      <NumberInput
        label="Lvl"
        value={weapon.level}
        onChange={(v) => update("level", v)}
        min={1}
        max={18}
        size={2}
      />
      <NumberInput
        label="Damage"
        value={weapon.damage_dice.count}
        min={1}
        max={9}
        width={1}
        onChange={(v) => updateNested("damage_dice", "count", v)}
      />
      <SelectInput
        value={weapon.damage_dice.type}
        options={DICE_TYPES}
        onChange={(v) => updateNested("damage_dice", "type", v)}
      />
      <NumberInput
        label="Durability"
        value={weapon.durability}
        onChange={(v) => update("durability", v)}
        size={2} // not working
        min={1}
        max={20}
      />
    </div>
  );
}
