import type { transactionInterface } from "../../../types/transaction";
import EditTransactionForm from "./EditTransactionForm";

type props = {
  prevTxn: transactionInterface;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTransaction = ({ prevTxn, setIsEditing }: props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Backdrop layer */}
      <div
        onClick={() => {
          setIsEditing(false);
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
      >
        {" "}
      </div>

      {/* modal layer - contains the form */}
      <EditTransactionForm prevTxn={prevTxn} setIsEditing={setIsEditing} />
    </div>
  );
};

export default EditTransaction;
