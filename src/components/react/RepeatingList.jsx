import React from "react";

export default function RepeatingList({
  title,
  items,
  renderItem,
  onAdd,
  onChange,
  onRemove,
}) {
  return (
    <div className="repeating-inline-list">
      <label className="me-1">{title}:</label>

      {items.length === 0 && <span className="dash">—</span>}

      {items.map((item, index) => (
        <span key={index} className="inline-item">
          {renderItem(item, (updatedItem) => onChange(index, updatedItem))}

        
          <button
            type="button"
            className="inline-remove"
            onClick={() => onRemove(index)}
          >
            ×
          </button>

          {index < items.length - 1 && <span>,&nbsp;</span>}
        </span>
      ))}

      {/* add button */}
      <button type="button" className="inline-add" onClick={onAdd}>
        +
      </button>
    </div>
  );
}
