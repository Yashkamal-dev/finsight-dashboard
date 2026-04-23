import type { goal } from "../types/goals";

// function to get the goals from the localstorage
export const getGoals = () => {
  // getting goals from the localstorage
  const goals: goal[] = JSON.parse(localStorage.getItem("goals") || "[]");

  return goals;
};

// function that generate date in "31 Dec 2026" format
export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
