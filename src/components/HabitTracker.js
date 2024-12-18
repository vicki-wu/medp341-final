"use client";
import { useState, useEffect } from "react";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  // Get current week dates
  const getCurrentWeekDates = () => {
    // Generates an array of dates for the current week
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i);
      dates.push(date);
    }
    return dates;
  };

  // Load habits from localStorage
  useEffect(() => {
    // Retrieves stored habits from localStorage on component mount
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  // Save habits to localStorage
  const saveHabits = (updatedHabits) => {
    // Saves updated habits to localStorage and updates state
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setHabits(updatedHabits);
  };

  const addHabit = (e) => {
    // Adds a new habit if the Enter key is pressed or input is blurred
    if (e?.key && e.key !== "Enter") return;

    if (newHabit.trim()) {
      const weekDates = getCurrentWeekDates();
      const completionStatus = {};
      weekDates.forEach((date) => {
        // Initializes completion status for each date in the week
        completionStatus[date.toISOString().split("T")[0]] = false;
      });

      const newHabitObj = {
        name: newHabit.trim(),
        completionStatus,
      };

      saveHabits([...habits, newHabitObj]);
      setNewHabit("");
      setIsAddingHabit(false);
    }
  };

  const toggleHabitCompletion = (habitIndex, dateStr) => {
    // Toggles the completion status of a habit for a specific date
    const updatedHabits = habits.map((habit, index) => {
      if (index === habitIndex) {
        return {
          ...habit,
          completionStatus: {
            ...habit.completionStatus,
            [dateStr]: !habit.completionStatus[dateStr],
          },
        };
      }
      return habit;
    });
    saveHabits(updatedHabits);
  };

  const deleteHabit = (habitIndex) => {
    // Deletes a habit from the list
    const updatedHabits = habits.filter((_, index) => index !== habitIndex);
    saveHabits(updatedHabits);
  };

  return (
    <div className="todo-section">
      <div className="todo-header">
        <h2>Weekly Habits</h2>
        <button className="add-task-btn" onClick={() => setIsAddingHabit(true)}>
          +
        </button>
      </div>

      <div className="habit-tracker">
        {/* Header row with dates */}
        <div className="habit-grid">
          <div className="habit-cell header-cell">Habit</div>
          {getCurrentWeekDates().map((date, index) => (
            <div key={index} className="habit-cell header-cell">
              <div>
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div>{date.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Add new habit input */}
        {isAddingHabit && (
          <div className="habit-grid">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyDown={addHabit}
              onBlur={addHabit}
              placeholder="Enter new habit"
              autoFocus
              className="habit-cell"
            />
          </div>
        )}

        {/* Habit rows */}
        {habits.map((habit, habitIndex) => (
          <div key={habitIndex} className="habit-grid">
            <div className="habit-cell habit-name">
              {habit.name}
              <button
                className="delete-habit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHabit(habitIndex);
                }}
              >
                ×
              </button>
            </div>
            {getCurrentWeekDates().map((date, dateIndex) => {
              const dateStr = date.toISOString().split("T")[0];
              return (
                <div
                  key={dateIndex}
                  className={`habit-cell checkbox-cell ${
                    habit.completionStatus[dateStr] ? "completed" : ""
                  }`}
                  onClick={() => toggleHabitCompletion(habitIndex, dateStr)}
                >
                  {habit.completionStatus[dateStr] ? "✓" : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
