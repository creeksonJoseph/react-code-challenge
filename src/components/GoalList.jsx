import { useState } from "react";
import ProgressBar from "./ProgressBar";
import DepositForm from "./DepositForm";
import { API } from "../App";

function GoalList({ goals, onDelete, onDeposit, onEdit }) {
  return (
    <ul className="max-w-5xl mx-auto p-4 space-y-8">
      {goals.map((goal) => (
        <li
          key={goal.id}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-l-4 border-yellow-400"
        >
          {/* Header: Title & Category */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#141d38]">{goal.name}</h2>
            <span className="text-sm font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              {goal.category}
            </span>
          </div>

          {/* Amounts: Saved / Target */}
          <div className="text-gray-700 text-sm">
            <span className="font-semibold text-green-600">
              ${goal.savedAmount.toLocaleString()}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#141d38]">
              ${goal.targetAmount.toLocaleString()}
            </span>
          </div>

          {/* Progress */}
          <ProgressBar current={goal.savedAmount} target={goal.targetAmount} />

          {/* Remaining + Deadline */}
          <div className="flex flex-wrap justify-between text-sm text-gray-600">
            <p>
              Remaining:{" "}
              <span className="text-red-500 font-medium">
                $
                {Math.max(
                  goal.targetAmount - goal.savedAmount,
                  0
                ).toLocaleString()}
              </span>
            </p>
            <p>
              Deadline:{" "}
              <span className="text-blue-600 font-medium">
                {goal.deadline || "No deadline"}
              </span>
            </p>
          </div>

          {/* Deposit & Edit Forms */}
          <DepositForm goal={goal} onDeposit={onDeposit} />
          <EditGoalForm goal={goal} onEdit={onEdit} />

          {/* Delete Button */}
          <button
            onClick={() => onDelete(goal.id)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md w-fit"
          >
            Delete Goal
          </button>
        </li>
      ))}
    </ul>
  );
}

function EditGoalForm({ goal, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedGoal = {
      name: form.name.trim(),
      targetAmount: Number(form.targetAmount),
      category: form.category.trim(),
      deadline: form.deadline,
    };

    // Basic validation
    if (
      !updatedGoal.name ||
      !updatedGoal.targetAmount ||
      !updatedGoal.category ||
      !updatedGoal.deadline
    ) {
      alert("Please fill in all fields");
      return;
    }

    fetch(`${API}goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    })
      .then((r) => r.json())
      .then((data) => {
        onEdit(data);
        setEditing(false);
      });
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-sm text-blue-600 hover:underline"
      >
        Edit Goal
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row flex-wrap gap-3 mt-3"
    >
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="flex-1 border px-3 py-2 rounded-md text-sm"
        required
      />
      <input
        type="number"
        name="targetAmount"
        value={form.targetAmount}
        onChange={handleChange}
        placeholder="Target Amount"
        className="flex-1 border px-3 py-2 rounded-md text-sm"
        required
        min="1"
      />
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="flex-1 border px-3 py-2 rounded-md text-sm"
        required
      />
      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        className="flex-1 border px-3 py-2 rounded-md text-sm"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-sm text-gray-500 underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default GoalList;
