"use client";
import { useState, useEffect } from "react";

export default function Goals() {
  const [goals, setGoals] = useState({
    shortTerm: [],
    monthly: [],
    yearly: [],
  });
  const [newGoal, setNewGoal] = useState("");
  const [activeCategory, setActiveCategory] = useState("shortTerm");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Loads stored goals from localStorage on component mount
    const storedGoals = localStorage.getItem("userGoals");
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  const saveGoals = (updatedGoals) => {
    // Saves updated goals to localStorage and updates state
    localStorage.setItem("userGoals", JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const addGoal = (e) => {
    e.preventDefault();
    // Adds a new goal to the active category if input is not empty
    if (newGoal.trim()) {
      const updatedGoals = {
        ...goals,
        [activeCategory]: [
          ...goals[activeCategory],
          {
            text: newGoal.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
      saveGoals(updatedGoals);
      setNewGoal("");
      setIsAdding(false);
    }
  };

  const toggleGoal = (category, index) => {
    // Toggles the completion status of a goal
    const updatedGoals = {
      ...goals,
      [category]: goals[category].map((goal, i) =>
        i === index ? { ...goal, completed: !goal.completed } : goal
      ),
    };
    saveGoals(updatedGoals);
  };

  const deleteGoal = (category, index) => {
    // Deletes a goal from the specified category
    const updatedGoals = {
      ...goals,
      [category]: goals[category].filter((_, i) => i !== index),
    };
    saveGoals(updatedGoals);
  };

  const categories = {
    shortTerm: { name: "Short Term Goals", icon: "🎯" },
    monthly: { name: "Monthly Goals", icon: "📅" },
    yearly: { name: "Yearly Goals", icon: "✨" },
  };

  return (
    <div className="goals-container">
      <div className="goals-section">
        {Object.entries(categories).map(([key, { name, icon }]) => (
          <div key={key} className="goals-category" data-category={key}>
            <div className="goals-header">
              <h2>
                <span className="goals-nav-icon">{icon}</span>
                {name}
              </h2>
              <button
                className="add-goal-btn"
                onClick={() => {
                  // Sets the active category and opens the goal input form
                  setActiveCategory(key);
                  setIsAdding(true);
                }}
              >
                +
              </button>
            </div>

            <div className="goals-list">
              {isAdding && activeCategory === key && (
                <form onSubmit={addGoal} className="add-goal-form">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Enter your goal"
                    autoFocus
                  />
                  <div className="goal-form-buttons">
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => setIsAdding(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {goals[key].map((goal, index) => (
                <div key={index} className="goal-item">
                  <div className="goal-content">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal(key, index)}
                    />
                    <span className={goal.completed ? "completed" : ""}>
                      {goal.text}
                    </span>
                  </div>
                  <button
                    className="delete-goal-btn"
                    onClick={() => deleteGoal(key, index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
