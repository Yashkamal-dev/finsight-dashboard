import { useState } from "react";
import logo from "../assets/logo.avif";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [collapsed, setcollapsed] = useState<boolean>(false);

  const collapseFun = () => {
    setcollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`sticky top-0 grid h-screen auto-rows-max gap-4 bg-[var(--bg-secondary)] p-4 ${collapsed ? "w-25" : "w-72"} transition-all duration-300 ease-in-out`}
    >
      {/* product name and logo */}
      <header
        className={`flex items-center gap-3 py-2 ${collapsed ? "justify-center" : "px-2"}`}
      >
        <img className="h-15 rounded-full" src={logo} alt="the logo" />
        <h1
          className={`text-3xl font-medium text-[var(--text-primary)] ${collapsed ? "hidden" : ""} `}
        >
          FinSight
        </h1>
      </header>

      {/* toggle button */}
      <div className="flex w-full justify-end">
        <button
          className="h-5 w-5 cursor-pointer rounded-full border border-[var(--border-default)]"
          onClick={collapseFun}
        >
          <svg
            className={`h-4 fill-[var(--text-primary)] transition-all duration-500 ease-in-out ${collapsed ? "rotate-180" : ""} `}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
      </div>

      {/* options */}
      <ul className="flex flex-col gap-3">
        {/* dashboard */}
        <li className="flex justify-center">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return `flex w-full items-center gap-4 rounded-full p-3 transition-all duration-200 ${collapsed ? "w-min justify-center p-3.5" : ""} ${isActive ? "bg-[var(--accent-primary)]" : "hover:bg-[var(--accent-primary-hover)]"} `;
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <svg
                    className={`h-8 fill-[var(--text-primary)] ${isActive ? "fill-white" : ""} `}
                    xmlns="http://www.w3.org/2000/svg"
                    //   height="24px"
                    viewBox="0 -960 960 960"
                    //   width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
                  </svg>
                  <span
                    className={`w-full text-xl text-[var(--text-primary)] ${collapsed ? "hidden" : ""} ${isActive ? "text-white" : ""} `}
                  >
                    Dashboard
                  </span>
                </>
              );
            }}
          </NavLink>
        </li>

        {/* transaction */}
        <li className="flex justify-center">
          <NavLink
            to="/transactions"
            className={({ isActive }) => {
              return `flex w-full items-center gap-4 rounded-full px-3 py-3 transition-all duration-200 ${collapsed ? "w-min justify-center p-3.5" : ""} ${isActive ? "bg-[var(--accent-primary)]" : "hover:bg-[var(--accent-primary-hover)]"} `;
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <svg
                    className={`h-8 fill-[var(--text-primary)] ${isActive ? "fill-white" : ""} `}
                    xmlns="http://www.w3.org/2000/svg"
                    //   height="24px"
                    viewBox="0 -960 960 960"
                    //   width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="m360-240 56-56-62-64h166v-80H354l62-64-56-56-160 160 160 160Zm240-160 160-160-160-160-56 56 62 64H440v80h166l-62 64 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                  <span
                    className={`w-full text-xl text-[var(--text-primary)] ${collapsed ? "hidden" : ""} ${isActive ? "text-white" : ""} `}
                  >
                    Transactions
                  </span>
                </>
              );
            }}
          </NavLink>
        </li>

        {/* budget */}
        <li className="flex justify-center">
          <NavLink
            to="/budget"
            className={({ isActive }) => {
              return `flex w-full items-center gap-4 rounded-full px-3 py-3 transition-all duration-200 ${collapsed ? "w-min justify-center p-3.5" : ""} ${isActive ? "bg-[var(--accent-primary)]" : "hover:bg-[var(--accent-primary-hover)]"} `;
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <svg
                    className={`h-8 fill-[var(--text-primary)] ${isActive ? "fill-white" : ""} `}
                    xmlns="http://www.w3.org/2000/svg"
                    //   height="24px"
                    viewBox="0 -960 960 960"
                    //   width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M336-120q-91 0-153.5-62.5T120-336q0-38 13-74t37-65l142-171-97-194h530l-97 194 142 171q24 29 37 65t13 74q0 91-63 153.5T624-120H336Zm144-200q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320Zm-95-360h190l40-80H345l40 80Zm-49 480h288q57 0 96.5-39.5T760-336q0-24-8.5-46.5T728-423L581-600H380L232-424q-15 18-23.5 41t-8.5 47q0 57 39.5 96.5T336-200Z" />
                  </svg>
                  <span
                    className={`w-full text-xl text-[var(--text-primary)] ${collapsed ? "hidden" : ""} ${isActive ? "text-white" : ""} `}
                  >
                    Budget
                  </span>
                </>
              );
            }}
          </NavLink>
        </li>

        {/* goals */}
        <li className="flex justify-center">
          <NavLink
            to="/goals"
            className={({ isActive }) => {
              return `flex w-full items-center gap-4 rounded-full px-3 py-3 transition-all duration-200 ${collapsed ? "w-min justify-center p-3.5" : ""} ${isActive ? "bg-[var(--accent-primary)]" : "hover:bg-[var(--accent-primary-hover)]"} `;
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <svg
                    className={`h-8 fill-[var(--text-primary)] ${isActive ? "fill-white" : ""} `}
                    xmlns="http://www.w3.org/2000/svg"
                    //   height="24px"
                    viewBox="0 -960 960 960"
                    //   width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM707-253q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Zm-397-57q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283-57q47-47 47-113t-47-113q-47-47-113-47t-113 47q-47 47-47 113t47 113q47 47 113 47t113-47Zm-169.5-56.5Q400-447 400-480t23.5-56.5Q447-560 480-560t56.5 23.5Q560-513 560-480t-23.5 56.5Q513-400 480-400t-56.5-23.5Z" />
                  </svg>
                  <span
                    className={`w-full text-xl text-[var(--text-primary)] ${collapsed ? "hidden" : ""} ${isActive ? "text-white" : ""}`}
                  >
                    Goals
                  </span>
                </>
              );
            }}
          </NavLink>
        </li>

        {/* analytics */}
        <li className="flex justify-center">
          <NavLink
            to="/analytics"
            className={({ isActive }) => {
              return `flex w-full items-center gap-4 rounded-full px-3 py-3 transition-all duration-200 ${collapsed ? "w-min justify-center p-3.5" : ""} ${isActive ? "bg-[var(--accent-primary)]" : "hover:bg-[var(--accent-primary-hover)]"} `;
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <svg
                    className={`h-8 fill-[var(--text-primary)] ${isActive ? "fill-white" : ""} `}
                    xmlns="http://www.w3.org/2000/svg"
                    //   height="24px"
                    viewBox="0 -960 960 960"
                    //   width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M80-120v-80h800v80H80Zm40-120v-280h120v280H120Zm200 0v-480h120v480H320Zm200 0v-360h120v360H520Zm200 0v-600h120v600H720Z" />
                  </svg>
                  <span
                    className={`w-full text-xl text-[var(--text-primary)] ${collapsed ? "hidden" : ""} ${isActive ? "text-white" : ""}`}
                  >
                    Analytics
                  </span>
                </>
              );
            }}
          </NavLink>
        </li>

        {/* settings */}
        <li className="flex justify-center">
          <NavLink
            to="/settings"
            className={({ isActive }) => {
              return `flex w-full items-center gap-4 rounded-full px-3 py-3 transition-all duration-200 ${collapsed ? "w-min justify-center p-3.5" : ""} ${isActive ? "bg-[var(--accent-primary)]" : "hover:bg-[var(--accent-primary-hover)]"} `;
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <svg
                    className={`h-8 fill-[var(--text-primary)] ${isActive ? "fill-white" : ""} `}
                    xmlns="http://www.w3.org/2000/svg"
                    //   height="24px"
                    viewBox="0 -960 960 960"
                    //   width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                  </svg>
                  <span
                    className={`w-full text-xl text-[var(--text-primary)] ${collapsed ? "hidden" : ""} ${isActive ? "text-white" : ""} `}
                  >
                    Settings
                  </span>
                </>
              );
            }}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;
