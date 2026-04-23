import { useEffect, useState } from "react";
import TopBar from "../layouts/TopBar";
import BudgetManagerCon from "../components/budget/BudgetManager/BudgetManagerCon";
import type { option } from "../types/optionsType";
import { getBudget, type budgetType } from "../types/Budget";
import BudgetSummaryCon from "../components/budget/BudgetSummary/BudgetSummaryCon";
import AddBudget from "../components/budget/AddBudget";

// options for status
const statuses: option[] = [
  { label: "All", value: "all" },
  { label: "Safe", value: "safe" },
  { label: "Warning", value: "warning" },
  { label: "Over Budget", value: "exceeded" },
];

const Budget = () => {
  // state for the rendering of the add budget
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // selected date
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // selected option
  const [selectedOption, setSelectedOption] = useState<option>(statuses[0]);

  // all budget of this month
  const [allBudget, setAllBudget] = useState<budgetType[]>([]);

  // fetching budget on date change
  useEffect(() => {
    const data = getBudget(selectedDate);
    setAllBudget(data);
  }, [selectedDate]);

  return (
    <div className="px-4">
      {/* topbar of the page */}
      <TopBar pageTitle="Budget" message="Set limits and track your spending" />

      {/* hero component container */}
      <div className="flex flex-wrap gap-5">
        {/* budgetManager component compnent */}
        <BudgetManagerCon
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          options={statuses}
          selected={selectedOption}
          onChange={(val) => {
            setSelectedOption(val);
          }}
          allBudget={allBudget}
          selectedOption={selectedOption}
          setIsAdding={setIsAdding}
        />

        {/* budget summary component - container of monthly budget */}
        <BudgetSummaryCon allBudget={allBudget} selectedDate={selectedDate} />

        {isAdding && (
          <AddBudget setIsAdding={setIsAdding} setAllBudget={setAllBudget} />
        )}
      </div>
    </div>
  );
};

export default Budget;
