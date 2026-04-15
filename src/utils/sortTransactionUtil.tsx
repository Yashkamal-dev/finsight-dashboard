import type { transactionInterface } from "../types/transaction";

// function that will fetch transactions from the array in sorted order
export const sortTransactions = (transactionArray: transactionInterface[]) => {
  const recentTransactions = [...transactionArray].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return recentTransactions;
};

// function that will fetch Income transactions from the array in sorted order
export const sortIncomeFromTransactions = (
  transactionArray: transactionInterface[],
) => {
  const incomeTransactions = [...transactionArray]
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .filter((tnx) => {
      return tnx["type"] === "Income";
    });

  return incomeTransactions;
};

// function that will fetch expense transactions from the array in sorted order
export const sortExpenseFromTransactions = (
  transactionArray: transactionInterface[],
) => {
  const expenseTransactions = [...transactionArray]
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .filter((tnx) => {
      return tnx["type"] === "Expense";
    });

  return expenseTransactions;
};
