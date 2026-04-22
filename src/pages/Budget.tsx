import { useMemo, useState } from "react";
import TopBar from "../layouts/TopBar";
import BudgetManagerCon from "../components/budget/BudgetManager/BudgetManagerCon";
import type { option } from "../types/optionsType";
import { getBudget } from "../types/Budget";
import BudgetSummaryCon from "../components/budget/BudgetSummary/BudgetSummaryCon";

// options for status
const statuses: option[] = [
  { label: "All", value: "all" },
  { label: "Safe", value: "safe" },
  { label: "Warning", value: "warning" },
  { label: "Over Budget", value: "exceeded" },
];

const Budget = () => {
  // selected date
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // selected option
  const [selectedOption, setSelectedOption] = useState<option>(statuses[0]);

  // fetching the data when date changes
  let budgetData = useMemo(() => {
    return getBudget(selectedDate);
  }, [selectedDate]);

  // filtering data whenever the selected option changes
  budgetData = useMemo(() => {
    return budgetData.filter((bdgt) => {
      if (selectedOption["value"] === "all") {
        return bdgt;
      } else if (selectedOption["value"] === "safe") {
        return bdgt["status"]! < 70;
      } else if (selectedOption["value"] === "warning") {
        return bdgt["status"]! >= 70 && bdgt["status"]! <= 100;
      } else if (selectedOption["value"] === "exceeded") {
        return bdgt["status"]! > 100;
      }
    });
  }, [selectedOption]);

  return (
    <div className="px-4">
      {/* topbar of the page */}
      <TopBar pageTitle="Budget" message="Set limits and track your spending" />

      {/* hero component container */}
      <div className="flex flex-wrap">
        {/* budgetManager component compnent */}
        <BudgetManagerCon
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          options={statuses}
          selected={selectedOption}
          onChange={(val) => {
            setSelectedOption(val);
          }}
          budgetData={budgetData}
        />

        <BudgetSummaryCon />
      </div>
    </div>
  );
};

export default Budget;
