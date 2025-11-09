import React from "react";

export default function StringRow({ value, onChange }) {
  return (
    <div className="cb-row">
      <input
        type="text"
        className="cb-input"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tag"
      />
    </div>
  );
}
