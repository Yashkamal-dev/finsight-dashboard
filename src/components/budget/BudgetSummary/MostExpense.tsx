import { useMemo, useState } from "react";
import { getBudget, type budgetType } from "../../../types/Budget";

type props = {
  selectedDate: Date;
  allBudget: budgetType[];
};

const MostExpense = ({ selectedDate, allBudget }: props) => {
  // state for the order
  const [isAscending, setIsAscending] = useState<boolean>(false);

  // variable to set up previous month
  const prevMonth = new Date(selectedDate);

  // getting the data for the selected month
  let CurrentMonthBudget = useMemo(() => {
    return getBudget(selectedDate);
  }, [selectedDate, allBudget]);

  // getting the data for the previous month of the selected month
  const PrevMonthBudget = useMemo(() => {
    return getBudget(new Date(prevMonth.setMonth(prevMonth.getMonth() - 1)));
  }, [selectedDate, allBudget]);

  // checking only if the budget are present
  if (PrevMonthBudget.length !== 0) {
    // assining status based on the previous month record for each budget
    CurrentMonthBudget.forEach((bdgt) => {
      const category = bdgt["category"];

      // filterring out budget from the previous month data
      const prevMonthRecord = PrevMonthBudget.filter((budget) => {
        return budget["category"] === category;
      });

      // assigning status only if the category has been found
      if (prevMonthRecord.length !== 0) {
        const difference =
          (bdgt["spent"]! / prevMonthRecord[0]["spent"]!) * 100;
        const status = 100 - difference;
        bdgt["status"] = status;
      }
    });
  }

  // sorting based on the state
  if (isAscending === true) {
    CurrentMonthBudget = CurrentMonthBudget.sort((a, b) => {
      return a["spent"]! - b["spent"]!;
    });
  } else if (isAscending === false) {
    CurrentMonthBudget = CurrentMonthBudget.sort((a, b) => {
      return b["spent"]! - a["spent"]!;
    });
  }

  return (
    <div className="flex flex-col gap-5 rounded-4xl border border-[var(--border-default)] p-3 md:p-5">
      {/* header */}
      <header className="flex items-center justify-between text-xl font-bold md:text-2xl">
        {/* title */}
        <h1>Most Expense</h1>

        {/* sort button */}
        <button
          onClick={() => {
            setIsAscending(!isAscending);
          }}
          className="cursor-pointer rounded-full border p-2"
        >
          <svg
            className="fill-[var(--text-secondary)]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z" />
          </svg>
        </button>
      </header>

      {/* expense container */}
      <div>
        {/* each expense */}
        {CurrentMonthBudget.map((bdgt) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="flex items-center justify-between border-b border-b-[var(--border-default)] p-2 md:p-3"
            >
              {/* amount and category container */}
              <div className="">
                {/* amount */}
                <p className="text-lg font-bold md:text-xl">
                  ₹{bdgt["spent"].toLocaleString("en-IN")}
                </p>

                {/* category */}
                <p className="text-base text-[var(--text-secondary)] capitalize md:text-lg">
                  {bdgt["category"]}
                </p>
              </div>

              {/* difference */}
              <div
                className={`min-w-18 rounded-full text-center text-xs md:min-w-25 md:text-base ${
                  bdgt["status"]! === 0
                    ? "bg-[var(--warning-bg)] text-[var(--warning)]"
                    : bdgt["status"]! < 0
                      ? "bg-[var(--success-bg)] text-[var(--success)]"
                      : "bg-[var(--danger-bg)] text-[var(--danger)]"
                } px-1 py-0.5 md:px-2`}
              >
                {bdgt["status"]! === 0 ? "≈" : bdgt["status"]! < 0 ? "↓" : "↑"}{" "}
                {Math.abs(
                  Number.isInteger(bdgt["status"])
                    ? bdgt["status"]!
                    : Math.round(bdgt["status"]! * 100) / 100,
                )}{" "}
                %
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostExpense;
