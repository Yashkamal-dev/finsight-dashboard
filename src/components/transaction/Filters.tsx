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
  // function to reset the filters as thier default("all") option
  const resetBtnFun = () => {
    setselectedType(types[0]);
    setselectedCategories(types[0]);
    setSelectedMethod(types[0]);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
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

      {/* reset Button */}
      <button
        onClick={resetBtnFun}
        className="mx-1 flex cursor-pointer items-center gap-1 rounded-full hover:shadow-xl md:mx-2 md:gap-1.5"
      >
        {/* reset logo */}
        <svg
          className="h-full fill-[var(--accent-primary)]"
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          fill="#e3e3e3"
        >
          <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
        </svg>

        {/* reset text */}
        <p className="text-sm text-[var(--accent-primary)] md:text-base">
          Reset all
        </p>
      </button>
    </div>
  );
};

export default Filters;
