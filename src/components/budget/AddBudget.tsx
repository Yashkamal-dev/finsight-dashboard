import React from "react";
import AddBudgetForm from "./AddBudgetForm";

type props = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBudget = ({ setIsAdding }: props) => {
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
      <AddBudgetForm setIsAdding={setIsAdding}  />
    </div>
  );
};

export default AddBudget;
