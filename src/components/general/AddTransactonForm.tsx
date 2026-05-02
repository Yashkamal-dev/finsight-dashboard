import { useState } from "react";
import Dropdown from "./Dropdown";
import type { option } from "../../types/optionsType";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import type { transactionInterface } from "../../types/transaction";
import { useTransaction } from "../../hooks/useTransaction";
import { monthStringGen } from "../../utils/transactionContextUtils";

type prop = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

// today's date and string for comparision
const todayDate = new Date();
const todayDatestr = todayDate.toISOString().split("T")[0];

// yesterday's date and string for comparision
const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
const yesterdayDatestr = yesterdayDate.toISOString().split("T")[0];

// type for the types button in the form
const Types = ["Income", "Expense"];

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

// modal component
const AddTransactonForm = ({ setIsAdding }: prop) => {
  // useing addTransaction to store the data into localstorage for specified month
  const { addTransaction } = useTransaction();

  // type of the transaction to set
  const [type, setType] = useState<string>("Expense");

  // amount state
  const [amount, setAmount] = useState<number>();

  // name state
  const [name, setName] = useState<string>();

  // note state
  const [note, setNote] = useState<string>();

  // method state
  const [method, setMethod] = useState<option>(methods[0]);

  // assigning category based on the selected type
  let categories: option[] =
    type === "Income"
      ? [{ label: "", value: "" }, ...incomeCategories]
      : [{ label: "", value: "" }, ...expenseCategories];

  // category state
  const [category, setCategory] = useState(categories[0]);

  // date state
  const [date, setDate] = useState<Date>(new Date());

  // formating the selected date string into comparable format
  const selectedStr = format(date, "yyyy-MM-dd");

  // identifying selected date
  const isToday: boolean = selectedStr === todayDatestr;
  const isYesterday: boolean = selectedStr === yesterdayDatestr;
  const isCustom: boolean = !isToday && !isYesterday;

  // function to handle default behaviour
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // error state to determine if any value if pending
  const [errors, setErrors] = useState({
    amount: false,
    name: false,
    method: false,
    category: false,
  });

  // function to validate transaction
  const validateTransaction = () => {
    const newErrors = {
      amount: false,
      name: false,
      method: false,
      category: false,
    };

    //  amount validation
    if (!amount || amount <= 0) {
      newErrors["amount"] = true;
    }
    // name of the transaction validation
    if (!name || name.trim() === "") {
      newErrors["name"] = true;
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

  // function to save Transaction into localstorage after validation
  const saveTransaction = () => {
    // validating and fetching current errors
    const newErrors = validateTransaction();

    // returning even if one error is true
    if (Object.values(newErrors).some(Boolean)) return;

    // handling types
    if (!amount) return;
    if (!name) return;

    // building a transaction object to store in localstorage
    const newTransacstion: transactionInterface = {
      amount: amount,
      category: category["value"],
      createdAt: new Date().toISOString(),
      date: date.toLocaleDateString("en-CA"),
      id: crypto.randomUUID(),
      note: note || "",
      paymentMethod: method["value"],
      title: name,
      type: type,
    };

    // storing transaction into localstorage for selected date
    addTransaction(newTransacstion, monthStringGen(new Date(date)));

    // unmounting the addTransaction component
    setIsAdding(false);
  };

  return (
    <div className="relative flex w-95 flex-col gap-3 rounded-3xl bg-[var(--bg-primary)] px-4 py-2.5 shadow-xl md:w-125 md:gap-5 md:px-5 md:py-4">
      {/* form heading */}
      <div className="flex flex-col items-center justify-center md:gap-1">
        {/* title */}
        <h1 className="text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
          Add Transaction
        </h1>
        {/* subttle */}
        <h2 className="text-center text-sm text-[var(--text-secondary)] md:text-base">
          Record your income or expense in seconds.
        </h2>
      </div>

      {/* form */}
      <form
        action="\"
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col gap-3 md:gap-5"
      >
        {/* type - amount container */}
        <div className="flex h-fit items-center gap-3">
          {/* type */}
          <div className="flex grow flex-col gap-2">
            {/* type label */}
            <p className="font-medium md:text-lg">Type</p>

            {/* button container for types */}
            <div className="flex gap-2 md:gap-3">
              {Types.map((typ) => {
                return (
                  <button
                    key={crypto.randomUUID()}
                    onClick={() => {
                      setType(typ);
                    }}
                    className={`cursor-pointer rounded-full text-sm shadow-lg md:text-lg ${type === typ ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} border border-[var(--border-default)] px-3.5 py-1`}
                  >
                    {typ}
                  </button>
                );
              })}
            </div>
          </div>

          {/* amount */}
          <div className="flex grow flex-col gap-2">
            {/* amount label */}
            <div className="flex items-center gap-2">
              <p className="font-medium md:text-lg">Amount</p>
              {errors["amount"] && (
                // text to show on error - (if empty)
                <span className="text-[var(--danger)] md:text-lg">
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
              className={`w-full rounded-full border text-sm transition-all duration-100 ease-in md:text-base ${errors["amount"] === true ? "border-[var(--danger)]" : ""} border-[var(--border-default)] py-1 pl-3 shadow-lg focus:outline-0 md:py-2`}
            />
          </div>
        </div>

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
              className={`grow rounded-full border text-sm md:text-lg ${errors["name"] === true ? "border-[var(--danger)]" : ""} border-[var(--border-default)] py-2 pl-5 shadow-lg focus:outline-0`}
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

        {/* method - category container */}
        <div className="flex gap-3">
          {/* method */}
          <div className="flex grow flex-col gap-2.5">
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
          <div className="flex grow flex-col gap-2.5">
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

        {/* Date */}
        <div className="flex flex-col gap-2.5">
          {/* date label */}
          <p className="font-medium md:text-lg">Date</p>

          {/* date option */}
          <div className="flex gap-3">
            {/* button for today */}
            <button
              onClick={() => {
                setDate(new Date());
              }}
              className={`grow cursor-pointer rounded-full ${isToday ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} border border-[var(--border-default)] py-0.5 text-sm shadow-lg md:px-5 md:py-1 md:text-lg`}
            >
              Today
            </button>

            {/* button for yesterday */}
            <button
              onClick={() => {
                setDate(yesterdayDate);
              }}
              className={`grow ${isYesterday ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} cursor-pointer rounded-full border border-[var(--border-default)] py-0.5 text-sm shadow-lg md:px-5 md:py-1 md:text-lg`}
            >
              Yerterday
            </button>

            {/* for custom date */}
            {/* popover for calender on button press */}
            <Popover>
              {/* the trigger button for calender pop-up */}
              <PopoverTrigger asChild>
                {/* custom date button */}
                <button
                  className={`grow cursor-pointer ${isCustom ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} rounded-full border border-[var(--border-default)] py-0.5 text-sm shadow-lg md:px-5 md:py-1 md:text-lg`}
                >
                  {isCustom
                    ? `${date?.toLocaleDateString("en-CA")}`
                    : "Pick Date"}
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

        {/* cancel and save button */}
        <div className="mt-1 flex gap-1.5 border-t border-[var(--border-default)] pt-3 pb-1 md:gap-3 md:pt-4.5">
          {/* cancel button */}
          <button
            onClick={() => {
              setIsAdding(false);
            }}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-1 text-[var(--text-primary)] shadow-xl md:py-2.5"
          >
            Cancel
          </button>

          {/* save button */}
          <button
            onClick={saveTransaction}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] py-1 text-[var(--text-inverse)] shadow-xl md:py-2.5"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactonForm;
