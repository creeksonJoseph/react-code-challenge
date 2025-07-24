import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalList from "../components/GoalList";
import { API } from "../App";

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}goals`)
      .then((r) => r.json())
      .then(setGoals);
  }, []);

  function handleDelete(id) {
    fetch(`${API}goals/${id}`, { method: "DELETE" }).then(() =>
      setGoals(goals.filter((g) => g.id !== id))
    );
  }

  function handleDeposit(updatedGoal) {
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
  }

  function handleEdit(updatedGoal) {
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
  }

  return (
    <div className="min-h-screen p-6 bg-[#141d38] text-[#fcdb32]">
      <div className="flex justify-between items-center mb-8 border-b border-[#fcdb32] pb-4">
        <h1 className="text-3xl font-bold tracking-wide">🎯 My Goals</h1>
        <button
          onClick={() => navigate("/goalForm")}
          className="bg-[#fcdb32] text-[#141d38] font-semibold hover:bg-yellow-400 transition-colors duration-200 py-2 px-5 rounded-lg shadow-lg"
        >
          + Add Goal
        </button>
      </div>

      {goals.length > 0 ? (
        <GoalList
          goals={goals}
          onDelete={handleDelete}
          onDeposit={handleDeposit}
          onEdit={handleEdit}
        />
      ) : (
        <div className="text-center text-lg mt-20 opacity-70">
          You haven’t added any goals yet. Let’s change that! 💪
        </div>
      )}
    </div>
  );
}

export default Dashboard;
