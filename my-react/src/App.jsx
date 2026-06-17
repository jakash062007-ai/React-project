import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Food");

  const addTransaction = () => {
    if (!desc || !amount) {
      alert("Please enter all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      desc,
      amount: Number(amount),
      type,
      category,
    };

    setTransactions([...transactions, newTransaction]);

    setDesc("");
    setAmount("");
  };

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="container">
      <h1>Daily Expense Dashboard</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Salary</option>
          <option>Other</option>
        </select>

        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <div className="summary">
        <h3>Total Income: ₹{totalIncome}</h3>
        <h3>Total Expense: ₹{totalExpense}</h3>
        <h3>Balance: ₹{balance}</h3>
      </div>

      <h2>Transaction History</h2>

      <ul>
        {transactions.map((item) => (
          <li key={item.id}>
            {item.desc} - ₹{item.amount} | {item.category} | {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;