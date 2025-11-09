import { useRef } from "react";

import "../../../styles/input.css";

export default function NumberInput({ label, value, onChange, size, min, max, required = true, }) {
const inputRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;

    // Allow digits or empty string if not required
    if (/^\d*$/.test(val) || (!required && val === "")) {
      e.target.value = val;
    }
  };

  const handleBlur = (e) => {
    const val = e.target.value;

    // If empty and not required, propagate undefined
    if (!required && val === "") {
      onChange(undefined);
      return;
    }

    let num = Number(val);

    // If required and empty, default to min or 0
    if (required && val === "") {
      num = min !== undefined ? min : 0;
    }

    // Clamp only if min/max are defined
    if (min !== undefined && num < min) num = min;
    if (max !== undefined && num > max) num = max;

    e.target.value = num;
    onChange(num);
  };

  return (
    <label className="input-row">
      <span className="<label">{label}</span>
      <input
        ref={inputRef}
        type="number"
        className={`builder-input-inline ${size ? `input-num-digits-${size}` : ""}`}
        defaultValue={value ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        placeholder={!required ? "—" : undefined}
      />
    </label>
  );
}