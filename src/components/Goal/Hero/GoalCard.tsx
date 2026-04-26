import { useEffect, useRef, useState } from "react";
import type { goal } from "../../../types/goals";
import { formatDate } from "../../../utils/goalUtil";
import Contribution from "./Contribution";
import { Ellipsis, X } from "lucide-react";

type props = {
  goal: goal;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setGoalToEdit: React.Dispatch<React.SetStateAction<goal | null>>;
};

const GoalCard = ({ goal, setGoalToEdit, setIsEditing }: props) => {
  // the remaining amount for the goal to be completed
  const remaining = goal["targetAmount"] - goal["savedAmount"];

  // state to open option
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);

  // getting the ratio between the savedAmount targetAmount
  let pregress = Math.floor((goal["savedAmount"] / goal["targetAmount"]) * 100);
  pregress = Math.min(pregress, 100);

  // state to define if contributing or not
  const [isContributing, setIsContributing] = useState<Boolean>(false);

  // ref to close the contribution on click outside and Escape key
  const containerRef = useRef<HTMLDivElement>(null);

  // effect to close the countribution component
  useEffect(() => {
    // funtion to close when clicked outside goal
    const handleClickOutside = (e: MouseEvent) => {
      // if clicked outside the goal card, closing the contibution
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        // closing the contribution
        setIsContributing(false);
      }
    };

    // function to close when click escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsContributing(false);
      }
    };

    // attaching event listeners
    if (isContributing) {
      // attaching event to close on outside click
      document.addEventListener("mousedown", handleClickOutside);

      // attaching event to close on escape click
      document.addEventListener("keydown", handleKeyDown);
    }

    // detaching event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isContributing]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col gap-6 rounded-4xl border border-[var(--border-default)] px-5 py-4 shadow-lg`}
    >
      {/* header of the card */}
      <header>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          {goal["title"]}
        </h1>
        <p className={`text-[var(--text-secondary)]`}>
          {" "}
          Due date -{" "}
          {goal["deadline"] ? formatDate(goal["deadline"]) : "No Deadline"}
        </p>
      </header>

      {/* amounts container */}
      <div>
        <span className={`text-4xl font-bold`}>
          ₹{goal["savedAmount"].toLocaleString("en-IN")}
          <span className={`text-4xl font-bold text-[var(--text-muted)]`}>
            .00
          </span>
        </span>
        <span
          className={`text-lg ${goal["status"] === "completed" ? "text-[var(--success)]" : goal["status"] === "not-started" ? "text-[var(--text-primary)]" : ""} text-[var(--accent-text)]`}
        >
          /₹{goal["targetAmount"].toLocaleString("en-IN")}
        </span>
      </div>

      {/* progrss bar and Remaining amount */}
      <div className="flex flex-col gap-2">
        {/* progress bar */}
        <div
          className={`h-7 w-full ${goal["status"] === "not-started" ? "bg-[var(--warning-bg)]" : "bg-[var(--accent-progress)]"} rounded-full`}
        >
          {/* inner div - based on progress */}
          <div
            style={{ width: `${pregress}%` }}
            className={`flex ${goal["status"] === "completed" ? "bg-[var(--success)]" : "bg-[var(--accent-primary)]"} h-full items-center justify-center rounded-full text-sm text-[var(--text-inverse)]`}
          >
            {/* showing status only if it is greater than 0 - in progress or completed */}
            {pregress > 0 && pregress + "%"}
          </div>
        </div>

        {/* remaining amount */}
        <div className="flex justify-between">
          {/* remaining label */}
          <span className="text-[var(--text-muted)]">
            Left to complete the goal
          </span>

          {/* remaining */}
          <span className="font-medium text-[var(--text-primary)]">
            ₹{remaining.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* conditional rendering the contribution component based on if contributing or not */}
      {/* parent div for the animation */}
      <div
        ref={containerRef}
        className={`overflow-hidden ${isContributing ? "max-h-100 opacity-100" : "max-h-0 opacity-0"} transition-all duration-400 ease-in-out`}
      >
        {isContributing && (
          <Contribution
            setIsContributing={setIsContributing}
            status={goal["status"]}
            remaining={remaining}
            goal={goal}
          />
        )}
      </div>

      {/* options dropdown */}
      <div className="absolute top-1 right-1">
        <button
          onClick={() => {
            setIsOptionOpen(!isOptionOpen);
          }}
          className="flex cursor-pointer items-center justify-center rounded-full border border-[var(--border-default)] p-2.5 font-extrabold shadow-lg"
        >
          {isOptionOpen === true ? <X /> : <Ellipsis />}
        </button>

        {/* conditional rendering using id to prevent global state effect */}
        {isOptionOpen === true && (
          // options dropdown
          <div className="-bottom absolute right-0 z-10 mt-1 flex w-35 flex-col gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-1 shadow-lg">
            {/* contribute button */}
            <button
              onClick={() => {
                setIsContributing(true);
                setIsOptionOpen(false);
              }}
              className="cursor-pointer rounded-full py-0.5 transition-all duration-150 ease-in-out hover:bg-[var(--accent-soft)] hover:text-[var(--text-inverse)]"
            >
              Contribute
            </button>

            {/* Edit button */}
            <button
              onClick={() => {
                setGoalToEdit(goal);
                setIsEditing(true);
                setIsOptionOpen(false);
              }}
              className="cursor-pointer rounded-full py-0.5 transition-all duration-150 ease-in-out hover:bg-[var(--accent-soft)] hover:text-[var(--text-inverse)]"
            >
              Edit
            </button>

            {/* Delete button */}
            <button
              onClick={() => {
                setIsOptionOpen(false);
              }}
              className="cursor-pointer rounded-full bg-[var(--danger-bg)] py-0.5 text-[var(--danger)] transition-all duration-150 ease-in-out hover:bg-[var(--danger)] hover:text-[var(--danger-bg)]"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* label - type indicator */}
      <div
        className={`absolute top-0 left-1/2 h-1 w-1/4 -translate-x-1/2 rounded-full ${
          goal["status"] === "in-progress"
            ? "bg-[var(--accent-primary)]"
            : goal["status"] === "completed"
              ? "bg-[var(--success)]"
              : "bg-[var(--warning)]"
        } `}
      ></div>
    </div>
  );
};

export default GoalCard;
