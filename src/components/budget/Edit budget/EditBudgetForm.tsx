import React, { useState } from "react";
import Dropdown from "../../general/Dropdown";
import type { option } from "../../../types/optionsType";
import { getBudget, type budgetType } from "../../../types/Budget";
import { monthStringGen } from "../../../utils/transactionContextUtils";

// expenses for the options of categories
const expenseCategories: option[] = [
  { label: "", value: "" },
  { label: "Rent", value: "rent" },
  { label: "Food", value: "food" },
  { label: "Health", value: "health" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Transport", value: "transport" },
  { label: "Investment", value: "investment" },
  { label: "Transfer", value: "transfer" },
  { label: "Donation", value: "donation" },
];

type props = {
  budget: budgetType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setAllBudget: React.Dispatch<React.SetStateAction<budgetType[]>>;
};

const EditBudgetForm = ({ budget, setIsEditing, setAllBudget }: props) => {
  // limit state
  const [limit, setLimit] = useState<number>(budget["limit"]);

  // filtering the categories option for the dropdown from the previous budget
  const [prevCategory] = expenseCategories.filter((expense) => {
    return expense["value"] === budget["category"];
  });

  // category status
  const [category, setCategory] = useState(prevCategory);

  // handleing from's default behaviour
  const submitEventhandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // errors present
  const [errors, setErrors] = useState({
    AddingExisting: false, // error if the adding category already exists
    limit: false, // error for limit feild
    category: false, // error for category dropdown
  });

  // function to validate form
  const validateForms = () => {
    const newErr = { AddingExisting: false, limit: false, category: false };

    // validating the limit state
    if (!limit || limit === 0) {
      newErr["limit"] = true;
    }

    // validating category state
    if (category === expenseCategories[0]) {
      newErr["category"] = true;
    }

    // setting up new error
    setErrors(newErr);

    return newErr;
  };

  // function to edit a budget
  const editBudget = () => {
    const errs = validateForms();

    // returining if error exists
    if (Object.values(errs).some(Boolean)) return;

    // defining new budget object
    const newBudget: budgetType = {
      id: budget["id"],
      createdAt: budget["createdAt"],
      month: budget["month"],
      spent: budget["spent"],
      status: budget["status"],
      category: category["value"],
      limit: limit,
    };

    // getting the entire budget object from the localstorage
    const budgets = JSON.parse(localStorage.getItem("budgets") || "{}");

    // getting the current month budgets out of budget object
    const monthBudget = budgets[monthStringGen(new Date(newBudget["month"]))];

    // checking duplicate
    const checkIfExist = monthBudget.some((bdgt: budgetType) => {
      return bdgt.category === newBudget.category && bdgt.id !== newBudget.id;
    });

    // if budget already exists returning immedietly
    if (checkIfExist) {
      setErrors((prev) => {
        return { ...prev, AddingExisting: true };
      });
      return;
    }

    // editing the budget using it's ID
    const updatedMonthBudget = monthBudget.map((bdgt: budgetType) => {
      // returning new budget when id matched
      if (bdgt["id"] === newBudget["id"]) {
        return newBudget;
      }

      // returning rest of the arrray untouched
      return bdgt;
    });

    // adding that array into the budget object
    budgets[monthStringGen(new Date(newBudget["month"]))] = updatedMonthBudget;

    // storing budget object in localstorage
    localStorage.setItem("budgets", JSON.stringify(budgets));

    // updating the budget state for UI update
    setAllBudget(getBudget(new Date(newBudget["month"])));

    // closing the adding modal / component
    setIsEditing(false);
  };

  return (
    <div
      className={`relative flex w-95 flex-col gap-5 rounded-3xl bg-[var(--bg-primary)] px-5 py-4 shadow-xl md:w-125`}
    >
      {/* header of the add budget form */}
      <header className="flex flex-col items-center justify-center gap-1">
        {/* title */}
        <h1 className="text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
          Edit Budget
        </h1>
        {/* subttle */}
        <h2 className="text-sm text-[var(--text-secondary)] md:text-base">
          Update your budget details to stay on track
        </h2>

        {/* error if the budget already exixts in localstorage */}
        {errors["AddingExisting"] === true ? (
          <p className="text-lg text-[var(--danger)]">
            A budget for this category already exists.
          </p>
        ) : (
          ""
        )}
      </header>

      {/* form */}
      <form
        onSubmit={(e) => {
          submitEventhandler(e);
        }}
        className="flex flex-col gap-5"
      >
        {/* limit and category container */}
        <div className="flex gap-3 md:gap-5">
          {/* limit container */}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* limit label */}
            <div className="flex gap-2">
              {/* label */}
              <p className="font-medium md:text-lg">Limit</p>

              {/* error if not assigned valid value */}
              {errors["limit"] == true ? (
                <span className={`text-lg text-[var(--danger)]`}>*</span>
              ) : (
                ""
              )}
            </div>

            {/* limit input */}
            <input
              value={limit}
              onChange={(e) => {
                setErrors((prev) => {
                  return { ...prev, limit: false };
                });
                setLimit(Number(e.target.value));
              }}
              type="number"
              className={`rounded-full border text-sm md:text-base ${errors["limit"] === true ? "border-[var(--danger)]" : ""} border-[var(--border-default)] py-2 pl-3 shadow-lg focus:outline-0`}
            />
          </div>

          {/* category container */}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* category label */}
            <div className="flex gap-2">
              {/* label */}
              <p className="font-medium md:text-lg">Category</p>

              {/* error if not assigned valid value */}
              {errors["category"] == true ? (
                <span className={`text-lg text-[var(--danger)]`}>*</span>
              ) : (
                ""
              )}
            </div>

            <Dropdown
              error={errors["category"]}
              options={expenseCategories}
              selected={category}
              onChange={(val) => {
                setErrors((prev) => {
                  return { ...prev, category: false };
                });
                setCategory(val);
              }}
              placeholder="Select Category"
            />
          </div>
        </div>

        {/* cancel and save button */}
        <div className="mt-1 flex gap-3 border-t border-[var(--border-default)] pt-4.5 pb-1 text-sm md:text-base">
          {/* cancel button */}
          <button
            onClick={() => {
              setIsEditing(false);
            }}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-2.5 text-[var(--text-primary)] shadow-xl"
          >
            Cancel
          </button>

          {/* save button */}
          <button
            onClick={editBudget}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] py-2.5 text-[var(--text-inverse)] shadow-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBudgetForm;
