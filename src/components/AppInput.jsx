export default function AppInput({
  value,
  onChange = () => undefined,
  placeholder = "Placeholder",
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-3.5 bg-serfice-100 text-center text-xs w-full placeholder-white placeholder:text-center placeholder:text-xs focus:outline-none"
    />
  );
}
