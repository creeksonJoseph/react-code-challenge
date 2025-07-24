import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../App";

function GoalForm() {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${API}goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, savedAmount: 0 }),
    })
      .then((r) => r.json())
      .then(() => {
        navigate("/"); // back to dashboard
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-12 p-8 bg-[#141d38] text-[#fcdb32] shadow-2xl rounded-2xl border border-[#fcdb32] backdrop-blur-md"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">🎯 Set a New Goal</h2>

      <label className="block mb-2 text-sm font-semibold">Goal Name</label>
      <input
        type="text"
        placeholder="e.g. New Laptop"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-6 px-4 py-2 rounded-lg border border-[#fcdb32] bg-[#141d38] text-white focus:outline-none focus:ring-2 focus:ring-[#fcdb32]"
        required
      />

      <label className="block mb-2 text-sm font-semibold">
        Target Amount (KES)
      </label>
      <input
        type="number"
        placeholder="e.g. 50000"
        value={formData.targetAmount}
        onChange={(e) =>
          setFormData({ ...formData, targetAmount: parseFloat(e.target.value) })
        }
        className="w-full mb-6 px-4 py-2 rounded-lg border border-[#fcdb32] bg-[#141d38] text-white focus:outline-none focus:ring-2 focus:ring-[#fcdb32]"
        required
      />

      <label className="block mb-2 text-sm font-semibold">Deadline</label>
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-6 px-4 py-2 rounded-lg border border-[#fcdb32] bg-[#141d38] text-white focus:outline-none focus:ring-2 focus:ring-[#fcdb32]"
        required
      />

      <button
        type="submit"
        className="bg-[#fcdb32] text-[#141d38] font-bold hover:bg-yellow-400 transition-colors duration-200 py-3 px-6 rounded-lg w-full"
      >
        🚀 Save Goal
      </button>
    </form>
  );
}

export default GoalForm;
