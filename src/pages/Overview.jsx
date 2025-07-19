import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle, XCircle } from "lucide-react";

function daysLeft(deadline) {
  const now = new Date();
  const end = new Date(deadline);
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

function Overview() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then(setGoals);
  }, []);

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter(
    (g) => g.savedAmount >= g.targetAmount
  ).length;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 my-10 mx-auto max-w-3xl text-gray-800">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Financial Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-xl shadow">
          <p className="text-sm text-blue-800">Total Goals</p>
          <h3 className="text-xl font-bold">{totalGoals}</h3>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow">
          <p className="text-sm text-green-800">Total Saved</p>
          <h3 className="text-xl font-bold">${totalSaved.toLocaleString()}</h3>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl shadow">
          <p className="text-sm text-purple-800">Completed Goals</p>
          <h3 className="text-xl font-bold">{completedGoals}</h3>
        </div>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <CalendarDays size={20} className="text-gray-500" />
        Goal Deadlines
      </h3>

      <ul className="space-y-3">
        {goals.map((g) => {
          const left = daysLeft(g.deadline);
          const isComplete = g.savedAmount >= g.targetAmount;

          let deadlineText = "";
          let icon = null;
          let color = "";

          if (isComplete) {
            deadlineText = "Completed";
            icon = <CheckCircle className="text-green-600" size={18} />;
          } else if (left < 0) {
            deadlineText = `Overdue by ${-left} days`;
            icon = <XCircle className="text-red-600" size={18} />;
            color = "text-red-600";
          } else {
            deadlineText = `${left} days left`;
            color = left <= 30 ? "text-yellow-600" : "text-gray-700";
          }

          return (
            <li
              key={g.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div>
                <strong>{g.name}</strong>
                <p className={`text-sm ${color}`}>{deadlineText}</p>
              </div>
              {icon}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
