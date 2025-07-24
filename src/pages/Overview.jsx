import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle, XCircle } from "lucide-react";
import { API } from "../App";

function daysLeft(deadline) {
  const now = new Date();
  const end = new Date(deadline);
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

function Overview() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`${API}goals`)
      .then((r) => r.json())
      .then(setGoals);
  }, []);

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter(
    (g) => g.savedAmount >= g.targetAmount
  ).length;

  return (
    <div className="bg-[#141d38] text-[#fcdb32] rounded-2xl shadow-lg w-full p-8 border border-[#fcdb32]">
      <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">
        💰 Financial Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8">
        <div className="bg-[#1d294b] p-6 rounded-xl shadow-md border border-[#fcdb32]">
          <p className="text-sm font-semibold opacity-80">Total Goals</p>
          <h3 className="text-2xl font-bold mt-2">{totalGoals}</h3>
        </div>

        <div className="bg-[#1d294b] p-6 rounded-xl shadow-md border border-[#fcdb32]">
          <p className="text-sm font-semibold opacity-80">Total Saved</p>
          <h3 className="text-2xl font-bold mt-2">
            KES {totalSaved.toLocaleString()}
          </h3>
        </div>

        <div className="bg-[#1d294b] p-6 rounded-xl shadow-md border border-[#fcdb32]">
          <p className="text-sm font-semibold opacity-80">Completed Goals</p>
          <h3 className="text-2xl font-bold mt-2">{completedGoals}</h3>
        </div>
      </div>

      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <CalendarDays size={20} className="text-[#fcdb32]" />
        Goal Deadlines
      </h3>

      <ul className="space-y-4">
        {goals.map((g) => {
          const left = daysLeft(g.deadline);
          const isComplete = g.savedAmount >= g.targetAmount;

          let deadlineText = "";
          let icon = null;
          let color = "";

          if (isComplete) {
            deadlineText = "Completed";
            icon = <CheckCircle className="text-green-500" size={20} />;
            color = "text-green-400";
          } else if (left < 0) {
            deadlineText = `Overdue`;
            icon = <XCircle className="text-red-500" size={20} />;
            color = "text-red-400";
          } else {
            deadlineText = `${left} day${left !== 1 ? "s" : ""} left`;
            color = left <= 30 ? "text-yellow-400" : "text-white";
          }

          return (
            <li
              key={g.id}
              className="flex items-center justify-between bg-[#1d294b] border border-[#fcdb32] px-5 py-4 rounded-lg"
            >
              <div>
                <p className="font-semibold">{g.name}</p>
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
