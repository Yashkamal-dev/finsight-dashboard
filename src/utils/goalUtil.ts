import type { goal } from "../types/goals";

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
