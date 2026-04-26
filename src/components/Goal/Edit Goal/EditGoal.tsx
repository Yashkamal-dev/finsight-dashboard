import type { goal } from "../../../types/goals";
import EditGoalForm from "./EditGoalForm";

type props = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  goal: goal;
};

const EditGoal = ({ setIsEditing, goal }: props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Backdrop layer */}
      <div
        onClick={() => {
          setIsEditing(false);
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
      >
        {" "}
      </div>

      {/* modal layer - contains the form */}
      <EditGoalForm setIsEditing={setIsEditing} goal={goal} />
    </div>
  );
};

export default EditGoal;
