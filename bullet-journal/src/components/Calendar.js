"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../app/styles/calendar.css";

export default function CalendarComponent() {
  const [date, setDate] = useState(null);
  const [activeDate, setActiveDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });

  // Initialize dates after component mounts
  useEffect(() => {
    setDate(new Date());
    setActiveDate(new Date());

    // Get stored events
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("calendarEvents");
      setEvents(stored ? JSON.parse(stored) : {});
    }
  }, []);

  // Only render calendar when date is initialized
  if (!date || !activeDate) {
    return null; // or a loading spinner
  }

  // Saves a new event to localStorage and updates the state
  // Takes form submission event as parameter
  const saveEvent = (e) => {
    e.preventDefault();
    const dateStr = selectedDate.toISOString().split("T")[0];
    const updatedEvents = {
      ...events,
      [dateStr]: [...(events[dateStr] || []), newEvent],
    };

    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    setNewEvent({ name: "", description: "", color: "#3B82F6" });
    setShowEventModal(false);

    // Update the showEventDetails to display the new event
    setShowEventDetails({
      date: dateStr,
      events: updatedEvents[dateStr],
    });
  };

  // Removes an event from a specific date
  // Parameters: dateStr (ISO date string), eventIndex (position in events array)
  const deleteEvent = (dateStr, eventIndex) => {
    const updatedEvents = {
      ...events,
      [dateStr]: events[dateStr].filter((_, index) => index !== eventIndex),
    };

    // Remove the date key if no events remain
    if (updatedEvents[dateStr].length === 0) {
      delete updatedEvents[dateStr];
    }

    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));

    // Update the showEventDetails state with the new events list
    if (updatedEvents[dateStr] && updatedEvents[dateStr].length > 0) {
      setShowEventDetails({
        date: dateStr,
        events: updatedEvents[dateStr],
      });
    } else {
      // If no events left, close the modal
      setShowEventDetails(null);
    }
  };

  // Handles click events on calendar dates
  // If date has events, shows event details modal
  // If date has no events, shows add event modal
  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    const dateEvents = events[dateStr] || [];

    if (dateEvents.length > 0) {
      // If events exist, show event details
      setShowEventDetails({ date: dateStr, events: dateEvents });
    } else {
      // If no events, show add event modal
      setSelectedDate(date);
      setShowEventModal(true);
    }
  };

  // Renders event indicators/tiles on calendar dates that have events
  // Parameter: { date } - destructured date object from Calendar component
  // Returns: JSX for event tiles or null if no events
  const tileContent = ({ date }) => {
    const dateStr = date.toISOString().split("T")[0];
    const dateEvents = events[dateStr] || [];

    if (dateEvents.length > 0) {
      return (
        <div className="event-tiles">
          {dateEvents.map((event, index) => (
            <div
              key={index}
              className="event-tile"
              style={{ backgroundColor: event.color }}
              onClick={(e) => {
                e.preventDefault();
                setShowEventDetails({ date: dateStr, events: dateEvents });
              }}
            >
              {event.name}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendar-section">
      <div className="calendar-nav">
        <h2>
          {activeDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
      </div>
      <Calendar
        onChange={handleDateClick}
        value={date}
        className="custom-calendar"
        calendarType="gregory"
        minDetail="month"
        showNeighboringMonth={true}
        showFixedNumberOfWeeks={false}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: "short" }).slice(0, 3)
        }
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) setActiveDate(activeStartDate);
        }}
        tileContent={tileContent}
        tileClassName={({ date, view }) => {
          // Remove active and today styles
          return view === "month" ? "custom-tile" : null;
        }}
      />

      {/* Event Details Modal with Add Event Option */}
      {showEventDetails && (
        <div className="event-modal">
          <div className="event-modal-content">
            <h3>
              Events for {new Date(showEventDetails.date).toLocaleDateString()}
            </h3>
            <div className="event-list">
              {showEventDetails.events.map((event, index) => (
                <div
                  key={index}
                  className="event-detail-item"
                  style={{ borderLeft: `4px solid ${event.color}` }}
                >
                  <div className="event-detail-content">
                    <h4>{event.name}</h4>
                    {event.description && <p>{event.description}</p>}
                  </div>
                  <button
                    className="delete-event-btn"
                    onClick={() => deleteEvent(showEventDetails.date, index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="event-modal-buttons">
              <button
                type="button"
                onClick={() => {
                  setSelectedDate(new Date(showEventDetails.date));
                  setShowEventModal(true);
                }}
                style={{ backgroundColor: "#3b82f6", color: "white" }}
              >
                Add Event
              </button>
              <button type="button" onClick={() => setShowEventDetails(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showEventModal && (
        <div className="event-modal">
          <div className="event-modal-content">
            <h3>Add Event for {selectedDate.toLocaleDateString()}</h3>
            <form onSubmit={saveEvent}>
              <input
                type="text"
                placeholder="Event name"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
              <input
                type="color"
                value={newEvent.color}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, color: e.target.value })
                }
              />
              <div className="event-modal-buttons">
                <button type="submit">Add Event</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEventModal(false);
                    setNewEvent({
                      name: "",
                      description: "",
                      color: "#3B82F6",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
