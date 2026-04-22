import type { budgetType } from "../../../types/Budget";
import MonthlyBudgetCard from "./MonthlyBudgetCard";

type props = {
  allBudget: budgetType[];
};

const BudgetSummaryCon = ({ allBudget }: props) => {
  return (
    <div className="flex-[1_1_400px]">
      <MonthlyBudgetCard allBudget={allBudget} />
    </div>
  );
};

export default BudgetSummaryCon;
