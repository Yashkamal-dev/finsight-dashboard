import { useMemo } from "react";
import type { budgetType } from "../../../types/Budget";
import type { option } from "../../../types/optionsType";
import BudgetCard from "./BudgetCard";

type props = {
  allBudget: budgetType[];
  selectedOption: option;
};

const BudgetCardCon = ({ allBudget, selectedOption }: props) => {
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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(440px,1fr))] gap-6 py-5">
      {budget.map((bdgt) => {
        return (
          <BudgetCard
            key={bdgt["id"]}
            category={bdgt["category"]}
            status={bdgt["status"] || 0}
            spent={bdgt["spent"] || 0}
            limit={bdgt["limit"]}
          />
        );
      })}
    </div>
  );
};

export default BudgetCardCon;
