type props = {
  pageTitle: string;
  message: string;
};

const TopBar = ({ pageTitle, message }: props) => {
  return (
    <header className="flex h-max w-full items-center justify-between py-4">
      {/* heading and message */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
          {pageTitle}
        </h1>
        <p className="text-base text-[var(--text-secondary)] md:text-lg">
          {message}
        </p>
      </div>

      {/* search, notify and profile */}
      <div className="flex gap-4">
        {/* search icon */}
        <button className="hidden h-12 w-12 cursor-pointer rounded-full border border-[var(--border-default)] p-2 md:block">
          <svg
            className="fill-[var(--text-primary)]"
            xmlns="http://www.w3.org/2000/svg"
            // height="24px"
            viewBox="0 -960 960 960"
            // width="24px"
            fill="#e3e3e3"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>

        {/* noify icon */}
        <button className="hidden h-12 w-12 cursor-pointer rounded-full border border-[var(--border-default)] p-2 md:block">
          <svg
            className="fill-[var(--text-primary)]"
            xmlns="http://www.w3.org/2000/svg"
            // height="24px"
            viewBox="0 -960 960 960"
            // width="24px"
            fill="#e3e3e3"
          >
            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
        </button>

        {/* profile icon */}
        <div className="flex h-12 cursor-pointer items-center gap-1 rounded-full border border-[var(--border-default)]">
          <img
            className="m-1 h-10 w-10 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="mr-3 flex flex-col gap-0">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Luke Robinson
            </p>
            <span className="text-xs hidden md:block text-[var(--text-primary)] text-[var(--text-secondary)]">
              luke@gmail.com
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
