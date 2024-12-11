"use client";
import { useState, useEffect } from "react";
import "../app/styles/dailylog.css";

export default function DailyLog() {
  const [entry, setEntry] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Set today's date in a readable format
    const today = new Date();
    setDate(
      today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const handleSave = () => {
    // For now, just save to localStorage
    const savedEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "{}"
    );
    savedEntries[date] = entry;
    localStorage.setItem("journalEntries", JSON.stringify(savedEntries));
    alert("Entry saved!");
  };

  return (
    <div className="daily-log">
      <div className="daily-log-header">
        <h1>Daily Log</h1>
        <p className="date">{date}</p>
      </div>

      <div className="journal-section">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts for today..."
          className="journal-entry"
        />
      </div>

      <button onClick={handleSave} className="save-button">
        Save Entry
      </button>
    </div>
  );
}
