import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { addGoal, formatDate } from "../../../utils/goalUtil";
import type { goal } from "../../../types/goals";

type props = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddGoalForm = ({ setIsAdding }: props) => {
  // state for the title of the goal
  const [title, setTitle] = useState<string>();

  // state for the target amount
  const [targetAmount, setTargetAmount] = useState<number>();

  // state for the Date
  const [date, setDate] = useState<Date>();

  // function to handle default behaviour
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // errors to validate fields
  const [errors, setErrors] = useState({
    title: false,
    targetAmount: false,
  });

  // function to validate goal
  const validateGoal = () => {
    const newErrors = { title: false, targetAmount: false };

    // validating title
    if (!title || title.trim() === "") {
      newErrors["title"] = true;
    }

    // validating target amount
    if (!targetAmount || targetAmount <= 0) {
      newErrors["targetAmount"] = true;
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
      id: crypto.randomUUID(),
      title: title,
      targetAmount: targetAmount,
      savedAmount: 0,
      deadline: date,
      status: "not-started",
      createdAt: new Date(),
    };

    // storing goal into localstorage
    addGoal(newGoal);

    // closing the adding modal / component
    setIsAdding(false);
  };

  return (
    <div className="relative flex w-95 flex-col gap-5 rounded-3xl bg-[var(--bg-primary)] px-5 py-4 shadow-xl md:w-125">
      {/* form heading */}
      <div className="flex flex-col items-center justify-center gap-1">
        {/* title */}
        <h1 className="text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
          Add New Goal
        </h1>
        {/* subttle */}
        <h2 className="text-sm text-[var(--text-secondary)] md:text-base">
          Set a target and start working toward it.
        </h2>
      </div>

      {/* form */}
      <form
        action="\"
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col gap-3 md:gap-5"
      >
        {/* name container */}
        <div className="flex grow flex-col gap-2">
          {/* name label */}
          <div className="flex items-center gap-2">
            <p className="font-medium md:text-lg">Title</p>
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
            className={`grow rounded-full ${errors["title"] === true ? "border-[var(--danger)]" : ""} border border-[var(--border-default)] py-2 pl-5 text-sm shadow-lg focus:outline-0 md:text-lg`}
          />
        </div>

        {/* target amount & deadline container */}
        <div className="flex gap-3">
          {/* amount */}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* amount label */}
            <div className="flex items-center gap-2">
              <p className="font-medium md:text-lg">Amount</p>
              {errors["targetAmount"] && (
                // text to show on error - (if empty)
                <span className="text-lg text-[var(--danger)]">
                  {targetAmount == undefined ? "*" : "Invalid"}
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
                  return { ...prev, targetAmount: false };
                });
                return setTargetAmount(Number(e.target.value));
              }}
              className={`rounded-full ${errors["targetAmount"] === true ? "border-[var(--danger)]" : ""} border border-[var(--border-default)] py-2 pl-3 text-sm shadow-lg focus:outline-0 md:text-lg`}
            />
          </div>

          {/* date container */}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* deadline / date label */}
            <div className="flex items-center gap-2">
              <p className="font-medium md:text-lg">Deadline</p>
            </div>

            {/* date popover and label container */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer rounded-full border border-[var(--border-default)] p-2 px-4 shadow-lg">
                  <button className="flex items-center gap-4">
                    <CalendarDays className="cursor-pointer text-[var(--text-secondary)]" />
                    <p className="cursor-pointer text-sm md:text-lg">
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
        <div className="mt-1 flex gap-3 border-t border-[var(--border-default)] pt-4.5 pb-1 text-sm md:text-base">
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

export default AddGoalForm;
