import React from "react";

export default function TextAreaInput({ value, onChange }) {
  return (
    <textarea
      className="builder-input builder-textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
