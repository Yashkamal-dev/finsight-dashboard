import { useState } from "react";
import Filter from "../components/Goal/Filter";
import TopBar from "../layouts/TopBar";
import Hero from "../components/Goal/Hero";
import AddGoal from "../components/Goal/Add Goal/AddGoal";
import EditGoal from "../components/Goal/Edit Goal/EditGoal";
import type { goal } from "../types/goals";
import DeleteRecord from "../components/general/DeleteRecord";
import { deleteGoal } from "../utils/goalUtil";
import { useGoals } from "../hooks/useGoals";

const Goals = () => {
  // getting the setgoal to update UI after deleting a goal
  const { setGoals } = useGoals();

  // state to show addGoal modal
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // state to show edit goal modal
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // state to hold goal for editing
  const [goalToEdit, setGoalToEdit] = useState<goal | null>(null);

  // state for rendering the delete modal
  const [isDeleteing, setIsDeleteing] = useState<boolean>(false);
  // state that hold the goal to delete
  const [goalToDelete, setGoalToDelete] = useState<goal | null>(null);

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
        setIsEditing={setIsEditing}
        setGoalToEdit={setGoalToEdit}
        setIsDeleteing={setIsDeleteing}
        setGoalToDelete={setGoalToDelete}
      />

      {/* conditional rendering for the add Goal component - based on isAdding */}
      {isAdding && <AddGoal setIsAdding={setIsAdding} />}

      {/* conditional rendering for the edit Goal component - based on setIsEditing */}
      {isEditing && <EditGoal setIsEditing={setIsEditing} goal={goalToEdit!} />}

      {/* conditional rendering for the delete Transaction modal */}
      {isDeleteing && (
        <DeleteRecord
          entity="Goal"
          setIsDeleting={setIsDeleteing}
          deleteFun={() => {
            deleteGoal(goalToDelete, setGoals);
          }}
        />
      )}
    </div>
  );
};

export default Goals;
