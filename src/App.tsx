import { Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="grid auto-cols-[auto_1fr] grid-flow-col">
      <Navbar />

      {/* routing here */}
      <Routes>
        {/* dashboard route */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
