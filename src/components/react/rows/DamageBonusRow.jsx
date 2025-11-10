import React from "react";
import SelectInput from "../inputs/SelectInput";
import NumberInput from "../inputs/NumberInput";

import { DAMAGE_BONUS_ATTRIBUTES } from "../../../data/damageBonusAttributes";

export default function DamageBonusRow({ className, bonus, usedAttributes, onChange }) {
  const update = (field, value) => {
    onChange({ ...bonus, [field]: value });
  };

  const availableOptions = DAMAGE_BONUS_ATTRIBUTES.filter(
    (type) => type === bonus.type || !usedAttributes.includes(type)
  );

  return (
    <div className="d-inline-block">
      <div className="row-flex">
        <div className="input-row">
          <SelectInput
            value={bonus.type}
            options={availableOptions}
            onChange={(v) => update("type", v)}
          />
        </div>

        <NumberInput
          label="+"
          value={bonus.value}
          min={1}
          max={9}
          onChange={(v) => update("value", v)}
        />
      </div>
    </div>
  );
}
