import AddTransactonForm from "./AddTransactonForm";

type prop = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTransaction = ({ setIsAdding }: prop) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Backdrop layer */}
      <div
        onClick={() => {
          setIsAdding(false);
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
      >
        {" "}
      </div>

      {/* modal layer - contains the form */}
      <AddTransactonForm setIsAdding={setIsAdding} />
    </div>
  );
};

export default AddTransaction;
