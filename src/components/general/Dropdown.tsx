import { useState } from "react";
import type { option } from "../../types/optionsType";

// props for the component
type dropdownProp = {
  options: option[];
  selected: option;
  onChange(val: option): void;
  placeholder?: string;
};

// dropdown component
const Dropdown = ({
  options,
  selected,
  onChange,
  placeholder = "select option",
}: dropdownProp) => {
  //  state to define if dropdown is open or not
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    // dropdown...
    <div className="relative">
      {/* dropdown label */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-w-40 cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-subtle)] py-1.5 text-center"
      >
        <div className="grow border-r border-r-[var(--border-default)] px-3">
          {selected["value"] !== options[0]["value"]
            ? selected["label"]
            : placeholder}
        </div>
        {/* down icon */}
        <span
          className={`px-2 transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}
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
        <div className="absolute mt-1 flex h-fit w-full cursor-pointer flex-col gap-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-1">
          {options.map((opt) => (
            // each option
            <div
              key={new Date().getTime()}
              onClick={() => {
                onChange(opt);
                setIsOpen(!isOpen);
              }}
              className="rounded-full bg-[var(--bg-primary)] p-1 pl-2 text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--accent-soft)]"
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
