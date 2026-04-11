import Navbar from "./layouts/Navbar";
import TopBar from "./layouts/TopBar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="grid auto-cols-[auto_1fr] grid-flow-col">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;
