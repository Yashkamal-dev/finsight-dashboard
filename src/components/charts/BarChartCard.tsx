import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTransaction } from "../../hooks/useTransaction";

type mappedObj = {
  type: "Income" | "Expense";
  amount: number;
  date: string;
};

// function to get the month length of month
const getDayInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return new Date(year, month + 1, 0).getDate();
};

// the bar chart of dashbaord
const BarChartCard = () => {
  const { CurrentMonthTransactions } = useTransaction();
  const todaydate = new Date().getDate();

  // initial array with 0 as income eand expenses
  const result = Array.from({ length: 7 }, (_, i) => {
    return { label: String(i + 1), Income: 0, Expense: 0 };
  });

  // filled up reuslt with data based on lcoalstorage
  CurrentMonthTransactions.forEach((txn) => {
    const day = new Date(txn.date).getDate();

    if (day <= todaydate && todaydate - 7 < day) {
      let idx = day - todaydate + 7;
      result[idx - 1]["label"] = new Date(txn.date).toLocaleDateString(
        "en-US",
        {
          weekday: "short",
        },
      );

      if (txn["type"] === "Income") {
        result[idx - 1]["Income"] += txn["amount"];
      } else if (txn["type"] === "Expense") {
        result[idx - 1]["Expense"] += txn["amount"];
      }
    }
  });

  console.log(result);

  return (
    <div className="h-100 w-full rounded-4xl border border-[var(--border-default)]">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-2xl font-semibold">Money Flow</h2>
        <div className="flex gap-2.5">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-full bg-[var(--accent-primary)]"></div>
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-full bg-[var(--accent-primary-hover)]"></div>
            <span>Exxpense</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer height="80%" width="100%">
        <BarChart data={result} barCategoryGap="10%" barGap={5}>
          <XAxis dataKey="label" tickMargin={10} />
          <YAxis />
          <Bar
            barSize={40}
            radius={[10, 10, 0, 0]}
            dataKey="Income"
            fill="#8470ff"
          />
          <Bar
            barSize={40}
            radius={[10, 10, 0, 0]}
            dataKey="Expense"
            fill="#b0a5fc"
          />
          <Tooltip />
          <CartesianGrid vertical={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
