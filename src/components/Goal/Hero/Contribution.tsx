import { useEffect, useRef, useState } from "react";

type props = {
  setIsContributing: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Contribution = ({ setIsContributing }: props) => {
  // state amount to contribute
  const [contributionAmount, setContributionAmount] = useState<number>();

  // ref to auto focus
  const inputRef = useRef<HTMLInputElement>(null);

  // effect for the auto focusing the contribution input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-4 border-t border-t-[var(--border-subtle)] pt-2">
      {/* limit container */}
      <div className="flex flex-col gap-2">
        {/* limit label */}
        <div className="flex gap-2">
          {/* label */}
          <p className="text-lg font-medium">Contribution Amount</p>
        </div>

        {/* limit input */}
        <input
          ref={inputRef}
          value={contributionAmount}
          onChange={(e) => {
            setContributionAmount(Number(e.target.value));
          }}
          type="number"
          className={`rounded-full border border-[var(--border-default)] py-2 pl-3 shadow-lg focus:outline-0`}
        />
      </div>

      {/* cancel and save button */}
      <div className="flex gap-3 border-t border-[var(--border-default)] pt-4.5 pb-1">
        {/* cancel button */}
        <button
          onClick={() => {
            setIsContributing(false);
          }}
          className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-2.5 text-[var(--text-primary)] shadow-xl"
        >
          Cancel
        </button>

        {/* save button */}
        <button className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] py-2.5 text-[var(--text-inverse)] shadow-xl">
          Contribute
        </button>
      </div>
    </div>
  );
};

export default Contribution;
