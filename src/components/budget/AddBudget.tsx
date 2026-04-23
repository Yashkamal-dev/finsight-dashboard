import React from "react";
import AddBudgetForm from "./AddBudgetForm";
import type { budgetType } from "../../types/Budget";

type props = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  setAllBudget: React.Dispatch<React.SetStateAction<budgetType[]>>;
};

const AddBudget = ({ setIsAdding, setAllBudget }: props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Backdrop layer */}
      <div
        onClick={() => setIsAdding(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
      >
        {" "}
      </div>

      {/* modal layer - contains the form */}
      <AddBudgetForm setIsAdding={setIsAdding} setAllBudget={setAllBudget} />
    </div>
  );
};

export default AddBudget;
