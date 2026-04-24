import { createContext, useState, type ReactNode } from "react";
import type { goal } from "../types/goals";
import { getGoals } from "../utils/goalUtil";

type contextType = {
  goals: goal[];
  setGoals: React.Dispatch<React.SetStateAction<goal[]>>;
};

export const goalsData = createContext<contextType | null>(null);

const GoalContext = ({ children }: { children: ReactNode }) => {
  // goals state that containes goals data from localstorage
  const [goals, setGoals] = useState(() => {
    return getGoals();
  });

  return (
    <goalsData.Provider value={{ goals, setGoals }}>
      {children}
    </goalsData.Provider>
  );
};

export default GoalContext;
