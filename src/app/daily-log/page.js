import "../styles/navbar.css";
import "../styles/sidebar.css";
import "../styles/dashboard.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import DailyLog from "@/components/DailyLog";

export default function DailyLogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="main-content">
          <DailyLog />
        </main>
      </div>
    </div>
  );
}
