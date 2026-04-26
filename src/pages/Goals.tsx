import { useState } from "react";
import Filter from "../components/Goal/Filter";
import TopBar from "../layouts/TopBar";
import Hero from "../components/Goal/Hero";
import AddGoal from "../components/Goal/Add Goal/AddGoal";
import EditGoal from "../components/Goal/Edit Goal/EditGoal";
import type { goal } from "../types/goals";

const Goals = () => {
  // state to show addGoal modal
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // state to show edit goal modal
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // state to hold goal for editing
  const [goalToEdit, setGoalToEdit] = useState<goal | null>(null);

  // states for filtering
  const [all, setAll] = useState<boolean>(true); // state for "all" filter
  const [inProgress, setInProgress] = useState<boolean>(false); // state for "in progress" filter
  const [completed, setCompleted] = useState<boolean>(false); // state for "completed" filter
  const [notStarted, setnotStarted] = useState<boolean>(false); // state for "not started" filter

  const goal: goal = {
    createdAt: new Date("2026-01-01"),
    deadline: undefined,
    id: "g3",
    savedAmount: 30000,
    status: "in-progress",
    targetAmount: 100000,
    title: "Emergency Fund",
  };

  return (
    <div className="px-4">
      {/* topbar for the goals page */}
      <TopBar
        pageTitle="Goals"
        message="Plan, track, and achieve your financial milestones."
      />

      {/* filter component */}
      <Filter
        all={all}
        setAll={setAll}
        inProgress={inProgress}
        setInProgress={setInProgress}
        completed={completed}
        setCompleted={setCompleted}
        notStarted={notStarted}
        setnotStarted={setnotStarted}
        setIsAdding={setIsAdding}
      />

      {/* hero component that cotaines goals card fo all status */}
      <Hero
        all={all}
        inProgress={inProgress}
        completed={completed}
        notStarted={notStarted}
        setIsEditing={setIsEditing}
        setGoalToEdit={setGoalToEdit}
      />

      {/* conditional rendering for the add Goal component - based on isAdding */}
      {isAdding && <AddGoal setIsAdding={setIsAdding} />}

      {/* conditional rendering for the edit Goal component - based on setIsEditing */}
      {isEditing && <EditGoal setIsEditing={setIsEditing} goal={goalToEdit!} />}
    </div>
  );
};

export default Goals;
