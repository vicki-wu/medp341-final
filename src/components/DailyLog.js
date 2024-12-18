"use client";
import React, { useState, useEffect } from "react";
import "../app/styles/dailylog.css";

export default function DailyLog() {
  const [entry, setEntry] = useState("");
  const [date, setDate] = useState("");
  const [savedEntries, setSavedEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [textFormat, setTextFormat] = useState({
    color: "#000000",
    fontFamily: "var(--font-inter)",
  });

  useEffect(() => {
    // Initialize today's date in a formatted way and set it to the state
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(formattedDate);

    // Retrieve saved journal entries from localStorage or initialize an empty object
    const storedEntries = JSON.parse(
      localStorage.getItem("journalEntries") || "{}"
    );

    // Migrate old saved entries to include formatting data if it doesn't already exist
    const migratedEntries = Object.keys(storedEntries).reduce((acc, key) => {
      acc[key] =
        typeof storedEntries[key] === "string"
          ? {
              text: storedEntries[key],
              format: {
                color: "#000000",
                fontFamily: "var(--font-inter)",
              },
            }
          : storedEntries[key];
      return acc;
    }, {});

    // Update the state with migrated entries and save them back to localStorage
    setSavedEntries(migratedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(migratedEntries));

    // If there's a journal entry for today, load it into the text area and set its formatting
    if (migratedEntries[formattedDate]) {
      const todayEntry = migratedEntries[formattedDate];
      setEntry(todayEntry.text);
      setTextFormat({
        color: todayEntry.format?.color || "#000000",
        fontFamily: todayEntry.format?.fontFamily || "var(--font-inter)",
      });
    }
  }, []);

  const handleSave = () => {
    // Save or update the journal entry for the current date with text and formatting
    const updatedEntries = {
      ...savedEntries,
      [date]: {
        text: entry,
        format: textFormat,
      },
    };
    // Store updated entries in localStorage and update the state
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setSavedEntries(updatedEntries);
    alert("Entry saved!");
  };

  const handleViewPreviousEntry = (selectedDate) => {
    // Load a previous journal entry and its formatting when a date is selected
    const entry = savedEntries[selectedDate];
    if (entry) {
      setEntry(entry.text);
      setTextFormat({
        color: entry.format?.color || "#000000",
        fontFamily: entry.format?.fontFamily || "var(--font-inter)",
      });
      setSelectedDate(selectedDate);
    }
  };

  const getTextStyle = () => {
    // Apply the selected text formatting (color and font family) dynamically
    return {
      color: textFormat.color,
      fontFamily: textFormat.fontFamily,
    };
  };

  const filteredEntries = Object.keys(savedEntries)
    // Sort saved entries by date in descending order
    .sort((a, b) => new Date(b) - new Date(a))
    // Filter entries based on the search term, matching either the date or entry text
    .filter(
      (entryDate) =>
        entryDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        savedEntries[entryDate].text
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  return (
    <div className="daily-log-container">
      <div className="side-panel">
        {/* Section displaying a list of previous journal entries */}
        <div className="panel-section previous-entries">
          <h3>Previous Entries</h3>
          {/* Input box to search through journal entries */}
          <input
            type="text"
            placeholder="Search entries..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="entries-scroll">
            {/* Show filtered journal entries or a message if none are found */}
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entryDate) => (
                <div
                  key={entryDate}
                  onClick={() => handleViewPreviousEntry(entryDate)}
                  className="previous-entry-item"
                >
                  <span className="entry-date">{entryDate}</span>
                  <span className="entry-preview">
                    {savedEntries[entryDate].text.substring(0, 50)}...
                  </span>
                </div>
              ))
            ) : (
              <div className="no-entries">
                {searchTerm
                  ? "No entries match your search"
                  : "No previous entries"}
              </div>
            )}
          </div>
        </div>
        {/* Section for selecting text formatting options */}
        <div className="panel-section formatting-section">
          <h3>Text Formatting</h3>
          <div className="formatting-controls">
            {/* Color picker to select text color */}
            <input
              type="color"
              value={textFormat.color}
              onChange={(e) =>
                setTextFormat({ ...textFormat, color: e.target.value })
              }
              title="Text Color"
            />
            {/* Dropdown to select font family */}
            <select
              value={textFormat.fontFamily}
              onChange={(e) =>
                setTextFormat({ ...textFormat, fontFamily: e.target.value })
              }
              title="Font Family"
            >
              <option value="var(--font-inter)">Inter</option>
              <option value="var(--font-playfair)">Playfair</option>
              <option value="monospace">Monospace</option>
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans-Serif</option>
            </select>
          </div>
        </div>
      </div>

      <div className="daily-log">
        <div className="daily-log-header">
          {/* Display the title and current date */}
          <h1>Daily Log {selectedDate && `- ${selectedDate}`}</h1>
          <p className="date">{date}</p>
        </div>

        <div className="journal-section">
          {/* Text area for writing the journal entry */}
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your thoughts for today..."
            className="journal-entry"
            style={getTextStyle()}
          />
        </div>

        {/* Save button to save the current journal entry */}
        {!selectedDate || selectedDate === date ? (
          <button onClick={handleSave} className="save-button">
            {selectedDate && selectedDate !== date
              ? "Update Entry"
              : "Save Entry"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
