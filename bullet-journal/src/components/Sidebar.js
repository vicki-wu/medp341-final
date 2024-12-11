"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-wrapper">
          <Image
            src="/notebook.png"
            alt="Bulletry Logo"
            width={36}
            height={36}
            className="navbar-logo"
          />
        </div>
        <div className="brand-name">Bulletry</div>
      </div>

      <nav className="sidebar-nav">
        <Link
          href="/"
          className={`sidebar-item ${isActive("/") ? "active" : ""}`}
        >
          <span className="sidebar-icon">📋</span>
          Home
        </Link>

        <Link
          href="/daily-log"
          className={`sidebar-item ${isActive("/daily-log") ? "active" : ""}`}
        >
          <span className="sidebar-icon">📝</span>
          Daily Log
        </Link>
        <Link
          href="/doodle"
          className={`sidebar-item ${isActive("/doodle") ? "active" : ""}`}
        >
          <span className="sidebar-icon">✏️</span>
          Doodle
        </Link>
        <Link
          href="/habits"
          className={`sidebar-item ${isActive("/habits") ? "active" : ""}`}
        >
          <span className="sidebar-icon">📊</span>
          Tracker
        </Link>
        <Link
          href="/goals"
          className={`sidebar-item ${isActive("/goals") ? "active" : ""}`}
        >
          <span className="sidebar-icon">🎯</span>
          Goals
        </Link>
      </nav>
    </aside>
  );
}
