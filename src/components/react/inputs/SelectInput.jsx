import React from "react";

export default function SelectInput({ value, onChange, options, required = true }) {
  return (
    <select
      className="builder-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {!required && (<option value="">—</option>)}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
