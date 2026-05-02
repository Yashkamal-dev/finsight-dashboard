import { useEffect, useRef, useState } from "react";
import { addContributionToGoal } from "../../../utils/goalUtil";
import type { goal } from "../../../types/goals";
import { useTransaction } from "../../../hooks/useTransaction";
import { useGoals } from "../../../hooks/useGoals";

type props = {
  setIsContributing: React.Dispatch<React.SetStateAction<Boolean>>;
  status: string;
  remaining: number;
  goal: goal;
};

const Contribution = ({
  setIsContributing,
  status,
  remaining,
  goal,
}: props) => {
  // getting addtransaction here to pass it to the add contribution function, since custom hooks are not allowed in normal functions
  const { addTransaction } = useTransaction();

  // getting setGoals from the context useGoals custom hook to pass it in the add contribution function.
  const { setGoals } = useGoals();

  // state amount to contribute
  const [contributionAmount, setContributionAmount] = useState<number>();

  // ref to auto focus
  const inputRef = useRef<HTMLInputElement>(null);

  // error state to determine if any value is pending
  const [errors, setErrors] = useState({ contributionAmount: false });

  // effect for the auto focusing the contribution input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //   function to validate field
  const validateContribution = () => {
    const newError = { contributionAmount: false };

    // validating contribution amount
    if (
      !contributionAmount ||
      contributionAmount <= 0 ||
      contributionAmount > remaining
    ) {
      newError["contributionAmount"] = true;
    }

    setErrors(newError);

    return newError;
  };

  // funtion to add contribution
  const handleAddContribution = () => {
    const newErrors = validateContribution();

    // returning even if one error is true
    if (Object.values(newErrors).some(Boolean)) return;

    // adding countribution to the localstorage and making a transaction
    addContributionToGoal(
      goal["id"],
      contributionAmount!,
      goal["title"],
      addTransaction,
      setGoals,
    );

    setIsContributing(false);
  };

  return (
    <div className="flex flex-col gap-4 border-t border-t-[var(--border-subtle)] pt-2">
      {/* contribution amount container */}
      <div className="flex flex-col gap-2">
        {/* contribution amount label */}
        <div className="flex gap-2">
          {/* label */}
          <p className="text-base font-medium md:text-lg">
            Contribution Amount
          </p>
          {errors["contributionAmount"] && (
            // text to show on error - (if empty)
            <span className="text-lg text-[var(--danger)]">
              {contributionAmount === undefined
                ? "Amount is required"
                : contributionAmount <= 0
                  ? "Enter an amount greater than ₹0"
                  : contributionAmount > remaining
                    ? "Amount exceeds remaining goal"
                    : ""}
            </span>
          )}
        </div>

        {/* contribution amount input */}
        <input
          ref={inputRef}
          value={contributionAmount}
          onChange={(e) => {
            setErrors((prev) => {
              return { ...prev, contributionAmount: false };
            });
            setContributionAmount(Number(e.target.value));
          }}
          placeholder="e.g. 1,000"
          type="number"
          className={`rounded-full text-sm md:text-base ${errors["contributionAmount"] == true ? "border-[var(--danger)]" : ""} border border-[var(--border-default)] py-2 pl-3 shadow-lg focus:outline-0`}
        />
      </div>

      {/* cancel and save button */}
      <div className="flex gap-3 border-t border-[var(--border-default)] pt-4.5 pb-1">
        {/* cancel button */}
        <button
          onClick={() => {
            setIsContributing(false);
          }}
          className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-2 text-sm text-[var(--text-primary)] shadow-xl md:py-2.5 md:text-base"
        >
          Cancel
        </button>

        {/* save button */}
        <button
          onClick={handleAddContribution}
          className={`grow cursor-pointer rounded-full border border-[var(--border-default)] py-2 text-sm text-[var(--text-inverse)] md:py-2.5 md:text-base ${status === "not-started" ? "bg-[var(--warning-bg-secondary)]" : "bg-[var(--accent-primary)]"} shadow-xl`}
        >
          Contribute
        </button>
      </div>
    </div>
  );
};

export default Contribution;
