import { useState } from "react";
import Dropdown from "../general/Dropdown";
import type { option } from "../../types/optionsType";

const options: option[] = [
  { label: "All", value: "all" },
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

const Filters = () => {
  const [selectedType, setselected] = useState<option | null>(null);
  console.log(selectedType);

  return (
    <div className="flex items-center">
      dropdown : -
      <Dropdown
        options={options}
        selected={selectedType}
        onChange={(val) => {
          setselected(val);
        }}
        placeholder="Select type"
      />
    </div>
  );
};

export default Filters;
