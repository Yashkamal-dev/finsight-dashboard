import type { transactionInterface } from "../types/transaction";

// month generater
export const monthStringGen = (date: Date) => {
  return date.toISOString().slice(0, 7);
};

// data fetcher from a month
export const getData = (month: string) => {
  const key = `Transactions_${month}`;

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

// funtion to delete record
export const deleteTransaction = (txn: transactionInterface | null) => {
  // if the transaction is null, returning immediately
  if (!txn) return;

  // destructuring required keys
  const { id, date } = txn;

  // getting data from the localstorage for the slected txn's date to delete
  const transactions: transactionInterface[] = getData(
    monthStringGen(new Date(date)),
  );

  // getting all the transaction accept the provided txn to delete
  const updatedTransaction = transactions.filter((txn) => txn["id"] !== id);

  // setting new transaction list into localstorage
  localStorage.setItem(
    `Transactions_${monthStringGen(new Date(date))}`,
    JSON.stringify(updatedTransaction),
  );

  console.log(updatedTransaction);
};
