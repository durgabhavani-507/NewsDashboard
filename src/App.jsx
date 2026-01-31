import React from "react";
// import Auth from "./Auth";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import NewsDetails from "./pages/NewsDetails";

import UserDashboard from "./pages/UserDashboard";

function App() {
  const location = useLocation();
  // const [role, setRole] = useState(null);
  const [role, setRole] = useState(() => {
  return localStorage.getItem("role");
});

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user");

  const isLogin = location.pathname === "/login";

  return (
    <>
      {/* HEADER */}
      {!isLogin && (
        <Header
          role={role}
          setRole={setRole}
          isDashboard={isDashboard}
          onMenuClick={() => setSidebarOpen(true)}
        />
      )}

      {/* SIDEBAR → ONLY FOR ADMIN & USER */}
      {isDashboard && (
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className={`main-content ${isDashboard ? "with-sidebar" : ""}`}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setRole={setRole} />} />

          {/* DASHBOARD (PROTECTED) */}
          <Route
            path="/admin/*"
            element={
              role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Login setRole={setRole} />
              )
            }
          />
{/* 
          <Route path="/admin/*" element={<AdminDashboard />} />
<Route path="/user/*" element={<UserDashboard />} /> */}
          {/* <Route
            path="/user"
            element={
              role === "user" ? (
                <UserDashboard />
              ) : (
                <Login setRole={setRole} />
              )
            }
          /> */}
          <Route
  path="/user/*"
  element={
    role === "user" ? (
      <UserDashboard />
    ) : (
      <Login setRole={setRole} />
    )
  }
/>
{/* <Route path="view-news/:id" element={<NewsDetails newsList={newsList} />} /> */}


        </Routes>
      </main>

      {/* FOOTER */}
      {!isDashboard && !isLogin && <Footer />}
    </>
    
  );
}

export default App;
