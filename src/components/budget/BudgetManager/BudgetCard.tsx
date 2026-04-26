import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { CustomTooltip } from "../../ToolTip/CustomTooltip";
import { useEffect, useRef, useState } from "react";
import { Ellipsis, X } from "lucide-react";
import EditBudget from "../Edit budget/EditBudget";
import type { budgetType } from "../../../types/Budget";

type props = {
  category: string;
  status: number;
  spent: number;
  limit: number;
  bdgt: budgetType;
  setbdgtToEdit: React.Dispatch<React.SetStateAction<budgetType | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const BudgetCard = ({
  category,
  status,
  spent,
  limit,
  bdgt,
  setbdgtToEdit,
  setIsEditing,
}: props) => {
  // specifing the value for the pie chart
  const safeSpent = Math.min(limit, spent);

  // data object to generate pie chart
  const data = [
    { name: "spent", value: safeSpent },
    { name: "remaining", value: limit - safeSpent },
  ];

  // state to open option
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);

  // ref of the budget container
  const budgetCard = useRef<HTMLDivElement | null>(null);

  // effect to close the options component
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // if clicked outside the budget card, closing the option
      if (
        budgetCard.current &&
        !budgetCard.current.contains(e.target as Node)
      ) {
        // closing the contribution
        setIsOptionOpen(false);
      }
    };

    // attaching event listener
    if (isOptionOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // detaching event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionOpen]);

  return (
    <div
      ref={budgetCard}
      className={`relative ${
        status < 70
          ? "border-[var(--border-default)]"
          : status < 100
            ? "border-[var(--warning-bg-secondary)]"
            : status === 100
              ? "border-[var(--warning)] bg-[var(--danger-bg-secondary)]"
              : "border-[var(--danger)] bg-[var(--danger-bg)]"
      } rounded-4xl border p-4`}
    >
      {/* name container */}
      <div className="">
        {/* budget title */}
        <h2 className={`text-2xl font-semibold capitalize`}>{category}</h2>
      </div>

      {/* summary */}
      <div className={`flex items-center gap-3`}>
        {/* graph */}
        <div className={`relative`}>
          <PieChart height={160} width={160}>
            {/* progress ring */}
            <Pie
              data={data}
              dataKey={"value"}
              cx="50%"
              cy="50%"
              innerRadius={63}
              outerRadius={75}
              startAngle={90}
              endAngle={-270}
              cornerRadius={10}
            >
              {/* filling up sells with their color */}
              <Cell fill="#8470ff" />
              <Cell fill="#EFECFF" />
              <Tooltip
                cursor={false}
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 1000 }}
              />
            </Pie>
          </PieChart>

          {/* information inside the chart */}
          <div
            className={`absolute top-1/2 left-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5`}
          >
            {/* percentage difference */}
            <span className="text-sm text-[var(--text-muted)]">
              {Number.isInteger(status)
                ? status
                : Math.round(status * 100) / 100}
              % spent
            </span>
            {/* amount spent */}
            <span className={`text-2xl font-bold`}>₹{spent}</span>
          </div>
        </div>

        {/* information */}
        <div className={`gap flex flex-col gap-0.5`}>
          {/* span for "left" word */}
          <span className={`text-[var(--text-secondary)]`}>Left</span>

          {/* amount Container */}
          <div className={`flex items-end`}>
            <span className={`text-4xl font-bold`}>
              {limit - spent}
              <span className={`text-4xl font-bold text-[var(--text-muted)]`}>
                .00
              </span>
            </span>
            <span className={`font-medium text-[var(--accent-text)]`}>
              /{limit}
            </span>
          </div>

          {/* status */}
          <span
            className={`mt-3 ${
              status < 70
                ? "bg-[var(--success-bg)] text-[var(--success)]"
                : status < 100
                  ? "bg-[var(--warning-bg)] text-[var(--warning)]"
                  : status === 100
                    ? "bg-[var(--warning-bg)] text-[var(--warning)]"
                    : "bg-[var(--danger-bg)] text-[var(--danger)]"
            } w-max rounded-full px-2 text-sm`}
          >
            {status < 70
              ? "On Track"
              : status < 100
                ? "Approaching Limit"
                : status === 100
                  ? "At limit"
                  : "Over budget"}
          </span>
        </div>
      </div>

      {/* edit button */}
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
            {/* Edit button */}
            <button
              onClick={() => {
                setbdgtToEdit(bdgt);
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
    </div>
  );
};

export default BudgetCard;
