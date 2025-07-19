import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 💥 NEW
import GoalList from "../components/GoalList";

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate(); // 🔥

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then(setGoals);
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:3000/goals/${id}`, { method: "DELETE" }).then(() =>
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Goals</h1>
        <button
          onClick={() => navigate("/goalForm")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow"
        >
          + Add Goal
        </button>
      </div>

      <GoalList
        goals={goals}
        onDelete={handleDelete}
        onDeposit={handleDeposit}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Dashboard;
