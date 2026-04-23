import React, { useState } from "react";
import type { option } from "../../types/optionsType";
import Dropdown from "../general/Dropdown";
import { monthStringGen } from "../../utils/transactionContextUtils";
import type { budgetType } from "../../types/Budget";

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
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBudgetForm = ({ setIsAdding }: props) => {
  // limit state
  const [limit, setLimit] = useState<number>();

  // category status
  const [category, setCategory] = useState(expenseCategories[0]);

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

  // function to save the transaction into localstorage
  const saveBudget = () => {
    const errs = validateForms();

    // returining if error exists
    if (Object.values(errs).some(Boolean)) return;

    // defining new budget object
    const newBudget: budgetType = {
      id: crypto.randomUUID(),
      category: category["value"],
      limit: limit!,
      createdAt: new Date().toISOString(),
      month: new Date().toISOString().slice(0, 7),
    };

    // getting the entire budget object from the localstorage
    const budgets = JSON.parse(localStorage.getItem("budgets") || "{}");

    // getting the current month budgets out of budget object
    const monthBudget = budgets[monthStringGen(new Date())];

    // filtering to find if the budget already exists
    const checkIfExist = monthBudget.filter((bdgt: budgetType) => {
      return bdgt["category"] === newBudget["category"];
    });

    // if budget already exists returning immedietly
    if (checkIfExist.length !== 0) {
      setErrors((prev) => {
        return { ...prev, AddingExisting: true };
      });
      return;
    }

    // adding the new budget into our array
    monthBudget.push(newBudget);

    // adding that array into the budget object
    budgets[monthStringGen(new Date())] = monthBudget;

    // storing budget object in localstorage
    localStorage.setItem("budgets", JSON.stringify(budgets));

    // closing the adding modal / component
    setIsAdding(false);
  };

  // handleing from's default behaviour
  const submitEventhandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={`relative flex w-125 flex-col gap-5 rounded-3xl bg-[var(--bg-primary)] px-5 py-4 shadow-xl`}
    >
      {/* header of the add budget form */}
      <header className="flex flex-col items-center justify-center gap-1">
        {/* title */}
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Add budgets
        </h1>
        {/* subttle */}
        <h2 className="text-[var(--text-secondary)]">
          Set spending limits for your categories
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
        <div className="flex gap-5">
          {/* limit container */}
          <div className="flex flex-col gap-2">
            {/* limit label */}
            <div className="flex gap-2">
              {/* label */}
              <p className="text-lg font-medium">Limit</p>

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
              className={`rounded-full ${errors["limit"] === true ? "border-[var(--danger)]" : ""} border border-[var(--border-default)] py-2 pl-3 shadow-lg focus:outline-0`}
            />
          </div>

          {/* category container */}
          <div className="flex grow flex-col gap-2">
            {/* category label */}
            <div className="flex gap-2">
              {/* label */}
              <p className="text-lg font-medium">Category</p>

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
        <div className="mt-1 flex gap-3 border-t border-[var(--border-default)] pt-4.5 pb-1">
          {/* cancel button */}
          <button
            onClick={() => {
              setIsAdding(false);
            }}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-2.5 text-[var(--text-primary)] shadow-xl"
          >
            Cancel
          </button>

          {/* save button */}
          <button
            onClick={saveBudget}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] py-2.5 text-[var(--text-inverse)] shadow-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBudgetForm;
