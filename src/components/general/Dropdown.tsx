import { useState } from "react";
import type { option } from "../../types/optionsType";

// props for the component
type dropdownProp = {
  options: option[];
  selected: option;
  onChange(val: option): void;
  placeholder?: string;
  error?: boolean;
};

// dropdown component
const Dropdown = ({
  options,
  selected,
  onChange,
  placeholder = "select option",
  error = false,
}: dropdownProp) => {
  //  state to define if dropdown is open or not
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    // dropdown...
    <div className="relative">
      {/* dropdown label */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center text-sm md:text-base ${error === true ? "border-[var(--danger)]" : ""} min-w-fit cursor-pointer rounded-full border border-[var(--border-default)] py-1 text-center shadow-xl hover:bg-[var(--accent-subtle)] md:min-w-40 md:py-1.5`}
      >
        <div className="grow border-r border-r-[var(--border-default)] px-3">
          {selected["value"] !== options[0]["value"]
            ? selected["label"]
            : placeholder}
        </div>
        {/* down icon */}
        <span
          className={`transition-all duration-200 md:px-2 ${isOpen ? "rotate-180" : ""}`}
        >
          <svg
            className="fill-[var(--text-primary)]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M480-360 280-560h400L480-360Z" />
          </svg>
        </span>
      </div>

      {/* dropdown options to show on open */}
      {isOpen && (
        // options container
        <div className="absolute z-1 mt-1 flex h-fit w-full cursor-pointer flex-col gap-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-1 shadow-xl">
          {options.map((opt) => (
            // each option
            <div
              key={crypto.randomUUID()}
              onClick={() => {
                onChange(opt);
                setIsOpen(!isOpen);
              }}
              className="rounded-full bg-[var(--bg-primary)] p-0.5 pl-2 text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--accent-soft)] md:p-1"
            >
              {opt["label"]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
