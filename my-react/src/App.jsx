import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const addTransaction = () => {
    if (!category || !amount || !date) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: parseFloat(amount),
      date,
    };

    setTransactions([...transactions, newTransaction]);

    setCategory("");
    setAmount("");
    setDate("");
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((item) => item.id !== id)
    );
  };

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="container">
      <h1>Daily Expense Analytics Dashboard</h1>

      <div className="summary">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{totalExpense}</p>
        </div>

        <div className="card">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      <div className="form">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addTransaction}>
          Add Transaction
        </button>
      </div>

      <h2>Transaction History</h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>₹{item.amount}</td>
              <td>{item.date}</td>
              <td>
                <button
                  onClick={() =>
                    deleteTransaction(item.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Category Analytics</h2>

      {[...new Set(transactions.map((t) => t.category))].map(
        (cat) => {
          const total = transactions
            .filter((t) => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0);

          return (
            <div className="analytics" key={cat}>
              {cat}: ₹{total}
            </div>
          );
        }
      )}
    </div>
  );
}

export default App;