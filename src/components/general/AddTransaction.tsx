import AddTransactonForm from "./AddTransactonForm";

const AddTransaction = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Backdrop layer */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"> </div>

      {/* modal layer - contains the form */}
      <AddTransactonForm />
    </div>
  );
};

export default AddTransaction;
