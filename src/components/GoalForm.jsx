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
        navigate("/"); // go back to dashboard after adding
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-xl"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Add a New Goal</h2>

      <input
        type="text"
        placeholder="Goal Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full border p-2 rounded mb-4"
        required
      />

      <input
        type="number"
        placeholder="Target Amount"
        value={formData.targetAmount}
        onChange={(e) =>
          setFormData({ ...formData, targetAmount: parseFloat(e.target.value) })
        }
        className="w-full border p-2 rounded mb-4"
        required
      />

      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full border p-2 rounded mb-4"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
      >
        Save Goal
      </button>
    </form>
  );
}

export default GoalForm;
