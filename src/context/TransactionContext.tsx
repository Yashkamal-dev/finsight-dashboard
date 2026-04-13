import { createContext, useEffect, useState, type ReactNode } from "react";
import type { transactionInterface } from "../types/transaction";

type contextType = {
  CurrentMonthTransactions: transactionInterface[];
  SelectedMonthTransactions: transactionInterface[];
  SelectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  addTransaction(transaction: transactionInterface, month: string): void;
};

// month generater
export const monthStringGen = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}`;
};

// data fetcher from a month
const getData = (month: string) => {
  const key = `Transactions_${month}`;

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

export const transactionData = createContext<contextType | null>(null);

// component
const TransactionContext = ({ children }: { children: ReactNode }) => {
  // current month and it's string
  const currentDate = new Date();
  const currentMonthString = monthStringGen(currentDate);

  // prev month and it's string
  const prevMonth = new Date(currentDate);
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  const prevMonthString = monthStringGen(prevMonth);

  // state to set selected month transaction
  const [SelectedMonth, setSelectedMonth] = useState<string>(prevMonthString);

  // data of current month
  const [CurrentMonthTransactions, setCurrentMonthTransactions] = useState<
    transactionInterface[]
  >(getData(currentMonthString));

  // data for selected month
  const [SelectedMonthTransactions, setSelectedMonthTransactions] = useState<
    transactionInterface[]
  >(getData(SelectedMonth));

  // to change the selected month transaction array on month change
  useEffect(() => {
    setSelectedMonthTransactions(getData(SelectedMonth));
  }, [SelectedMonth]);

  // add transaction to a specified month function
  const addTransaction = (transaction: transactionInterface, month: string) => {
    const key = `Transactions_${month}`;
    const dataOfMonth: transactionInterface[] = getData(month);

    dataOfMonth.push(transaction);

    localStorage.setItem(key, JSON.stringify(dataOfMonth));

    if (month === currentMonthString) {
      setCurrentMonthTransactions((prev) => [...prev, transaction]);
    } else if (month === SelectedMonth) {
      setSelectedMonthTransactions((prev) => [...prev, transaction]);
    }
  };

  return (
    <transactionData.Provider
      value={{
        CurrentMonthTransactions,
        SelectedMonthTransactions,
        SelectedMonth,
        setSelectedMonth,
        addTransaction,
      }}
    >
      {children}
    </transactionData.Provider>
  );
};

export default TransactionContext;
