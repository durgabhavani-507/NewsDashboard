import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isUser = location.pathname.startsWith("/user");

  return (
    <aside className="dashboard-sidebar">
      <nav className="sidebar-nav">

        {/* ===== ADMIN SIDEBAR ===== */}
        {isAdmin && (
          <>
            <Link to="/admin#contact-messages" className="sidebar-item">
              <span className="icon">✉️</span>
              <span className="text">Contact Messages</span>
            </Link>

            <Link to="/admin#pending-news" className="sidebar-item">
              <span className="icon">⏳</span>
              <span className="text">Pending News</span>
            </Link>

            <Link to="/admin#published-news" className="sidebar-item">
              <span className="icon">📰</span>
              <span className="text">Published News</span>
            </Link>
          </>
        )}

        {/* ===== USER SIDEBAR ===== */}
        {isUser && (
          <>
            {/* <Link to="/user#add-news" className="sidebar-item">
              <span className="icon">➕</span>
              <span className="text">Add News</span>
            </Link>

            <Link to="/user#view-news" className="sidebar-item">
              <span className="icon">👁️</span>
              <span className="text">View News</span>
            </Link> */}
            <Link to="/user/view-news" className="sidebar-item">
  <span className="icon">👁️</span>
  <span className="text">View News</span>
</Link>

<Link to="/user/add-news" className="sidebar-item">
  <span className="icon">➕</span>
  <span className="text">Add News</span>
</Link>

          </>
        )}

      </nav>
    </aside>
  );
}

export default Sidebar;
