type props = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const Options = ({ selectedDate, setSelectedDate, setIsAdding }: props) => {
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
        {/* previous month button */}
        <button
          onClick={prevMonth}
          className="cursor-pointer rounded-full border border-[var(--border-default)] p-1 px-3 text-xl font-extrabold text-[var(--text-primary)] shadow-md hover:bg-[var(--accent-subtle)] active:scale-97"
        >
          ◂
        </button>

        {/* month label */}
        <div className="flex w-45 justify-center rounded-full border border-[var(--border-default)] p-2 text-[var(--text-primary)] uppercase shadow-md">
          {selectedDate.toLocaleDateString("default", { month: "long" })} -{" "}
          {selectedDate.getFullYear()}
        </div>

        {/* next month button */}
        <button
          onClick={nextMonth}
          className="cursor-pointer rounded-full border border-[var(--border-default)] p-1 px-3 text-xl font-extrabold text-[var(--text-primary)] shadow-md hover:bg-[var(--accent-subtle)] active:scale-97"
        >
          ▸
        </button>
      </div>

      {/* btn container */}
      <div className="">
        {/* add budget button */}
        <button
          onClick={() => {
            setIsAdding(true);
          }}
          className="cursor-pointer rounded-full bg-[var(--accent-primary)] px-5 py-2 text-[var(--text-inverse)] shadow-lg active:scale-99"
        >
          + Add new Budget
        </button>
      </div>
    </div>
  );
};

export default Options;
