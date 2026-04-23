import type { budgetType } from "../../../types/Budget";
import MonthlyBudgetCard from "./MonthlyBudgetCard";
import MostExpense from "./MostExpense";

type props = {
  allBudget: budgetType[];
  selectedDate: Date;
};

const BudgetSummaryCon = ({ allBudget, selectedDate }: props) => {
  return (
    <div className="flex flex-[1_1_400px] flex-col gap-5">
      {/* component to show monthly status */}
      <MonthlyBudgetCard allBudget={allBudget} />

      {/* most expenses teble */}
      <MostExpense selectedDate={selectedDate} allBudget={allBudget} />
    </div>
  );
};

export default BudgetSummaryCon;
