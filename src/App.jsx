import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import GoalForm from "./components/GoalForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0e0f11] text-white font-sans">
        <header className="bg-[#111216] shadow-lg py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">
            Smart Goal Planner
          </h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:text-blue-400 transition">
              Dashboard
            </Link>
            <Link to="/overview" className="hover:text-blue-400 transition">
              Overview
            </Link>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/goalForm" element={<GoalForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
