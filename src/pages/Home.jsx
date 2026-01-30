import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <h1>Welcome to News Portal</h1>
        <p>
          Your trusted source for the latest news.
          Admins manage content, users stay informed.
        </p>

        <div className="hero-buttons">
          <Link to="/login/admin">
            <button>Admin Login</button>
          </Link>
          <Link to="/login/user">
            <button className="secondary">User Login</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
