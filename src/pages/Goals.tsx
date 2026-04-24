import { useState } from "react";
import Filter from "../components/Goal/Filter";
import TopBar from "../layouts/TopBar";
import Hero from "../components/Goal/Hero";
import AddGoal from "../components/Goal/Add Goal/AddGoal";

const Goals = () => {
  // state to show addGoal modal
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // states for filtering
  const [all, setAll] = useState<boolean>(true); // state for "all" filter
  const [inProgress, setInProgress] = useState<boolean>(false); // state for "in progress" filter
  const [completed, setCompleted] = useState<boolean>(false); // state for "completed" filter
  const [notStarted, setnotStarted] = useState<boolean>(false); // state for "not started" filter

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
      />

      {/* conditional rendering for the add Goal component - based on isAdding */}
      {isAdding && <AddGoal setIsAdding={setIsAdding} />}
    </div>
  );
};

export default Goals;
