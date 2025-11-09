import React from "react";
import TextInput from "../inputs/TextInput";
import NumberInput from "../inputs/NumberInput";

export default function ArmorRow({ armor, onChange }) {
  const update = (field, value) => {
    onChange({ ...armor, [field]: value });
  };

  return (
    <div className="row-flex">
      <TextInput
        label="Name"
        value={armor.name}
        onChange={(v) => update("name", v)}
      />
      <NumberInput
        label="Rating"
        value={armor.rating}
        onChange={(v) => update("rating", v)}
        width={2}
      />
    </div>
  );
}
