import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { addGoal, editGoal, formatDate } from "../../../utils/goalUtil";
import type { goal } from "../../../types/goals";
import { useGoals } from "../../../hooks/useGoals";

type props = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  goal: goal;
};

const EditGoalForm = ({ setIsEditing, goal }: props) => {
  // getiing setgoals to update the UI
  const { setGoals } = useGoals();

  // state for the title of the goal
  const [title, setTitle] = useState<string>(goal["title"]);

  // state for the target amount
  const [targetAmount, setTargetAmount] = useState<number>(
    goal["targetAmount"],
  );

  // state for the Date
  const [date, setDate] = useState<Date | undefined>(
    goal["deadline"] ? new Date(goal["deadline"]) : undefined,
  );

  // function to handle default behaviour
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // errors to validate fields
  const [errors, setErrors] = useState({
    title: false,
    targetAmount: false,
    belowSaved: false, // if try to edit amount below the already saved amount
  });

  // function to validate goal
  const validateGoal = () => {
    const newErrors = { title: false, targetAmount: false, belowSaved: false };

    // validating title
    if (!title || title.trim() === "") {
      newErrors["title"] = true;
    }

    // validating target amount
    if (!targetAmount || targetAmount <= 0) {
      newErrors["targetAmount"] = true;
    }

    if (targetAmount < goal["savedAmount"]) {
      newErrors["belowSaved"] = true;
    }

    setErrors(newErrors);

    return newErrors;
  };

  // function to save new goal
  const saveGoal = () => {
    // validating and fetching current errors
    const newErrors = validateGoal();

    // returning even if one error is true
    if (Object.values(newErrors).some(Boolean)) return;

    // handling types
    if (!title) return;
    if (!targetAmount) return;

    // building a goal object to store in localstorage
    const newGoal: goal = {
      id: goal["id"],
      savedAmount: goal["savedAmount"],
      status: goal["status"],
      createdAt: goal["createdAt"],
      title: title,
      targetAmount: targetAmount,
      deadline: date,
    };

    // updating if amount matches
    if (newGoal["savedAmount"] === newGoal["targetAmount"]) {
      newGoal["status"] = "completed";
    } else if (newGoal["savedAmount"] === 0) {
      // updating if editing a completed goal
      newGoal["status"] = "not-started";
    } else if (newGoal["savedAmount"] < newGoal["targetAmount"]) {
      // updating if editing a completed goal
      newGoal["status"] = "in-progress";
    }

    // editing the goal into localstorage
    editGoal(newGoal, setGoals);

    // closing the edit modal
    setIsEditing(false);
  };

  return (
    <div className="relative flex w-125 flex-col gap-5 rounded-3xl bg-[var(--bg-primary)] px-5 py-4 shadow-xl">
      {/* form heading */}
      <div className="flex flex-col items-center justify-center gap-1">
        {/* title */}
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Edit Goal
        </h1>
        {/* subttle */}
        <h2 className="text- text-[var(--text-secondary)]">
          Modify your goal details anytime
        </h2>
      </div>

      {/* form */}
      <form
        action="\"
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col gap-5"
      >
        {/* name container */}
        <div className="flex grow flex-col gap-2">
          {/* name label */}
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium">Title</p>
            {errors["title"] && (
              // text to show on error - (if empty)
              <span className="text-lg text-[var(--danger)]">*</span>
            )}
          </div>

          {/* name input */}
          <input
            type="text"
            placeholder="e.g. Grocery shopping"
            value={title}
            onChange={(e) => {
              setErrors((prev) => {
                return { ...prev, title: false };
              });
              setTitle(e.target.value);
            }}
            className={`grow rounded-full ${errors["title"] === true ? "border-[var(--danger)]" : ""} border border-[var(--border-default)] py-2 pl-5 text-lg shadow-lg focus:outline-0`}
          />
        </div>

        {/* target amount & deadline container */}
        <div className="flex h-fit items-center gap-3">
          {/* amount */}
          <div className="flex flex-1 flex-col gap-2">
            {/* amount label */}
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium">Amount</p>
              {(errors["targetAmount"] || errors["belowSaved"]) && (
                // text to show on error - (if empty)
                <span className="text-lg text-[var(--danger)]">
                  {targetAmount == undefined
                    ? "*"
                    : errors["belowSaved"] === true
                      ? "Min = saved amount"
                      : "Invalid"}
                </span>
              )}
            </div>

            {/* amount input */}
            <input
              type="number"
              placeholder="₹ 100.00"
              value={targetAmount}
              onChange={(e) => {
                setErrors((prev) => {
                  return { ...prev, targetAmount: false, belowSaved: false };
                });
                return setTargetAmount(Number(e.target.value));
              }}
              className={`rounded-full ${errors["targetAmount"] === true ? "border-[var(--danger)]" : ""} border border-[var(--border-default)] py-2 pl-3 shadow-lg focus:outline-0`}
            />
          </div>

          {/* date container */}
          <div className="flex flex-1 flex-col gap-2">
            {/* deadline / date label */}
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium">Deadline</p>
            </div>

            {/* date popover and label container */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer rounded-full border border-[var(--border-default)] p-2 px-4 shadow-lg">
                  <button className="flex gap-4">
                    <CalendarDays className="cursor-pointer text-[var(--text-secondary)]" />
                    <p className="cursor-pointer">
                      {date ? formatDate(date) : "No Deadline"}
                    </p>
                  </button>
                </div>
              </PopoverTrigger>

              {/* the popover content - calender */}
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* cancel and save button */}
        <div className="mt-1 flex gap-3 border-t border-[var(--border-default)] pt-4.5 pb-1">
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
            onClick={saveGoal}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] py-2.5 text-[var(--text-inverse)] shadow-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGoalForm;
