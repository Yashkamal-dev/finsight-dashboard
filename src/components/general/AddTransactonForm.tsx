import { useState } from "react";
import Dropdown from "./Dropdown";
import type { option } from "../../types/optionsType";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

// today's date and string for comparision
const todayDate = new Date();
const todayDatestr = todayDate.toISOString().split("T")[0];

// yesterday's date and string for comparision
const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
const yesterdayDatestr = yesterdayDate.toISOString().split("T")[0];

// type for the types button in the form
const Types = ["Income", "Expense"];

const methods: option[] = [
  { label: "", value: "" },
  { label: "Cash", value: "cash" },
  { label: "UPI", value: "upi" },
  { label: "Card", value: "card" },
  { label: "Bank", value: "bank" },
];

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

const AddTransactonForm = () => {
  // type of the transaction to set
  const [type, setType] = useState("Expense");

  // amount state
  const [amount, setAmount] = useState<number>();

  // name state
  const [name, setName] = useState<string>();

  // note state
  const [note, setNote] = useState<string>();

  // method state
  const [method, setMethod] = useState<option>(methods[0]);

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

  return (
    <div className="relative flex w-125 flex-col gap-5 rounded-3xl bg-[var(--bg-primary)] px-5 py-4 shadow-xl">
      {/* form heading */}
      <div className="flex flex-col items-center justify-center gap-1">
        {/* title */}
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Add Transaction
        </h1>
        {/* subttle */}
        <h2 className="text- text-[var(--text-secondary)]">
          Record your income or expense in seconds.
        </h2>
      </div>

      {/* form */}
      <form
        action="\"
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col gap-5"
      >
        {/* type - amount container */}
        <div className="flex h-fit items-center gap-3">
          {/* type */}
          <div className="flex grow flex-col gap-2">
            {/* type label */}
            <p className="text-lg font-medium">Type</p>

            {/* button container for types */}
            <div className="flex gap-3">
              {Types.map((typ) => {
                return (
                  <button
                    key={crypto.randomUUID()}
                    onClick={() => {
                      setType(typ);
                    }}
                    className={`cursor-pointer rounded-full text-lg shadow-lg ${type === typ ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} border border-[var(--border-default)] px-3.5 py-1`}
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
            <p className="text-lg font-medium">Amount</p>

            {/* amount input */}
            <input
              type="number"
              placeholder="₹ 100.00"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-full border border-[var(--border-default)] py-2 pl-3 shadow-lg focus:outline-0"
            />
          </div>
        </div>

        {/* name - note container */}
        <div className="flex flex-col gap-3">
          {/* name container */}
          <div className="flex grow flex-col gap-2">
            {/* name label */}
            <p className="text-lg font-medium">Name</p>

            {/* name input */}
            <input
              type="text"
              placeholder="e.g. Grocery shopping"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="grow rounded-full border border-[var(--border-default)] py-2 pl-5 text-lg shadow-lg focus:outline-0"
            />
          </div>

          {/* note container */}
          <div className="flex grow flex-col gap-2">
            <p className="text-lg font-medium"> Note</p>
            <textarea
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              className="w h-13 grow resize-none rounded-full border border-[var(--border-default)] py-2 pl-5 text-lg shadow-lg focus:outline-0"
            ></textarea>
          </div>
        </div>

        {/* method - category container */}
        <div className="flex gap-3">
          {/* method */}
          <div className="flex grow flex-col gap-2.5">
            <p className="text-lg font-medium">Method</p>

            {/* <Dropdown for method /> */}
            <Dropdown
              options={methods}
              selected={method}
              onChange={(val) => setMethod(val)}
              placeholder="Select Method"
            />
          </div>

          {/* method */}
          <div className="flex grow flex-col gap-2.5">
            <p className="text-lg font-medium">Category</p>

            {/* <Dropdown for category /> */}
            <Dropdown
              options={categories}
              selected={category}
              onChange={(val) => setCategory(val)}
              placeholder="Select Category"
            />
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2.5">
          {/* date label */}
          <p className="text-lg font-medium">Date</p>

          {/* date option */}
          <div className="flex gap-3">
            {/* button for today */}
            <button
              onClick={() => {
                setDate(new Date());
              }}
              className={`grow cursor-pointer rounded-full ${isToday ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} border border-[var(--border-default)] px-5 py-1 text-lg shadow-lg`}
            >
              Today
            </button>

            {/* button for yesterday */}
            <button
              onClick={() => {
                setDate(yesterdayDate);
              }}
              className={`grow ${isYesterday ? "bg-[var(--accent-primary)] text-[var(--text-inverse)]" : "hover:bg-[var(--accent-subtle)]"} cursor-pointer rounded-full border border-[var(--border-default)] px-5 py-1 text-lg shadow-lg`}
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
                  className={`grow cursor-pointer rounded-full border border-[var(--border-default)] px-5 py-1 text-lg shadow-lg hover:bg-[var(--accent-subtle)]`}
                >
                  {isCustom
                    ? `${date?.toISOString().split("T")[0]}`
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
        <div className="mt-1 flex gap-3 border-t border-[var(--border-default)] pt-4.5 pb-1">
          <button className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-2.5 text-[var(--text-primary)] shadow-xl">
            Cancel
          </button>
          <button className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--accent-primary)] py-2.5 text-[var(--text-inverse)] shadow-xl">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactonForm;
