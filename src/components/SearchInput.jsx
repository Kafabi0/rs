export default function SearchInput({ value, onChange, placeholder = "Cari..." }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ maxWidth: "400px" }}
    />
  );
}
