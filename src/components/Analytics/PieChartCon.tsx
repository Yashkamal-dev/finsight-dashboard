import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getData, monthStringGen } from "../../utils/transactionContextUtils";
import type { transactionInterface } from "../../types/transaction";

const TransactionPieChart = () => {
  const trnasactions = getData(monthStringGen(new Date()));

  // getting total income for current month
  const totalIncome = trnasactions
    .filter((txn: transactionInterface) => {
      return txn["type"] === "Income" ? txn : false;
    })
    .reduce((totalIncome: number, txn: transactionInterface) => {
      return totalIncome + txn["amount"];
    }, 0);

  // getting total expense for current month
  const totalExpense = trnasactions
    .filter((txn: transactionInterface) => {
      return txn["type"] === "Expense" ? txn : false;
    })
    .reduce((totalExpense: number, txn: transactionInterface) => {
      return totalExpense + txn["amount"];
    }, 0);

  // getting total savings based on the goal transaction of the current month
  const totalSavings = trnasactions
    .filter((txn: transactionInterface) => {
      return txn["type"] === "Goal";
    })
    .reduce((acc: number, txn: transactionInterface) => {
      return acc + txn["amount"];
    }, 0);

  const remaining = totalIncome - (totalExpense + totalSavings);

  const graphData = [
    { name: "Expense", value: totalExpense },
    { name: "Savings", value: totalSavings },
    { name: "Remaining", value: remaining > 0 ? remaining : 0 },
  ];

  return (
    <div className="relative flex h-80 w-full items-center justify-center">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            data={graphData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={110}
            outerRadius={127}
            startAngle={90}
            endAngle={-270}
            cornerRadius={10}
          >
            {/* filling up sells with their color */}
            <Cell fill="var(--accent-primary)" />
            <Cell fill="var(--accent-soft)" />
            <Cell fill="#b0a5fc" />
            <Tooltip />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute flex flex-col items-center justify-center gap-1">
        <p className="text-[var(--text-secondary)]">This Month expense</p>
        <p className="text-3xl font-bold">₹ {totalExpense} </p>
      </div>
    </div>
  );
};

const PieChartCon = () => {
  return (
    <div className="flex flex-[1_1_450px] flex-col gap-2 rounded-4xl border border-[var(--border-default)] p-4">
      {/* header of the chart container */}
      <header>
        <h1 className="text-xl font-semibold md:text-2xl">Statistics</h1>
      </header>

      {/* mounting graph container */}
      <TransactionPieChart />

      {/* color and type indicator */}
      <div className="flex justify-evenly">
        <div className="flex items-center gap-1 text-lg">
          <div className="h-3 w-3 rounded-full bg-[var(--accent-primary)] text-xl"></div>{" "}
          Remaining
        </div>
        <div className="flex items-center gap-1 text-lg">
          <div className="h-3 w-3 rounded-full bg-[var(--accent-soft)] text-xl"></div>{" "}
          Expense
        </div>
        <div className="flex items-center gap-1 text-lg">
          <div className="h-3 w-3 rounded-full bg-[#b0a5fc] text-xl"></div>{" "}
          Savings
        </div>
      </div>
    </div>
  );
};

export default PieChartCon;
