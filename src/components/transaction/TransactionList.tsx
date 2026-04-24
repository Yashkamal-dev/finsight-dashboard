import type { option } from "../../types/optionsType";
import type { transactionInterface } from "../../types/transaction";
import {
  sortByCategory,
  sortByMethod,
  sortByType,
  sortTransactions,
} from "../../utils/sortTransactionUtil";

type props = {
  selectedDateTransactions: transactionInterface[];
  selectedType: option;
  selectedCategories: option;
  selectedMethod: option;
};

// * transactionList component containing table of the list
const TransactionList = ({
  selectedDateTransactions,
  selectedType,
  selectedCategories,
  selectedMethod,
}: props) => {
  // destructuring values and assigning names to them for the filtering
  const { value: type } = selectedType;
  const { value: category } = selectedCategories;
  const { value: method } = selectedMethod;

  // sorting list in most recent order
  let displayedTransactions = sortTransactions([...selectedDateTransactions]);

  // sorting array based on type
  displayedTransactions = sortByType(type, displayedTransactions);

  // sorting array based on category
  displayedTransactions = sortByCategory(category, displayedTransactions);

  // sorting array based on method
  displayedTransactions = sortByMethod(method, displayedTransactions);

  return (
    <div className="flex flex-col gap-2 py-4">
      <p className="px-2 text-[var(--text-secondary)]">
        {displayedTransactions.length} Items
      </p>
      <div className="">
        {/* table header */}
        <div className="grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] gap-4 rounded-full bg-[#ebe8ff] px-4 py-3 text-[var(--accent-text)]">
          <h3 className="uppercase">Date</h3>
          <h3 className="uppercase">amount</h3>
          <h3 className="uppercase">payment name</h3>
          <h3 className="uppercase">method</h3>
          <h3 className="uppercase">category</h3>
          <h3 className="uppercase">type</h3>
        </div>

        {/* table data */}
        {selectedDateTransactions.length === 0 ? (
          // if no records for the selected month
          <div className="flex flex-col items-center py-10">
            {/* main text if no records found for selected month */}
            <p className="text-lg text-[var(--text-primary)]">
              No transactions yet for this month.
            </p>

            {/* sub text if no records found for selected month */}
            <p className="text-base text-[var(--text-muted)]">
              Start by adding your first transaction.
            </p>
          </div>
        ) : displayedTransactions.length === 0 ? (
          // if no records for the filter
          <div className="flex flex-col items-center py-10">
            {/* main text if no records found for specified filter */}
            <p className="text-lg text-[var(--text-primary)]">
              No transactions match your filters.
            </p>

            {/* sub text if no records found for specified filter */}
            <p className="text-base text-[var(--text-muted)]">
              Try adjusting or clearing filters.
            </p>
          </div>
        ) : (
          <>
            {/* table data based on transaction present in the displayedTransactions */}
            {displayedTransactions.map((txn) => {
              return (
                <div
                  key={txn["id"]}
                  className={`grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] gap-4 rounded-full border-b border-b-[var(--border-subtle)] px-3 py-3`}
                >
                  {/* date */}
                  <p className="text-[var(--text-primary)]">{txn["date"]}</p>

                  {/* amount */}
                  <p
                    className={`w-3/5 text-right ${
                      txn["type"] === "Income"
                        ? "text-[var(--success)]"
                        : txn["type"] === "Expense"
                          ? "text-[var(--danger)]"
                          : txn["type"] === "Goal"
                            ? "text-[var(--warning)]"
                            : ""
                    }`}
                  >
                    {txn["type"] === "Income"
                      ? "+ "
                      : txn["type"] === "Expense"
                        ? "- "
                        : txn["type"] === "Goal"
                          ? ""
                          : ""}{" "}
                    {txn["amount"]}
                  </p>

                  {/* name */}
                  <p className="text-[var(--text-primary)]">{txn["title"]}</p>

                  {/* method */}
                  <p className="text-[var(--text-primary)] capitalize">
                    {txn["paymentMethod"]}
                  </p>

                  {/* category */}
                  <p className="text-[var(--text-primary)] capitalize">
                    {txn["category"]}
                  </p>

                  {/* type */}
                  <p
                    className={`${
                      txn["type"] === "Income"
                        ? "bg-[var(--success-bg)] text-[var(--success)]"
                        : txn["type"] === "Expense"
                          ? "bg-[var(--danger-bg)] text-[var(--danger)]"
                          : txn["type"] === "Goal"
                            ? "bg-[var(--warning-bg)] text-[var(--warning)]"
                            : ""
                    } flex w-max min-w-20 items-center justify-center rounded-full px-2`}
                  >
                    {txn["type"]}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
