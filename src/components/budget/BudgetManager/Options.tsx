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
    <div className="flex flex-wrap-reverse items-center justify-between gap-3 py-4">
      {/* month setter container */}
      <div className="flex items-center gap-2">
        {/* previous month button */}
        <button
          onClick={prevMonth}
          className="h-min cursor-pointer rounded-full border border-[var(--border-default)] px-1 text-lg font-extrabold text-[var(--text-primary)] shadow-md hover:bg-[var(--accent-subtle)] active:scale-97 md:p-1 md:px-3 md:text-xl"
        >
          ◂
        </button>

        {/* month label */}
        <div className="flex w-45 justify-center rounded-full border border-[var(--border-default)] p-1 text-sm text-[var(--text-primary)] uppercase shadow-md md:p-2 md:text-base">
          {selectedDate.toLocaleDateString("default", { month: "long" })} -{" "}
          {selectedDate.getFullYear()}
        </div>

        {/* next month button */}
        <button
          onClick={nextMonth}
          className="h-min cursor-pointer rounded-full border border-[var(--border-default)] px-1 text-lg font-extrabold text-[var(--text-primary)] shadow-md hover:bg-[var(--accent-subtle)] active:scale-97 md:p-1 md:px-3 md:text-xl"
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
          className="cursor-pointer rounded-full bg-[var(--accent-primary)] px-2 py-1.5 text-sm text-[var(--text-inverse)] shadow-lg active:scale-99 md:px-5 md:py-2 md:text-base"
        >
          + Add new Budget
        </button>
      </div>
    </div>
  );
};

export default Options;
