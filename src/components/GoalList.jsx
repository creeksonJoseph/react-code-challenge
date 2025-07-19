import { useState } from "react";
import ProgressBar from "./ProgressBar";
import DepositForm from "./DepositForm";

function GoalList({ goals, onDelete, onDeposit, onEdit }) {
  return (
    <ul className="max-w-3xl mx-auto p-4 space-y-6">
      {goals.map((g) => (
        <li
          key={g.id}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">{g.name}</h3>
            <span className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
              {g.category}
            </span>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium text-green-600">
              ${g.savedAmount.toLocaleString()}
            </span>{" "}
            / ${g.targetAmount.toLocaleString()}
          </div>

          <ProgressBar current={g.savedAmount} target={g.targetAmount} />

          <div className="text-sm text-gray-500">
            Remaining:{" "}
            <span className="text-red-500">
              ${Math.max(g.targetAmount - g.savedAmount, 0).toLocaleString()}
            </span>
          </div>

          <DepositForm goal={g} onDeposit={onDeposit} />
          <EditGoalForm goal={g} onEdit={onEdit} />

          <button
            onClick={() => onDelete(g.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg self-start"
          >
            Delete
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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        targetAmount: Number(form.targetAmount),
        category: form.category,
        deadline: form.deadline,
      }),
    })
      .then((r) => r.json())
      .then((updatedGoal) => {
        onEdit(updatedGoal);
        setEditing(false);
      });
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-blue-600 hover:underline text-sm"
      >
        Edit
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row sm:flex-wrap gap-2 items-start mt-2"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Name"
        className="border px-2 py-1 rounded-md"
      />
      <input
        name="targetAmount"
        type="number"
        value={form.targetAmount}
        onChange={handleChange}
        required
        placeholder="Target"
        className="border px-2 py-1 rounded-md"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        placeholder="Category"
        className="border px-2 py-1 rounded-md"
      />
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
        required
        className="border px-2 py-1 rounded-md"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded-md"
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => setEditing(false)}
        className="text-gray-500 underline"
      >
        Cancel
      </button>
    </form>
  );
}

export default GoalList;
