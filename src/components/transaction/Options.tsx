const Options = () => {
  return (
    <div className="flex items-center justify-between py-4">
      {/* month setter container */}
      <div className="flex gap-2">
        <button className="cursor-pointer rounded-full border border-[var(--border-default)] p-1 px-3 text-xl font-extrabold text-[var(--text-primary)] hover:bg-[var(--accent-subtle)]">
          ◂
        </button>
        <div className="flex w-40 justify-center rounded-full border border-[var(--border-default)] bg-[var(--accent-subtle)] p-2 text-[var(--text-primary)] uppercase">
          april - 2025
        </div>
        <button className="cursor-pointer rounded-full border border-[var(--border-default)] p-1 px-3 text-xl font-extrabold text-[var(--text-primary)] hover:bg-[var(--accent-subtle)]">
          ▸
        </button>
      </div>

      {/* btn container */}
      <div className="">
        {/* add button */}
        <button className="cursor-pointer rounded-full bg-[var(--accent-primary)] px-5 py-2 text-[var(--text-inverse)]">
          + Add New
        </button>
      </div>
    </div>
  );
};

export default Options;
