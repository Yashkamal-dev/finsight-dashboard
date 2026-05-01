import type { option } from "../../../types/optionsType";
import Dropdown from "../../general/Dropdown";

type props = {
  options: option[];
  selected: option;
  onChange(val: option): void;
};

const Filter = ({ options, selected, onChange }: props) => {
  return (
    <div className="flex">
      {/* dropdown for status selection */}
      <Dropdown
        options={options}
        selected={selected}
        onChange={onChange}
        placeholder="Select status"
      />
    </div>
  );
};

export default Filter;
