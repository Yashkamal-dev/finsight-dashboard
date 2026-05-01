import { Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <div className="flex flex-col md:grid md:auto-cols-[auto_1fr] md:grid-flow-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {/* routing here */}
        <Routes>
          {/* dashboard route */}
          <Route path="/" element={<Dashboard />} />

          {/* transaction route */}
          <Route path="/transactions" element={<Transactions />} />

          {/* budget route */}
          <Route path="/budget" element={<Budget />} />

          {/* goals route */}
          <Route path="/goals" element={<Goals />} />

          {/* analytics route */}
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
