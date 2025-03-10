import React, { useState } from "react";

const App = () => {
  
  const [tasks, setTasks] = useState([]);
 
  const [newTask, setNewTask] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear the input field
    }
  };

  // Function to remove a task by index
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>To-Do List App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={addTask} style={{ padding: "5px 10px" }}>
          Add Task
        </button>
      </div>

      {/* Conditional rendering for empty task list */}
      {tasks.length === 0 ? (
        <p>No tasks available. Add a task to get started!</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <span>{task}</span>
              <button
                onClick={() => removeTask(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;