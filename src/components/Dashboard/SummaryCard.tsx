import React from "react";
import { useTransaction } from "../../hooks/useTransaction";

type summuryCardData = {
  title: string;
  amount: number;
  percentageChange?: number;
};

const SummaryCard = ({
  title,
  amount,
  percentageChange = 0,
}: summuryCardData) => {
  return (
    <div className="inline-flex w-full flex-col gap-4 rounded-4xl border border-[var(--border-default)] p-2 pb-4 pl-4">
      {/* heading link */}
      <div className="flex justify-between">
        <h3 className="pt-1 text-2xl font-semibold capitalize">{title}</h3>
        <button className="cursor-pointer rounded-full border border-[var(--border-default)] p-2">
          <svg
            className="fill-[var(--text-primary)]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
          </svg>
        </button>
      </div>

      {/* amount message */}
      <div className="flex flex-col gap-6">
        <p className="text-4xl font-bold">
          {amount}
          <span className="text-[var(--text-muted)]">.00</span>
        </p>
        <p className="text-[var(--text-secondary)]">
          <span
            className={`rounded-full px-1.5 ${percentageChange > 0 ? (title === "Expense" ? "bg-[var(--danger-bg)] text-[var(--danger)]" : "bg-[var(--success-bg)] text-[var(--success)]") : title === "Expense" ? "bg-[var(--success-bg)] text-[var(--success)]" : "bg-[var(--danger-bg)] text-[var(--danger)]"} `}
          >
            {percentageChange > 0 ? "↑ " : "↓ "}
            {Math.abs(percentageChange)}%
          </span>
          vs last month
        </p>
      </div>
    </div>
  );
};

const SummaryContainer = () => {
  // getting transaction from the transaction context
  const { CurrentMonthTransactions, SelectedMonthTransactions } =
    useTransaction();

  // getting total income for current month
  const totalIncome = CurrentMonthTransactions.filter((txn) => {
    return txn["type"] === "Income" ? txn : false;
  }).reduce((totalIncome, txn) => {
    return totalIncome + txn["amount"];
  }, 0);

  // getting total expense for current month
  const totalExpense = CurrentMonthTransactions.filter((txn) => {
    return txn["type"] === "Expense" ? txn : false;
  }).reduce((totalExpense, txn) => {
    return totalExpense + txn["amount"];
  }, 0);

  // measureing total balance for current month
  const totalBalance = totalIncome - totalExpense;

  // getting total income for current month
  const prevMonthTotalIncome = SelectedMonthTransactions.filter((txn) => {
    return txn["type"] === "Income" ? txn : false;
  }).reduce((totalIncome, txn) => {
    return totalIncome + txn["amount"];
  }, 0);

  // getting total expense for current month
  const prevMonthTotalExpense = SelectedMonthTransactions.filter((txn) => {
    return txn["type"] === "Expense" ? txn : false;
  }).reduce((totalExpense, txn) => {
    return totalExpense + txn["amount"];
  }, 0);

  // measureing total balance for prev month
  const prevMonthTotalBalance = prevMonthTotalIncome - prevMonthTotalExpense;

  // function to find the status compared with prev month amount
  const percentageChangeFun = (
    currentMonth: number,
    prevMonth: number,
  ): number => {
    const percentage = (currentMonth * 100) / prevMonth - 100;
    return Math.round(percentage * 10) / 10;
  };

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        <SummaryCard
          title="Total Balanace"
          amount={totalBalance}
          percentageChange={percentageChangeFun(
            totalBalance,
            prevMonthTotalBalance,
          )}
        />
        <SummaryCard
          title="Income"
          amount={totalIncome}
          percentageChange={percentageChangeFun(
            totalIncome,
            prevMonthTotalIncome,
          )}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        <SummaryCard
          title="Expense"
          amount={totalExpense}
          percentageChange={percentageChangeFun(
            totalExpense,
            prevMonthTotalExpense,
          )}
        />
        <SummaryCard title="" amount={0} />
      </div>
    </div>
  );
};

export default SummaryContainer;
