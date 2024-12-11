"use client";
import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState("");

  // Handles adding a new task to the list
  // Triggered by pressing Enter or losing focus on the input
  const handleAddTask = (e) => {
    if (e?.key && e.key !== "Enter") return; // Only proceed if Enter is pressed

    if (newTask.trim()) {
      // Check if the input is not empty
      // Add the new task to the list and reset input
      setTasks((prev) => [...prev, { text: newTask.trim(), completed: false }]);
      setNewTask("");
      setIsAdding(false);
    }
  };

  // Toggles the completed status of a task
  // Parameter: index of the task to toggle
  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-section">
      <div className="todo-header">
        <h2>Today's Tasks</h2>
        {/* Button to show the input for adding a new task */}
        <button className="add-task-btn" onClick={() => setIsAdding(true)}>
          +
        </button>
      </div>

      <div className="todo-list">
        {isAdding && (
          <div className="todo-item">
            {/* Input field for entering a new task */}
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleAddTask}
              onBlur={handleAddTask}
              placeholder="Enter your task"
              autoFocus
              className="w-full p-2 rounded border border-gray-200 focus:outline-none focus:border-gray-400"
            />
          </div>
        )}

        {/* Render each task with a checkbox to toggle completion */}
        {tasks.map((task, index) => (
          <div key={index} className="todo-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <span
              className={task.completed ? "completed" : ""}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
