import { useContext } from "react";
import { goalsData } from "../context/GoalContext";

export const useGoals = () => {
  // getting the transaction
  const context = useContext(goalsData);

  // validating the null type
  if (!context) {
    throw new Error("GoalContext must be used within GoalProvider");
  }

  return { ...context };
};
