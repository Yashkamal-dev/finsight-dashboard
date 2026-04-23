import { useState } from "react";
import Filter from "../components/Goal/Filter";
import TopBar from "../layouts/TopBar";
import Hero from "../components/Goal/Hero";

const Goals = () => {
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
      />

      {/* hero component that cotaines all kinds of goals card */}
      <Hero />
    </div>
  );
};

export default Goals;
