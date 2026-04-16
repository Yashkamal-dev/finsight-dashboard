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
    <div className="py-4">
      {/* table header */}
      <div className="grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] gap-4 rounded-full bg-[#ebe8ff] px-3 py-3 text-[var(--accent-text)]">
        <h3 className="uppercase">Date</h3>
        <h3 className="uppercase">amount</h3>
        <h3 className="uppercase">payment name</h3>
        <h3 className="uppercase">method</h3>
        <h3 className="uppercase">category</h3>
        <h3 className="uppercase">type</h3>
      </div>

      {/* table data */}
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
              className={`w-3/5 text-right ${txn["type"] === "Income" ? "text-[var(--success)]" : "text-[var(--danger)]"}`}
            >
              {txn["type"] === "Income" ? "+ " : "- "} {txn["amount"]}
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
              className={`${txn["type"] === "Income" ? "bg-[var(--success-bg)] text-[var(--success)]" : "bg-[var(--danger-bg)] text-[var(--danger)]"} flex w-max items-center rounded-full px-2`}
            >
              {txn["type"]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
