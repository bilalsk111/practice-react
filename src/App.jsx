import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Saved from "./pages/Saved";

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </div>
  );
};

export default App;
