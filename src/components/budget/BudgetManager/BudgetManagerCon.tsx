import type { option } from "../../../types/optionsType";
import BudgetCard from "./BudgetCard";
import Filter from "./Filter";
import Options from "./Options";

type props = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  options: option[];
  selected: option;
  onChange(val: option): void;
};

const BudgetManagerCon = ({
  selectedDate,
  setSelectedDate,
  options,
  selected,
  onChange,
}: props) => {
  return (
    <div>
      {/* options compnent */}
      <Options selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* filter component */}
      <Filter options={options} selected={selected} onChange={onChange} />

      {/* budgetcard */}
      <BudgetCard />
    </div>
  );
};

export default BudgetManagerCon;
