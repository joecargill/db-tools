import React from "react";
import NumberInput from "../inputs/NumberInput";

export default function DamageBonusRow({ bonus, onChange }) {
  const update = (field, value) => {
    onChange({ ...bonus, [field]: value });
  };

  return (
    <div className="row-flex">
      <label className="input-row">
        <span className="<label">Type</span>
        <select
          value={bonus.type}
          onChange={(e) => update("type", e.target.value)}
        >
          <option value="STR">STR</option>
          <option value="AGL">AGL</option>
        </select>
      </label>

      <NumberInput
        label="Value"
        value={bonus.value}
        onChange={(v) => update("value", v)}
      />
    </div>
  );
}
