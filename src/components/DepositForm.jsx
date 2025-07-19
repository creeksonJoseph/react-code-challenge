import { useState } from "react";

function DepositForm({ goal, onDeposit }) {
  const [amount, setAmount] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        savedAmount: Number(goal.savedAmount) + Number(amount),
      }),
    })
      .then((r) => r.json())
      .then(onDeposit);
    setAmount("");
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "inline-block", marginRight: 8 }}
    >
      <input
        type="number"
        value={amount}
        min="1"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Deposit"
        required
        style={{ width: 80, marginRight: 4, padding: 4 }}
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
