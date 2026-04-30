import { useState } from "react";

type props = {
  selected: "month" | "week";
  setSelected: React.Dispatch<React.SetStateAction<"month" | "week">>;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const Options = ({ selected, setSelected, setIsAdding }: props) => {
  return (
    <div className="flex justify-between py-5">
      {/* filter option */}
      <div className="flex gap-3">
        {/* this month button */}
        <button
          onClick={() => {
            setSelected("month");
          }}
          className={`cursor-pointer rounded-full border border-[var(--border-default)] p-2 px-4 capitalize ${selected === "month" ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} `}
        >
          this month
        </button>

        {/* 7 days button */}
        <button
          onClick={() => {
            setSelected("week");
          }}
          className={`cursor-pointer rounded-full border border-[var(--border-default)] p-2 px-4  capitalize ${selected === "week" ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} `}
        >
          past 7 days
        </button>
      </div>

      {/* add */}
      <div>
        <button
          onClick={() => {
            setIsAdding(true);
          }}
          className={`cursor-pointer  rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] p-2 px-4 text-[var(--text-inverse)] capitalize`}
        >
          + add transaction
        </button>
      </div>
    </div>
  );
};

export default Options;
