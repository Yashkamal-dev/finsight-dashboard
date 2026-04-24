import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import TransactionContext from "./context/TransactionContext.tsx";
import GoalContext from "./context/GoalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GoalContext>
        <TransactionContext>
          <App />
        </TransactionContext>
      </GoalContext>
    </BrowserRouter>
  </StrictMode>,
);
