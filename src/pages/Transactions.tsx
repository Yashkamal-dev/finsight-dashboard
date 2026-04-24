import { useState } from "react";
import Filters from "../components/transaction/Filters";
import Options from "../components/transaction/Options";
import TopBar from "../layouts/TopBar";
import type { option } from "../types/optionsType";
import TransactionList from "../components/transaction/TransactionList";
import { getData, monthStringGen } from "../utils/transactionContextUtils";
import type { transactionInterface } from "../types/transaction";
import AddTransaction from "../components/general/AddTransaction";

// options for the transaction type selection
const types: option[] = [
  { label: "All", value: "all" },
  { label: "Income", value: "Income" },
  { label: "Expense", value: "Expense" },
  { label: "Goals", value: "Goal" },
];

// options for categories of income
const incomeCategories: option[] = [
  { label: "Salary", value: "salary" },
  { label: "Freelance", value: "freelance" },
  { label: "Cashback", value: "cashback" },
  { label: "Refund", value: "refund" },
];

// options for categories of expense
const expenseCategories: option[] = [
  { label: "Rent", value: "rent" },
  { label: "Food", value: "food" },
  { label: "Health", value: "health" },
  { label: "Shopping", value: "shopping" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Transport", value: "transport" },
  { label: "Investment", value: "investment" },
  { label: "Transfer", value: "transfer" },
];

// options for the payment method
const method: option[] = [
  { label: "All", value: "all" },
  { label: "Cash", value: "cash" },
  { label: "UPI", value: "upi" },
  { label: "Card", value: "card" },
  { label: "Bank", value: "bank" },
  { label: "Balance", value: "Balance" },
];

// transaction page
const Transactions = () => {
  // state to mount and unmount the add transaction component
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // initial categories with options for "All"
  let categories: option[] = [
    { label: "All", value: "all" },
    { label: "Goal Contribution", value: "Goal Contribution" },
    ...incomeCategories,
    ...expenseCategories,
  ];

  // state for the current selected type
  const [selectedType, setselectedType] = useState<option>(types[0]);

  // state for the current selected categories
  const [selectedCategories, setselectedCategories] = useState<option>(
    categories[0],
  );

  // state for the current selected payment method
  const [selectedMethod, setSelectedMethod] = useState<option>(method[0]);

  // assigning categories based on the seleceted type
  if (selectedType["value"] === "Income") {
    categories = [{ label: "All", value: "all" }, ...incomeCategories];
  } else if (selectedType["value"] === "Expense") {
    categories = [{ label: "All", value: "all" }, ...expenseCategories];
  } else if (selectedType["value"] === "Goal") {
    categories = [{ label: "All", value: "all" }];
  }

  // the date to for the transaction list (default as current date)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // transaction data for the selected month
  const selectedDateTransactions: transactionInterface[] = getData(
    monthStringGen(selectedDate),
  );

  return (
    <div className="px-4">
      {/* topbar of the page */}
      <TopBar
        pageTitle="Transactions"
        message="Track, filter, and manage your financial transactions with ease."
      />

      {/* month and Add transaction option's component */}
      <Options
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setIsAdding={setIsAdding}
      />

      {/* filter menu component */}
      <Filters
        types={types}
        selectedType={selectedType}
        setselectedType={setselectedType}
        categories={categories}
        selectedCategories={selectedCategories}
        setselectedCategories={setselectedCategories}
        method={method}
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />

      {/* transaction list / Table */}
      <TransactionList
        selectedDateTransactions={selectedDateTransactions}
        selectedType={selectedType}
        selectedCategories={selectedCategories}
        selectedMethod={selectedMethod}
      />

      {isAdding && <AddTransaction setIsAdding={setIsAdding} />}
    </div>
  );
};

export default Transactions;
