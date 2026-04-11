import Navbar from "./layouts/Navbar";
import TopBar from "./layouts/TopBar";

const App = () => {
  return (
    <div className="grid auto-cols-[auto_1fr] grid-flow-col gap-2">
      <Navbar />
      <TopBar />
    </div>
  );
};

export default App;
