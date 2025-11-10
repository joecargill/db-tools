import React from "react";

export default function StringRow({ className, value, onChange, size }) {
  return (
    <div className={`cb-row ${className}`}>
      <input
        type="text"
        className="cb-input"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder=""
        size={size}
      />
    </div>
  );
}
