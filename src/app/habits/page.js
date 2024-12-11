import "../styles/navbar.css";
import "../styles/sidebar.css";
import "../styles/todo.css";
import "../styles/dashboard.css";
import "../styles/habitTracker.css";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MoodTracker from "@/components/MoodTracker";
import HabitTracker from "@/components/HabitTracker";

export default function HabitsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="main-content">
          <div className="welcome-section">
            <h1>Habit/Mood Tracker</h1>
            <p>Track your moods and habits</p>
          </div>

          <div className="content-grid">
            <MoodTracker />
            <HabitTracker />
          </div>
        </main>
      </div>
    </div>
  );
}
