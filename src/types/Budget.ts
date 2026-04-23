import { dateMatchModifiers } from "react-day-picker";
import { getData, monthStringGen } from "../utils/transactionContextUtils";
import type { transactionInterface } from "./transaction";

export type budgetType = {
  id: string;
  category: string;
  limit: number;
  spent?: number;
  month: string;
  createdAt: string;
  status?: number;
};

// funtion to get the budget data of selected month And
// calculating spent and status for each budget
export const getBudget = (Date: Date): budgetType[] => {
  // creating budgets if not existed
  if (!JSON.parse(localStorage.getItem("budgets")!)) {
    localStorage.setItem("budgets", JSON.stringify({}));
  }

  // fetching entire budget object from the localstorage / each month's data
  const allBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");

  // if not exists making an array and storing it in localstorage
  if (!allBudgets[monthStringGen(Date)]) {
    allBudgets[monthStringGen(Date)] = [];

    // storing in lcoalstorage
    localStorage.setItem("budgets", JSON.stringify(allBudgets));
  }

  // getting the data of budget for selected month
  const selectedMonthBudget: budgetType[] = allBudgets[monthStringGen(Date)];

  // getting the transaction for the passed date
  const transactions = getData(monthStringGen(Date));

  // method to get spent for each the budget
  selectedMonthBudget.forEach((budget) => {
    // stroing the budget category to use it.
    const selectedCategory = budget["category"];

    // getiing the spent amount for the budget using selected Category
    const spent = transactions
      .filter((txn: transactionInterface) => {
        return txn["category"] === selectedCategory;
      })
      .reduce((acc: number, curr: transactionInterface) => {
        return acc + curr["amount"];
      }, 0);

    // assigning status and spent to the selected month's budget
    budget["spent"] = spent;
    budget["status"] = (spent / budget["limit"]) * 100;
  });

  return selectedMonthBudget;
};
