import Options from "../components/transaction/Options";
import TopBar from "../layouts/TopBar";

const Transactions = () => {
  return (
    <div className="px-4">
      <TopBar
        pageTitle="Transactions"
        message="Track, filter, and manage your financial transactions with ease."
      />
      <Options />
    </div>
  );
};

export default Transactions;
