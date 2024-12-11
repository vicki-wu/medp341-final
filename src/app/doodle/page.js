import "../styles/navbar.css";
import "../styles/sidebar.css";
import "../styles/dashboard.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Doodle from "@/components/Doodle";

export default function DoodlePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="main-content">
          <div className="content-grid">
            <Doodle />
          </div>
        </main>
      </div>
    </div>
  );
}
