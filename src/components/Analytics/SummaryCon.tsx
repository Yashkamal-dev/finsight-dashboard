import { useTransaction } from "../../hooks/useTransaction";
import { Link } from "react-router-dom";

type summuryCardData = {
  title: string;
  amount: number;
  percentageChange?: number;
  totalTransaction: number;
};

const SummaryCard = ({
  title,
  amount,
  percentageChange = 0,
  totalTransaction,
}: summuryCardData) => {
  return (
    <div className="inline-flex min-w-65 grow flex-col gap-3 rounded-4xl border border-[var(--border-default)] p-2 pb-4 pl-4 md:gap-4">
      {/* heading link */}
      <div className="flex justify-between">
        <h3 className="pt-1 text-xl font-semibold capitalize md:text-2xl">
          {title}
        </h3>
        <Link
          to={"/transactions"}
          className="cursor-pointer rounded-full border border-[var(--border-default)] p-1 md:p-2"
        >
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
        </Link>
      </div>

      {/* amount message */}
      <div className="flex flex-col gap-4 md:gap-6">
        <p className="text-[28px] font-bold md:text-4xl">
          {amount.toLocaleString("en-IN")}
          <span className="text-[var(--text-muted)]">.00</span>
        </p>

        {/* percentage and no of transction */}
        <div className="flex flex-wrap items-center text-[var(--text-secondary)]">
          {/* percentage con */}
          <div className="grow text-sm md:text-base">
            <span
              className={`rounded-full px-1.5 ${percentageChange > 0 ? (title === "Expense" ? "bg-[var(--danger-bg)] text-[var(--danger)]" : "bg-[var(--success-bg)] text-[var(--success)]") : title === "Expense" ? "bg-[var(--success-bg)] text-[var(--success)]" : "bg-[var(--danger-bg)] text-[var(--danger)]"} `}
            >
              {percentageChange > 0 ? "↑ " : "↓ "}
              {Math.abs(percentageChange)}%
            </span>{" "}
            vs last month
          </div>

          {/* no of transasction container */}
          <div className="flex grow items-center justify-center gap-2 text-sm md:text-base">
            <svg
              className="h-7 rounded-full bg-[var(--accent-soft)] fill-[var(--accent-text)] p-1 md:h-8"
              xmlns="http://www.w3.org/2000/svg"
              //   height="24px"
              viewBox="0 -960 960 960"
              //   width="24px"
              fill="#e3e3e3"
            >
              <path d="m360-240 56-56-62-64h166v-80H354l62-64-56-56-160 160 160 160Zm240-160 160-160-160-160-56 56 62 64H440v80h166l-62 64 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>

            <span>{totalTransaction} transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCon = () => {
  // getting transaction from the transaction context
  const { CurrentMonthTransactions, SelectedMonthTransactions } =
    useTransaction();

  // getting total income for current month
  const totalIncome = CurrentMonthTransactions.filter((txn) => {
    return txn["type"] === "Income" ? txn : false;
  }).reduce((totalIncome, txn) => {
    return totalIncome + txn["amount"];
  }, 0);

  // no of income transaction
  const incomeTxnCount = CurrentMonthTransactions.filter((txn) => {
    return txn["type"] === "Income" ? txn : false;
  }).reduce((noOfIncome) => {
    return noOfIncome + 1;
  }, 0);

  // getting total expense for current month
  const totalExpense = CurrentMonthTransactions.filter((txn) => {
    return txn["type"] === "Expense" ? txn : false;
  }).reduce((totalExpense, txn) => {
    return totalExpense + txn["amount"];
  }, 0);

  // no of expense transaction
  const expenseTxnCount = CurrentMonthTransactions.filter((txn) => {
    return txn["type"] === "Expense" ? txn : false;
  }).reduce((noOfExpense) => {
    return noOfExpense + 1;
  }, 0);

  // getting total savings based on the goal transaction of the current month
  const totalSavings = CurrentMonthTransactions.filter((txn) => {
    return txn["type"] === "Goal";
  }).reduce((acc, txn) => {
    return acc + txn["amount"];
  }, 0);

  // no of total transaction
  const allTxnCount = CurrentMonthTransactions.reduce((noOfexpense) => {
    return noOfexpense + 1;
  }, 0);

  // measureing total balance for current month
  const totalBalance = totalIncome - totalExpense - totalSavings;

  // getting total income for prev month
  const prevMonthTotalIncome = SelectedMonthTransactions.filter((txn) => {
    return txn["type"] === "Income" ? txn : false;
  }).reduce((totalIncome, txn) => {
    return totalIncome + txn["amount"];
  }, 0);

  // getting total expense for prev month
  const prevMonthTotalExpense = SelectedMonthTransactions.filter((txn) => {
    return txn["type"] === "Expense" ? txn : false;
  }).reduce((totalExpense, txn) => {
    return totalExpense + txn["amount"];
  }, 0);

  // getting total savings based on the goal transaction of the current month
  const prevMonthotalSavings = SelectedMonthTransactions.filter((txn) => {
    return txn["type"] === "Goal";
  }).reduce((acc, txn) => {
    return acc + txn["amount"];
  }, 0);

  // measureing total balance for prev month
  const prevMonthTotalBalance =
    prevMonthTotalIncome - prevMonthTotalExpense - prevMonthotalSavings;

  // function to find the status compared with prev month amount
  const percentageChangeFun = (
    currentMonth: number,
    prevMonth: number,
  ): number => {
    // calculating perccentage
    const percentage = (currentMonth * 100) / prevMonth - 100;

    // condition if the prev month has got 0 amount
    if (prevMonth === 0) {
      return 0;
    }

    return Math.round(percentage * 10) / 10;
  };

  return (
    <div className="flex w-full flex-wrap gap-3 md:gap-4 py-2">
      {/* card for the total balance */}
      <SummaryCard
        title="Total Balanace"
        amount={totalBalance}
        totalTransaction={allTxnCount}
        percentageChange={percentageChangeFun(
          totalBalance,
          prevMonthTotalBalance,
        )}
      />

      {/* card for the income */}
      <SummaryCard
        title="Income"
        amount={totalIncome}
        totalTransaction={incomeTxnCount}
        percentageChange={percentageChangeFun(
          totalIncome,
          prevMonthTotalIncome,
        )}
      />

      {/* card for the expense */}
      <SummaryCard
        title="Expense"
        amount={totalExpense}
        totalTransaction={expenseTxnCount}
        percentageChange={percentageChangeFun(
          totalExpense,
          prevMonthTotalExpense,
        )}
      />
    </div>
  );
};

export default SummaryCon;
