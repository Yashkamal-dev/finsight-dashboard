const GoalCard = () => {
  return (
    <div
      className={`relative flex w-80 flex-col gap-6 rounded-4xl border border-[var(--border-default)] px-5 py-4 shadow-lg`}
    >
      {/* header of the card */}
      <header>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          MacBook pro
        </h1>
        <p className={`text-[var(--text-secondary)]`}> Due date - 7 oct 2024</p>
      </header>

      {/* amounts container */}
      <div>
        <span className={`text-4xl font-bold`}>
          ₹412
          <span className={`text-4xl font-bold text-[var(--text-muted)]`}>
            .00
          </span>
        </span>
        <span className={`text-lg text-[var(--accent-text)]`}>/₹1650</span>
      </div>

      {/* progrss bar and Remaining amount */}
      <div className="flex flex-col gap-2">
        {/* progress bar */}
        <div className={`h-7 w-full rounded-full bg-[var(--accent-progress)]`}>
          {/* inner div - based on progress */}
          <div
            className={`flex h-full w-1/3 items-center justify-center rounded-full bg-[var(--accent-primary)] text-sm text-[var(--text-inverse)]`}
          >
            33%
          </div>
        </div>

        {/* remaining amount */}
        <div className="flex justify-between">
          {/* remaining label */}
          <span className="text-[var(--text-muted)]">
            Left to complete the goal
          </span>

          {/* remaining */}
          <span className="font-medium text-[var(--text-primary)]">₹1237</span>
        </div>
      </div>

      {/* contribute btn */}
      <button className="absolute top-2 right-2 cursor-pointer rounded-full border border-[var(--border-default)] px-3 py-1 text-2xl shadow-xl">
        +
      </button>
    </div>
  );
};

export default GoalCard;
