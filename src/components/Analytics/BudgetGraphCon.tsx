import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getBudget } from "../../types/Budget";

// graph
const BudgetGraph = () => {
  // getting the budget data of current month
  const budget = getBudget(new Date());

  // fetching data for the chart
  const chartData = budget.map((bdgt) => {
    return {
      name: bdgt["category"],
      spent: bdgt["spent"],
      limit: bdgt["limit"],
    };
  });

  return (
    <div
      className={`h-100 w-full -translate-x-3 text-sm md:h-140 md:text-base`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />

          <Bar
            dataKey="spent"
            barSize={45}
            radius={[10, 10, 0, 0]}
            fill="#8470ff"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// graph container
const BudgetGraphCon = () => {
  return (
    <div className="flex flex-[1_1_700px] flex-col gap-4 rounded-4xl border border-[var(--border-default)] p-4">
      {/* title of the graph */}
      <header className="text-xl font-semibold md:text-2xl">
        <h1>Total Budget Overview</h1>
      </header>

      {/* graph for the budget */}
      <BudgetGraph />
    </div>
  );
};

export default BudgetGraphCon;
