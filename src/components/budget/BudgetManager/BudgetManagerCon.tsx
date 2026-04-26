import type { budgetType } from "../../../types/Budget";
import type { option } from "../../../types/optionsType";
import BudgetCardCon from "./BudgetCardCon";
import Filter from "./Filter";
import Options from "./Options";

type props = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  options: option[];
  selected: option;
  onChange(val: option): void;
  allBudget: budgetType[];
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: option;
  setbdgtToEdit: React.Dispatch<React.SetStateAction<budgetType | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const BudgetManagerCon = ({
  selectedDate,
  setSelectedDate,
  options,
  selected,
  onChange,
  allBudget,
  setIsAdding,
  selectedOption,
  setbdgtToEdit,
  setIsEditing,
}: props) => {
  return (
    <div className="flex-[2_1_1000px] flex-col gap-2">
      {/* options compnent */}
      <Options
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setIsAdding={setIsAdding}
      />

      {/* filter component */}
      <Filter options={options} selected={selected} onChange={onChange} />

      {/* budgetcardcon */}
      <BudgetCardCon
        allBudget={allBudget}
        selectedOption={selectedOption}
        setbdgtToEdit={setbdgtToEdit}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default BudgetManagerCon;
