import React from "react";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";

export default function EffectRow({ effect, onChange }) {
  const update = (field, value) => {
    onChange({ ...effect, [field]: value });
  };

  return (
    <div className="row-flex">
      <TextInput
        label="Effect"
        value={effect.name}
        onChange={(v) => update("name", v)}
        size={12}
        className={"d-inline-block"}
      />
      <TextAreaInput
        label="Description"
        value={effect.description}
        onChange={(v) => update("description", v)}
        rows={2}
      />
    </div>
  );
}
