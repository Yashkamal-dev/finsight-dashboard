import type { budgetType } from "../../../types/Budget";
import BudgetCard from "./BudgetCard";

type props = {
  budgetData: budgetType[];
};

const BudgetCardCon = ({ budgetData }: props) => {
  // sorted budgetData based on status percentage
  budgetData = budgetData.sort((a, b) => {
    return a["status"]! - b["status"]!;
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(440px,1fr))] gap-6 py-5">
      {budgetData.map((bdgt) => {
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
