import { useEffect, useState } from "react";
import TopBar from "../layouts/TopBar";
import BudgetManagerCon from "../components/budget/BudgetManager/BudgetManagerCon";
import type { option } from "../types/optionsType";
import { getBudget, type budgetType } from "../types/Budget";
import BudgetSummaryCon from "../components/budget/BudgetSummary/BudgetSummaryCon";
import AddBudget from "../components/budget/AddBudget";
import EditBudget from "../components/budget/Edit budget/EditBudget";

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

  // state for the rendering of the add budget
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // state that holds budget to edit
  const [bdgtToEdit, setbdgtToEdit] = useState<budgetType | null>(null);

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
          setbdgtToEdit={setbdgtToEdit}
          setIsEditing={setIsEditing}
        />

        {/* budget summary component - container of monthly budget */}
        <BudgetSummaryCon allBudget={allBudget} selectedDate={selectedDate} />

        {/* conditional rendering for the adding new budget modal */}
        {isAdding && (
          <AddBudget setIsAdding={setIsAdding} setAllBudget={setAllBudget} />
        )}

        {/* conditional rendering for the edditing modal */}
        {isEditing && (
          <EditBudget
            budget={bdgtToEdit!}
            setIsEditing={setIsEditing}
            setAllBudget={setAllBudget}
          />
        )}
      </div>
    </div>
  );
};

export default Budget;
