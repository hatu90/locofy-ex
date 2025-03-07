type ValueToolProps = {
  value?: string;
  onChange: (value: string) => void;
};
export function ValueTool({ value, onChange }: ValueToolProps) {
  return (
    <div>
      <label>Value</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
