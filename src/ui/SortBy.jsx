import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const soryBy = searchParams.get("sortBy") || options[0].value;
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={soryBy}
    />
  );
}

export default SortBy;
