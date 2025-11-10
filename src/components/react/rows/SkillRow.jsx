import React from "react";
import SelectInput from "../inputs/SelectInput";
import NumberInput from "../inputs/NumberInput";
import { SKILL_NAMES } from "../../../data/skillNames";

export default function SkillRow({ skill, onChange, usedNames }) {
  const update = (field, value) => {
    onChange({ ...skill, [field]: value });
  };

  const availableOptions = SKILL_NAMES.filter(
    (name) => name === skill.name || !usedNames.includes(name)
  );

  return (
    <div className="row-flex">
      <SelectInput
        value={skill.name}
        options={availableOptions}
        onChange={(v) => update("name", v)}
      />

      <NumberInput
        label="Level"
        value={skill.level}
        onChange={(v) => update("level", v)}
        min={1}
        max={18}
      />
    </div>
  );
}
