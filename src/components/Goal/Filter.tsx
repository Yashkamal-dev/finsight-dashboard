type props = {
  all: boolean;
  setAll: React.Dispatch<React.SetStateAction<boolean>>;

  inProgress: boolean;
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>;

  completed: boolean;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;

  notStarted: boolean;
  setnotStarted: React.Dispatch<React.SetStateAction<boolean>>;

  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const Filter = ({
  all,
  setAll,

  inProgress,
  setInProgress,

  completed,
  setCompleted,

  notStarted,
  setnotStarted,

  setIsAdding,
}: props) => {
  // if "all" is false and rest are true, that would lead to "all" true
  if (inProgress === true && completed === true && notStarted === true) {
    // using timeout to show that all three option was selected before setting "all" true
    setTimeout(() => {
      setInProgress(false);
      setCompleted(false);
      setnotStarted(false);
      setAll(true);
    }, 200);
  }

  return (
    <div className="flex justify-between">
      {/* buttons for status filtering */}
      <div className="flex gap-2 py-3">
        {/* All button */}
        <button
          onClick={() => {
            setAll(!all);
            setInProgress(false);
            setCompleted(false);
            setnotStarted(false);
          }}
          className={`mx-1 ${all ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "text-[var(--text-primary)]"} cursor-pointer rounded-full border border-[var(--border-default)] px-5 py-2 shadow-lg transition-all duration-100 ease-in active:scale-99`}
        >
          All
        </button>

        {/* in progress button */}
        <button
          onClick={() => {
            setAll(false);
            setInProgress(!inProgress);
          }}
          className={` ${inProgress ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "text-[var(--text-primary)]"} cursor-pointer rounded-full border border-[var(--border-default)] px-5 py-2 shadow-lg transition-all duration-100 ease-in active:scale-99`}
        >
          In progress
        </button>

        {/* completed button */}
        <button
          onClick={() => {
            setAll(false);
            setCompleted(!completed);
          }}
          className={` ${completed ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "text-[var(--text-primary)]"} cursor-pointer rounded-full border border-[var(--border-default)] px-5 py-2 shadow-lg transition-all duration-100 ease-in active:scale-99`}
        >
          Completed
        </button>

        {/* not started button */}
        <button
          onClick={() => {
            setAll(false);
            setnotStarted(!notStarted);
          }}
          className={` ${notStarted ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "text-[var(--text-primary)]"} cursor-pointer rounded-full border border-[var(--border-default)] px-5 py-2 shadow-lg transition-all duration-100 ease-in active:scale-99`}
        >
          Not Started
        </button>
      </div>

      {/* add goal btn container */}
      <div>
        {/* add goal button */}
        <button
          onClick={() => {
            setIsAdding(true);
          }}
          className="cursor-pointer rounded-full bg-[var(--accent-primary)] px-5 py-2 text-[var(--text-inverse)] shadow-lg active:scale-99"
        >
          + Add new goal
        </button>
      </div>
    </div>
  );
};

export default Filter;
