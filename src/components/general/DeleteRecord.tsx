type props = {
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFun: () => void;
};

const DeleteRecord = ({ setIsDeleting, deleteFun }: props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* backdrop layer */}
      <div
        onClick={() => {
          setIsDeleting(false);
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
      ></div>

      {/* modal to delete */}
      <div className="relative flex w-125 flex-col gap-5 rounded-3xl border-[var(--danger)] bg-[var(--bg-primary)] px-5 py-4 shadow-lg">
        <header className="flex flex-col justify-center gap-1">
          {/* main title to delete record */}
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
            Delete Transaction
          </h2>

          {/* sub title */}
          <p className="text- text-[var(--text-secondary)]">
            This action cannot be undone.
          </p>
        </header>

        {/* cancel and delete container */}
        <div className="mt-1 flex gap-3 border-t border-[var(--border-default)] pt-4.5 pb-1">
          {/* cancel button */}
          <button
            onClick={() => {
              setIsDeleting(false);
            }}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-2.5 text-lg text-[var(--text-primary)] shadow-xl"
          >
            Cancel
          </button>

          {/* save button */}
          <button
            onClick={() => {
              deleteFun();
              setIsDeleting(false);
            }}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--danger)] py-2.5 text-lg text-[var(--text-inverse)] shadow-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecord;
