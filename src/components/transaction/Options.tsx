type props = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const Options = ({ selectedDate, setSelectedDate }: props) => {
  // function to set month to the previous month
  const prevMonth = () => {
    const newDate = selectedDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(new Date(newDate));
  };

  // function to set month to the next month
  const nextMonth = () => {
    const newDate = selectedDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(new Date(newDate));
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* month setter container */}
      <div className="flex gap-2">
        <button
          onClick={prevMonth}
          className="cursor-pointer rounded-full border border-[var(--border-default)] p-1 px-3 text-xl font-extrabold text-[var(--text-primary)] shadow-md hover:bg-[var(--accent-subtle)]"
        >
          ◂
        </button>
        <div className="flex w-40 justify-center rounded-full border border-[var(--border-default)] p-2 text-[var(--text-primary)] uppercase shadow-md">
          {selectedDate.toLocaleDateString("default", { month: "long" })} -{" "}
          {selectedDate.getFullYear()}
        </div>
        <button
          onClick={nextMonth}
          className="cursor-pointer rounded-full border border-[var(--border-default)] p-1 px-3 text-xl font-extrabold text-[var(--text-primary)] shadow-md hover:bg-[var(--accent-subtle)]"
        >
          ▸
        </button>
      </div>

      {/* btn container */}
      <div className="">
        {/* add button */}
        <button className="shadow- cursor-pointer rounded-full bg-[var(--accent-primary)] px-5 py-2 text-[var(--text-inverse)]">
          + Add New
        </button>
      </div>
    </div>
  );
};

export default Options;
