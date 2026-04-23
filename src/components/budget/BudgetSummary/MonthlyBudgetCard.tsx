import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { budgetType } from "../../../types/Budget";
import { CustomTooltip } from "../../ToolTip/CustomTooltip";

type props = {
  allBudget: budgetType[];
};

const MonthlyBudgetCard = ({ allBudget }: props) => {
  // getting total spent amount
  const spent = allBudget.reduce((acc, curr) => {
    return acc + curr["spent"]!;
  }, 0);

  // getting total limit tp get remaining
  const totalLimit = allBudget.reduce((acc, curr) => {
    return acc + curr["limit"]!;
  }, 0);

  // calculating status percentage
  const status = (spent / totalLimit) * 100;

  // data for the graph
  const data = [
    { name: "Spent", value: spent },
    { name: "Remaining", value: totalLimit - spent },
  ];

  return (
    <div className="flex flex-col gap-5 rounded-4xl border border-[var(--border-default)] p-5">
      {/* title */}
      <h1 className="text-2xl font-bold">Monthly budget</h1>

      {/* amount and status container */}
      <div className="flex flex-col gap-2">
        <span className={`text-4xl font-bold`}>
          ₹{totalLimit}
          <span className={`text-4xl font-bold text-[var(--text-muted)]`}>
            .00
          </span>
        </span>
        <span
          className={` ${
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

      {/* chart container */}
      <div className="relative h-37 w-full">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={"value"}
              cx="50%"
              cy="100%"
              innerRadius={120}
              outerRadius={140}
              startAngle={180}
              endAngle={0}
              cornerRadius={10}
            >
              {/* filling up sells with their color */}
              <Cell fill="#8470ff" />
              <Cell fill="#EFECFF" />
            </Pie>
            <Tooltip
              cursor={false}
              content={<CustomTooltip />}
              wrapperStyle={{ zIndex: 1000 }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* spent and status percentage container */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center">
          <span className="text-[var(--text-muted)]">
            {Number.isInteger(status) ? status : Math.round(status * 100) / 100}
            % spent
          </span>
          <span className="text-4xl font-bold">₹{spent}</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBudgetCard;
