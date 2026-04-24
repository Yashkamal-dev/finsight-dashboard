import type { goal } from "../types/goals";
import type { transactionInterface } from "../types/transaction";
import { monthStringGen } from "./transactionContextUtils";

// function to get the goals from the localstorage
export const getGoals = () => {
  // if goal key doesn't exists in localstorage, creating one
  if (!localStorage.getItem("goals")) {
    localStorage.setItem("goals", JSON.stringify([]));
  }

  // getting goals from the localstorage
  const goals: goal[] = JSON.parse(localStorage.getItem("goals") || "[]");

  return goals;
};

export const addGoal = (newGoal: goal) => {
  // fetching goals from the localstorage
  const allGoals = JSON.parse(localStorage.getItem("goals") || "[]");

  // adding the new goal
  allGoals.push(newGoal);

  // storing new goals array wiht new goal into localstorage
  localStorage.setItem("goals", JSON.stringify(allGoals));
};

// function that generate date in "31 Dec 2026" format
export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// function to add Contribution to a goal
export const addContributionToGoal = (
  id: string,
  contributionAmount: number,
  title: string,
  addTransaction: (transaction: transactionInterface, month: string) => void,
  setGoals: React.Dispatch<React.SetStateAction<goal[]>>,
) => {
  // getting goals from the localstaorage
  const goals = getGoals();

  // getting the entire array by
  // Add contribution to the selected goal's saved amount
  const newGoals = goals.map((goal) => {
    if (goal["id"] === id) {
      // returning if id found
      return {
        ...goal,
        savedAmount: goal["savedAmount"] + contributionAmount,
      };
    }

    // returning if id not found
    return goal;
  });

  // adding the goal array into localstorage
  localStorage.setItem("goals", JSON.stringify(newGoals));

  // transaction for the goal
  const goalTransaction: transactionInterface = {
    id: crypto.randomUUID(),
    type: "Goal",
    amount: contributionAmount,
    category: "Goal Contribution",
    title: `Contribution to ${title}`,
    note: `Added ₹${contributionAmount} to ${title} goal `,
    paymentMethod: "Balance",
    date: new Date().toLocaleDateString("en-CA"),
    createdAt: new Date().toISOString(),
  };

  // storing goal transaction into localstorage
  addTransaction(goalTransaction, monthStringGen(new Date()));

  // updating the goals state for UI update
  setGoals(newGoals);
};
