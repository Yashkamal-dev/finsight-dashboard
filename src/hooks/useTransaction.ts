import { useContext } from "react";
import { transactionData } from "../context/TransactionContext";

export const useTransaction = () => {
  const context = useContext(transactionData);

  if (!context) {
    throw new Error("The context is null");
  }

  return context;
};
