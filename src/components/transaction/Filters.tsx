import { useState } from "react";
import Dropdown from "../general/Dropdown";
import type { option } from "../../types/optionsType";

type props = {
  types: option[];
  selectedType: option;
  setselectedType: React.Dispatch<React.SetStateAction<option>>;
  categories: option[];
  selectedCategories: option;
  setselectedCategories: React.Dispatch<React.SetStateAction<option>>;
  method: option[];
  selectedMethod: option;
  setSelectedMethod: React.Dispatch<React.SetStateAction<option>>;
};

const Filters = ({
  types,
  selectedType,
  setselectedType,
  categories,
  selectedCategories,
  setselectedCategories,
  method,
  selectedMethod,
  setSelectedMethod,
}: props) => {
  return (
    <div className="flex items-center gap-2">
      {/* dropdown for types */}
      <Dropdown
        options={types}
        selected={selectedType}
        onChange={(val) => {
          setselectedType(val);
        }}
        placeholder="Select Type"
      />

      {/* dropdown for categories */}
      <Dropdown
        options={categories}
        selected={selectedCategories}
        onChange={(val) => {
          setselectedCategories(val);
        }}
        placeholder="Select Categories"
      />

      {/* dropdown for method */}
      <Dropdown
        options={method}
        selected={selectedMethod}
        onChange={(val) => {
          setSelectedMethod(val);
        }}
        placeholder="Select Method"
      />
    </div>
  );
};

export default Filters;
