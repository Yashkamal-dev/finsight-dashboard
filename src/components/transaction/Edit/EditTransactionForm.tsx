import { useState } from "react";
import type { option } from "../../../types/optionsType";
import Dropdown from "../../general/Dropdown";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import type { transactionInterface } from "../../../types/transaction";
import { updateTransactionInLocalStorage } from "../../../utils/transactionContextUtils";

// list used for dropdown and specifying mehtod
const methods: option[] = [
  { label: "", value: "" },
  { label: "Cash", value: "cash" },
  { label: "UPI", value: "upi" },
  { label: "Card", value: "card" },
  { label: "Bank", value: "bank" },
];

// categories that income should have
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

type props = {
  prevTxn: transactionInterface;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTransactionForm = ({ prevTxn, setIsEditing }: props) => {
  // name state - with the intial value as in the previous transaction
  const [name, setName] = useState<string>(prevTxn["title"]);

  // note state - with the intial value as in the previous transaction
  const [note, setNote] = useState<string>(prevTxn["note"]);

  // filtering the method option for the dropdown from the previous transaction
  const [prevMethod] = methods.filter((method) => {
    return method["value"] === prevTxn["paymentMethod"];
  });

  // method state - with the intial value as in the previous transaction
  const [method, setMethod] = useState<option>(prevMethod);

  // assigning category based on the selected type
  const categories: option[] =
    prevTxn["type"] === "Income"
      ? [{ label: "", value: "" }, ...incomeCategories]
      : [{ label: "", value: "" }, ...expenseCategories];

  // filtering the categories option for the dropdown from the previous transaction
  const [prevCategory] = categories.filter((categories) => {
    return categories["value"] === prevTxn["category"];
  });

  // category state - with the intial value as in the previous transaction
  const [category, setCategory] = useState(prevCategory);

  // amount state - with the intial value as in the previous transaction
  const [amount, setAmount] = useState<number>(prevTxn["amount"]);

  // date state - with the intial value as in the previous transaction
  const [date, setDate] = useState<Date>(new Date(prevTxn["date"]));

  // error state to determine if any value if pending
  const [errors, setErrors] = useState({
    amount: false,
    name: false,
    method: false,
    category: false,
  });

  // function to validate transaction update
  const validateTransaction = () => {
    const newErrors = {
      amount: false,
      name: false,
      method: false,
      category: false,
    };

    // name of the transaction validation
    if (!name || name.trim() === "") {
      newErrors["name"] = true;
    }
    //  amount validation
    if (!amount || amount <= 0) {
      newErrors["amount"] = true;
    }
    //  method validation
    if (method === methods[0]) {
      newErrors["method"] = true;
    }
    // category validation
    if (category["value"] === categories[0]["value"]) {
      // used value to compare as categories will be recalculated each time - no same reference
      newErrors["category"] = true;
    }

    setErrors(newErrors);

    return newErrors;
  };

  // function to update transaction
  const updateTransaction = () => {
    // validating and fetching current errors
    const newErrors = validateTransaction();

    // returning even if one error is true
    if (Object.values(newErrors).some(Boolean)) return;

    // building a transaction object to store in localstorage
    const updatedTransasction: transactionInterface = {
      id: prevTxn["id"],
      createdAt: prevTxn["createdAt"],
      type: prevTxn["type"],
      title: name,
      note: note || "",
      amount: amount,
      date: date.toLocaleDateString("en-CA"),
      category: category["value"],
      paymentMethod: method["value"],
    };

    // updating transaction and storing it into localstorage
    updateTransactionInLocalStorage(updatedTransasction);

    // closing the editing modal
    setIsEditing(false);
  };

  return (
    <div className="relative flex w-95 flex-col gap-5 rounded-3xl bg-[var(--bg-primary)] px-4 py-2.5 shadow-xl md:w-125 md:px-5 md:py-4">
      {/* form heading */}
      <div className="flex flex-col items-center justify-center gap-1">
        {/* title */}
        <h1 className="text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
          Edit Transaction
        </h1>
        {/* subttle */}
        <h2 className="text-center text-sm text-[var(--text-secondary)] md:text-base">
          Edit the details below to keep your records accurate
        </h2>
      </div>

      {/* ------------------------------------------------------------ */}

      {/* name - note container */}
      <div className="flex flex-col gap-3">
        {/* name container */}
        <div className="flex grow flex-col gap-2">
          {/* name label */}
          <div className="flex items-center gap-2">
            <p className="font-medium md:text-lg">Name</p>
            {errors["name"] && (
              // text to show on error - (if empty)
              <span className="text-lg text-[var(--danger)]">*</span>
            )}
          </div>

          {/* name input */}
          <input
            type="text"
            placeholder="e.g. Grocery shopping"
            value={name}
            onChange={(e) => {
              setErrors((prev) => {
                return { ...prev, name: false };
              });
              setName(e.target.value);
            }}
            className={`grow rounded-full ${errors["name"] === true ? "border-[var(--danger)]" : ""} border border-[var(--border-default)] py-2 pl-5 text-sm shadow-lg focus:outline-0 md:text-lg`}
          />
        </div>

        {/* note container */}
        <div className="flex grow flex-col gap-2">
          {/* note label */}
          <p className="font-medium md:text-lg"> Note</p>

          {/* note input */}
          <textarea
            placeholder="Add a note (optional)"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            className="h-10 grow resize-none rounded-full border border-[var(--border-default)] py-2 pl-5 text-sm shadow-lg focus:outline-0 md:h-13 md:text-lg"
          ></textarea>
        </div>
      </div>

      {/* amount - date container */}
      <div className="flex h-fit items-center gap-3">
        {/* amount */}
        <div className="flex flex-1 flex-col gap-2">
          {/* amount label */}
          <div className="flex items-center gap-2">
            <p className="font-medium md:text-lg">Amount</p>
            {errors["amount"] && (
              // text to show on error - (if empty)
              <span className="text-lg text-[var(--danger)]">
                {amount == undefined ? "*" : "Invalid"}
              </span>
            )}
          </div>

          {/* amount input */}
          <input
            type="number"
            placeholder="₹ 100.00"
            value={amount}
            onChange={(e) => {
              setErrors((prev) => {
                return { ...prev, amount: false };
              });
              return setAmount(Number(e.target.value));
            }}
            className={`w-full rounded-full text-sm md:text-base ${errors["amount"] === true ? "border-[var(--danger)]" : ""} border border-[var(--border-default)] py-2 pl-3 shadow-lg focus:outline-0`}
          />
        </div>

        {/* Date */}
        <div className="flex flex-1 flex-col gap-2">
          {/* Date label */}
          <p className="font-medium md:text-lg">Date</p>

          {/* button container for Date */}
          <div className="flex gap-3">
            {/* for custom date */}
            {/* popover for calender on button press */}
            <Popover>
              {/* the trigger button for calender pop-up */}
              <PopoverTrigger asChild>
                {/* custom date button */}
                <button
                  className={`grow cursor-pointer rounded-full border border-[var(--border-default)] px-5 py-1 text-sm shadow-lg md:text-lg`}
                >
                  {date.toLocaleDateString("en-CA")}
                  {/* Pick Date */}
                </button>
              </PopoverTrigger>

              {/* the popover content - calender */}
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  required
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* method - category container */}
      <div className="flex gap-3">
        {/* method */}
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex items-center gap-2">
            {/* method label */}
            <p className="font-medium md:text-lg">Method</p>
            {errors["method"] && (
              // text to show on error - (if empty)
              <span className="text-lg text-[var(--danger)]">*</span>
            )}
          </div>

          {/* <Dropdown for method /> */}
          <Dropdown
            error={errors["method"]}
            options={methods}
            selected={method}
            onChange={(val) => {
              setErrors((prev) => {
                return { ...prev, method: false };
              });
              setMethod(val);
            }}
            placeholder="Select Method"
          />
        </div>

        {/* category */}
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex items-center gap-2">
            {/* category method */}
            <p className="font-medium md:text-lg">Category</p>
            {errors["category"] && (
              // text to show on error - (if empty)
              <span className="text-lg text-[var(--danger)]">*</span>
            )}
          </div>

          {/* <Dropdown for category /> */}
          <Dropdown
            error={errors["category"]}
            options={categories}
            selected={category}
            onChange={(val) => {
              setErrors((prev) => {
                return { ...prev, category: false };
              });
              setCategory(val);
            }}
            placeholder="Select Category"
          />
        </div>
      </div>

      {/* cancel and save button */}
      <div className="mt-1 flex gap-1.5 border-t border-[var(--border-default)] pt-3 pb-1 md:gap-3 md:pt-4.5">
        {/* cancel button */}
        <button
          onClick={() => {
            setIsEditing(false);
          }}
          className="flex-1 cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-1 text-[var(--text-primary)] shadow-xl md:py-2.5"
        >
          Cancel
        </button>

        {/* save button */}
        <button
          onClick={updateTransaction}
          className="flex-1 cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] py-1 text-[var(--text-inverse)] shadow-xl md:py-2.5"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditTransactionForm;
