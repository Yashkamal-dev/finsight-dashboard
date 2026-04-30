import { Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <div className="grid auto-cols-[auto_1fr] grid-flow-col">
      <Navbar />

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
    </div>
  );
};

export default App;
