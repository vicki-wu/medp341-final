import "./styles/navbar.css";
import "./styles/sidebar.css";
import "./styles/todo.css";
import "./styles/dashboard.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TodoList from "@/components/TodoList";
import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="main-content">
          <div className="welcome-section">
            <h1>Welcome back!</h1>
            <p>Here's your overview for today</p>
          </div>

          <div className="content-grid">
            <Calendar />
            <TodoList />
          </div>
        </main>
      </div>
    </div>
  );
}
