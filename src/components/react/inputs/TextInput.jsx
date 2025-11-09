export default function TextInput({ label, value, onChange, width }) {
  return (
    <label className="input-row">
      <span className="<label">{label}</span>
      <input
        type="text"
        className={`builder-input-inline ${width || ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
