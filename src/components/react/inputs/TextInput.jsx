export default function TextInput({ className, label, value, onChange, size }) {
  return (
    <div className={`input-row ${className}`}>
      <span className="term">{label}</span>
      <input
        type="text"
        className={`builder-input-inline`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size={size}
      />
    </div>
  );
}
