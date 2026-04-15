import { useTransaction } from "../../../hooks/useTransaction";
import { sortTransactions } from "../../../utils/sortTransactionUtil";

const RecentTransaction = () => {
  // getting data from transaction context
  const { CurrentMonthTransactions } = useTransaction();

  // const recentTransactions = sortTransactions(CurrentMonthTransactions);
  const recentTransactions = sortTransactions(CurrentMonthTransactions).slice(
    0,
    3,
  );

  return (
    // transaction container components
    <div className="flex flex-col gap-4 rounded-3xl border border-[var(--border-default)] p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Recent Transactions
        </h1>
        <div>
          <button className="cursor-pointer rounded-full border border-[var(--border-default)] px-3">
            see all ›
          </button>
        </div>
      </div>

      {/* table */}
      <table className="w-full border-spacing-y-3">
        {/* table heading row */}
        <thead>
          <tr className="rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
            <th className="rounded-l-full px-2.5 py-2 text-left font-bold">
              Date
            </th>
            <th className="text-left font-bold">Amount</th>
            <th className="text-left font-bold">Payment Name</th>
            <th className="text-left font-bold">Method</th>
            <th className="rounded-r-full text-left font-bold">Category</th>
          </tr>
        </thead>

        {/* table data section */}
        <tbody>
          {recentTransactions.map((txn) => {
            return (
              // table row for each trasnaction in the recentTransactions
              <tr
                className={`${txn["type"] === "Income" ? "bg-[var(--success-bg)]" : "bg-[var(--danger-bg)]"}`}
              >
                {/* date */}
                <td
                  className={`rounded-l-full border-b border-[var(--border-default)] px-2 py-1.5`}
                >
                  {txn["date"]}
                </td>

                {/* amount */}
                <td
                  className={`border-b border-[var(--border-default)] px-2 py-1.5 text-center`}
                >
                  {txn["type"] === "Income" ? "+" : "-"} {txn["amount"]}
                </td>

                {/* title */}
                <td
                  className={`border-b border-[var(--border-default)] px-2 py-1.5`}
                >
                  {txn["title"]}
                </td>

                {/* payment method */}
                <td
                  className={`border-b border-[var(--border-default)] px-2 py-1.5 uppercase`}
                >
                  {txn["paymentMethod"]}
                </td>

                {/* category */}
                <td
                  className={`rounded-r-full border-b border-[var(--border-default)] px-2 py-1.5 capitalize`}
                >
                  {txn["category"]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransaction;
