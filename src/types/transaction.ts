type transactionType = "Income" | "Expense";

type paymentMethod = "cash" | "upi" | "card" | "bank";

type category =
  | "food"
  | "transport"
  | "shopping"
  | "entertainment"
  | "health"
  | "salary"
  | "freelance"
  | "cashback"
  | "refund"
  | "transfer"
  | "rent"
  | "investment";

export interface transactionInterface {
  id: string;
  type: transactionType;
  amount: number;
  category: category;
  title: string;
  note: string;
  paymentMethod: paymentMethod;
  date: string;
  createdAt: string;
}
