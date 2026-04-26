import type { budgetType } from "../../../types/Budget";
import EditBudgetForm from "./EditBudgetForm";

type props = {
  budget: budgetType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setAllBudget: React.Dispatch<React.SetStateAction<budgetType[]>>;
};

const EditBudget = ({ budget, setIsEditing, setAllBudget }: props) => {
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
      <EditBudgetForm
        budget={budget}
        setIsEditing={setIsEditing}
        setAllBudget={setAllBudget}
      />
    </div>
  );
};

export default EditBudget;
