import { Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

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
      </Routes>
    </div>
  );
};

export default App;
