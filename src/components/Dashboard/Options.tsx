type props = {
  selected: "month" | "week";
  setSelected: React.Dispatch<React.SetStateAction<"month" | "week">>;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const Options = ({ selected, setSelected, setIsAdding }: props) => {
  return (
    <div className="flex justify-between py-5">
      {/* filter option */}
      <div className="flex flex-wrap gap-4">
        {/* this month button */}
        <button
          onClick={() => {
            setSelected("month");
          }}
          className={`cursor-pointer rounded-full border border-[var(--border-default)] p-2 px-5 text-sm capitalize md:p-2 md:px-4 md:text-base ${selected === "month" ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} `}
        >
          this month
        </button>

        {/* 7 days button */}
        <button
          onClick={() => {
            setSelected("week");
          }}
          className={`cursor-pointer rounded-full border border-[var(--border-default)] p-2 px-5 text-sm capitalize md:p-2 md:px-4 md:text-base ${selected === "week" ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} `}
        >
          past 7 days
        </button>
      </div>

      {/* add */}
      <div className="self-center">
        <button
          onClick={() => {
            setIsAdding(true);
          }}
          className={`cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] p-1 text-sm text-[var(--text-inverse)] capitalize md:p-2 md:px-4 md:text-base`}
        >
          + add transaction
        </button>
      </div>
    </div>
  );
};

export default Options;
