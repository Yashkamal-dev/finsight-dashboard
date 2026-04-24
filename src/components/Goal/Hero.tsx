import type { goal } from "../../types/goals";
import { getGoals } from "../../utils/goalUtil";
import GoalCard from "./Hero/GoalCard";

type props = {
  all: boolean;
  inProgress: boolean;
  completed: boolean;
  notStarted: boolean;
};

const Hero = ({ all, inProgress, completed, notStarted }: props) => {
  const goals: goal[] = getGoals();

  // goals that are in progress
  const goalsInProgress = goals.filter((goal: goal) => {
    return goal["status"] === "in-progress";
  });

  // goals that are in completed
  const goalsCompleted = goals.filter((goal: goal) => {
    return goal["status"] === "completed";
  });

  // goals that are in not selected
  const goalsNotStarted = goals.filter((goal: goal) => {
    return goal["status"] === "not-started";
  });

  return (
    <div>
      {/* conditional rendering goals that are in progress */}
      {(all || inProgress) && (
        <div className="my-2">
          {/* header of the goals in progress */}
          <header className="flex justify-between border-b border-b-[var(--border-default)] py-3">
            <h1 className="text-lg text-[var(--text-secondary)]">
              In progress
            </h1>
            <span className="text-lg text-[var(--text-secondary)]">
              {goalsInProgress.length} Goals{" "}
            </span>
          </header>

          {/* conatainer that holds goals card */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-7 py-7">
            {goalsInProgress.map((goal) => {
              return <GoalCard key={crypto.randomUUID()} goal={goal} />;
            })}
          </div>
        </div>
      )}

      {/* conditional rendering goals that are completed */}
      {(all || completed) && (
        <div className="my-2">
          {/* header of the goals completed */}
          <header className="flex justify-between border-b border-b-[var(--border-default)] py-3">
            <h1 className="text-lg text-[var(--text-secondary)]">Completed</h1>
            <span className="text-lg text-[var(--text-secondary)]">
              {goalsInProgress.length} Goals{" "}
            </span>
          </header>

          {/* conatainer that holds goals card */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-7 py-7">
            {goalsCompleted.map((goal) => {
              return <GoalCard key={crypto.randomUUID()} goal={goal} />;
            })}
          </div>
        </div>
      )}

      {/* conditional rendering goals that are not started */}
      {(all || notStarted) && (
        <div className="my-2">
          {/* header of the goals not started */}
          <header className="flex justify-between border-b border-b-[var(--border-default)] py-3">
            <h1 className="text-lg text-[var(--text-secondary)]">
              Not started
            </h1>
            <span className="text-lg text-[var(--text-secondary)]">
              {goalsInProgress.length} Goals{" "}
            </span>
          </header>

          {/* conatainer that holds goals card */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-7 py-7">
            {goalsNotStarted.map((goal) => {
              return <GoalCard key={crypto.randomUUID()} goal={goal} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
