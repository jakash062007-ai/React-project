import { useState } from "react";
import "./App.css";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("Pending");

  const addAssignment = () => {
    if (!title || !subject) return;

    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        title,
        subject,
        status,
      },
    ]);

    setTitle("");
    setSubject("");
    setStatus("Pending");
  };

  return (
    <div className="container">
      <h1>Assignment Tracker</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Submitted</option>
          <option>Late</option>
        </select>

        <button onClick={addAssignment}>Add Assignment</button>
      </div>

      <div className="summary">
        <h3>Total: {assignments.length}</h3>
        <h3>
          Submitted:{" "}
          {assignments.filter((a) => a.status === "Submitted").length}
        </h3>
        <h3>
          Pending:{" "}
          {assignments.filter((a) => a.status === "Pending").length}
        </h3>
        <h3>
          Late: {assignments.filter((a) => a.status === "Late").length}
        </h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.subject}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;