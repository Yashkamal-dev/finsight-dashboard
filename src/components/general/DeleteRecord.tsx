type props = {
  entity: string;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFun: () => void;
};

const DeleteRecord = ({ entity, setIsDeleting, deleteFun }: props) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* backdrop layer */}
      <div
        onClick={() => {
          setIsDeleting(false);
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
      ></div>

      {/* modal to delete */}
      <div className="relative flex w-95 flex-col gap-5 rounded-3xl border-[var(--danger)] bg-[var(--bg-primary)] px-5 py-3 md:py-4 shadow-lg md:w-125">
        <header className="flex flex-col justify-center gap-1">
          {/* main title to delete record */}
          <h2 className="text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
            Delete {entity}
          </h2>

          {/* sub title */}
          <p className="text-sm text-[var(--text-secondary)] md:text-base">
            This action cannot be undone.
          </p>
        </header>

        {/* cancel and delete container */}
        <div className="mt-0 flex gap-3 border-t border-[var(--border-default)] pt-3 md:pt-4.5 pb-1 md:mt-1">
          {/* cancel button */}
          <button
            onClick={() => {
              setIsDeleting(false);
            }}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] py-1.5 text-base text-[var(--text-primary)] shadow-xl md:py-2.5 md:text-lg"
          >
            Cancel
          </button>

          {/* save button */}
          <button
            onClick={() => {
              deleteFun();
              setIsDeleting(false);
            }}
            className="grow cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--danger)] py-1.5 text-base text-[var(--text-inverse)] shadow-xl md:py-2.5 md:text-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRecord;
