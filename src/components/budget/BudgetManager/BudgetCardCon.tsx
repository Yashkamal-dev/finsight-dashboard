import { useMemo } from "react";
import type { budgetType } from "../../../types/Budget";
import type { option } from "../../../types/optionsType";
import BudgetCard from "./BudgetCard";

type props = {
  allBudget: budgetType[];
  selectedOption: option;
  setbdgtToEdit: React.Dispatch<React.SetStateAction<budgetType | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteing: React.Dispatch<React.SetStateAction<boolean>>;
  setbdgtToDelete: React.Dispatch<React.SetStateAction<budgetType | null>>;
};

const BudgetCardCon = ({
  allBudget,
  selectedOption,
  setbdgtToEdit,
  setIsEditing,
  setIsDeleteing,
  setbdgtToDelete,
}: props) => {
  // sorted allBudget based on status percentage
  let budget = allBudget.sort((a, b) => {
    return a["status"] - b["status"];
  });

  // filtering data whenever the selected option/date changes
  budget = useMemo(() => {
    return allBudget.filter((bdgt) => {
      if (selectedOption["value"] === "all") {
        return bdgt;
      } else if (selectedOption["value"] === "safe") {
        return bdgt["status"] < 70;
      } else if (selectedOption["value"] === "warning") {
        return bdgt["status"] >= 70 && bdgt["status"] <= 100;
      } else if (selectedOption["value"] === "exceeded") {
        return bdgt["status"] > 100;
      }
    });
  }, [selectedOption, allBudget]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] md:gap-6 gap-4 py-5 md:grid-cols-[repeat(auto-fit,minmax(450px,1fr))]">
      {/* if no budget found */}
      {allBudget.length === 0 ? (
        // if no records for the selected month
        <div className="flex flex-col items-center py-10">
          {/* main text if no records found for selected month */}
          <p className="text-[var(--text-primary)] md:text-lg">
            No budgets for this month
          </p>

          {/* sub text if no records found for selected month */}
          <p className="text-center text-sm text-[var(--text-muted)] md:text-base">
            Start by creating a budget to track your spending and stay on top of
            your finances
          </p>
        </div>
      ) : (
        false
      )}

      {budget.map((bdgt) => {
        return (
          <BudgetCard
            key={bdgt["id"]}
            category={bdgt["category"]}
            status={bdgt["status"] || 0}
            spent={bdgt["spent"] || 0}
            limit={bdgt["limit"]}
            bdgt={bdgt}
            setbdgtToEdit={setbdgtToEdit}
            setIsEditing={setIsEditing}
            setIsDeleteing={setIsDeleteing}
            setbdgtToDelete={setbdgtToDelete}
          />
        );
      })}
    </div>
  );
};

export default BudgetCardCon;
