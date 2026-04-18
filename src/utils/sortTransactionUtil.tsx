import type { transactionInterface } from "../types/transaction";

// function that will fetch transactions from the array in sorted order
export const sortTransactions = (transactionArray: transactionInterface[]) => {
  const recentTransactions = [...transactionArray].sort((a, b) => {
    return new Date(b["date"]).getTime() - new Date(a["date"]).getTime();
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

// ------------------------------------------------------------------------

// * functions that are used in transaction list in the transaction page

// function to sort provided transactionArray by provided type
export const sortByType = (
  type: string,
  transactionArray: transactionInterface[],
) => {
  // returning same array if the type is "all" (no filtering)
  if (type === "all") {
    return transactionArray;
  }

  // filtering array based on type provided
  const sortedArray = transactionArray.filter((txn) => {
    return txn["type"] === type;
  });

  return sortedArray;
};

// function to sort provided transactionArray by provided category
export const sortByCategory = (
  category: string,
  transactionArray: transactionInterface[],
) => {
  // returning same array if the category is "all" (no filtering)
  if (category === "all") {
    return transactionArray;
  }

  // filtering array based on category provided
  const sortedArray = transactionArray.filter((txn) => {
    return txn["category"] === category;
  });

  return sortedArray;
};

// function to sort provided transactionArray by provided method
export const sortByMethod = (
  method: string,
  transactionArray: transactionInterface[],
) => {
  // returning same array if the method is "all" (no filtering)
  if (method === "all") {
    return transactionArray;
  }

  // filtering array based on method provided
  const sortedArray = transactionArray.filter((txn) => {
    return txn["paymentMethod"] === method;
  });

  return sortedArray;
};
