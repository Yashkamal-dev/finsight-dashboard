import { useState } from "react";
import TopBar from "../layouts/TopBar";
import BudgetManagerCon from "../components/budget/BudgetManager/BudgetManagerCon";
import type { option } from "../types/optionsType";
import { getBudget } from "../types/Budget";

// options for status
const statuses: option[] = [
  { label: "All", value: "all" },
  { label: "Safe", value: "safe" },
  { label: "Warning", value: "warning" },
  { label: "Exceeded", value: "exceeded" },
];

const Budget = () => {
  // selected date
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // selected option
  const [selectedOption, setSelectedOption] = useState<option>(statuses[0]);

  const budgetData = getBudget(selectedDate);
  console.log(budgetData);

  return (
    <div className="px-4">
      {/* topbar of the page */}
      <TopBar pageTitle="Budget" message="Set limits and track your spending" />

      {/* hero component container */}
      <div>
        {/* budgetManager component compnent */}
        <BudgetManagerCon
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          options={statuses}
          selected={selectedOption}
          onChange={(val) => {
            setSelectedOption(val);
          }}
        />
      </div>
    </div>
  );
};

export default Budget;
