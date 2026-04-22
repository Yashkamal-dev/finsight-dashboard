import { Cell, Pie, PieChart } from "recharts";
import type { budgetType } from "../../../types/Budget";

type props = {
  category: string;
  status: number;
  spent: number;
  limit: number;
};

const BudgetCard = ({ category, status, spent, limit }: props) => {
  // specifing the value for the pie chart
  const safeSpent = Math.min(limit, spent);

  // data object to generate pie chart
  const data = [
    { name: "spent", value: safeSpent },
    { name: "remaining", value: limit - safeSpent },
  ];

  return (
    <div
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
        <h2 className={`text-2xl font-semibold`}>{category}</h2>
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
      <button
        className={`absolute top-1 right-1 cursor-pointer rounded-full border border-[var(--border-default)] p-2.5`}
      >
        <svg
          className={`fill-[var(--text-secondary)]`}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
        </svg>
      </button>
    </div>
  );
};

export default BudgetCard;
