import "../styles/navbar.css";
import "../styles/sidebar.css";
import "../styles/dashboard.css";
import "../styles/goals.css";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Goals from "@/components/Goals";

export default function GoalsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="main-content">
          <div className="welcome-section">
            <h1>Goals</h1>
            <p>Track and achieve your goals</p>
          </div>

          <Goals />
        </main>
      </div>
    </div>
  );
}
