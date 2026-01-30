import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { auth } from "../firebase";
import { Routes, Route } from "react-router-dom";

import { getNews } from "../services/newsApi";
import { auth } from "../firebase";

import Pagination from "../components/Pagination";

const PAGE_SIZE = 6;

export default function UserDashboard() {
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
const [user, setUser] = useState(null);

  // const location = useLocation();
  // const hash = location.hash;

  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
  });

  // useEffect(() => {
  //   loadNews();
  // }, []);

  useEffect(() => {
  loadNews();

  const currentUser = auth.currentUser;
  if (currentUser) {
    setUser(currentUser);
  }
}, []);

  async function loadNews() {
    const data = await getNews();
    setNewsList(data || []);
  }

  /* ================= ADD NEWS (REQUEST) ================= */
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.description || !form.author || !form.category) {
      alert("Fill all fields");
      return;
    }

    const pendingNews =
      JSON.parse(localStorage.getItem("pendingNews")) || [];

    pendingNews.unshift({
      ...form,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("pendingNews", JSON.stringify(pendingNews));

    alert("News sent to Admin for approval");

    setForm({
      title: "",
      description: "",
      author: "",
      category: "",
    });
  }

  const totalPages = Math.ceil(newsList.length / PAGE_SIZE);
  const currentNews = newsList.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
   <div className="page-container">

  <Routes>

    {/* DEFAULT → USER PROFILE */}
    <Route
      index
      element={
        user && (
          <div className="profile-wrapper">
            <div className="profile-card-dark">
              <div className="profile-header">
                <div className="profile-avatar">👤</div>
                <h2>User Profile</h2>
                <p className="profile-sub">NewsHub Member</p>
              </div>

              <div className="profile-body">
                <div className="profile-item">
                  <span>Email</span>
                  <strong>{user.email}</strong>
                </div>

                <div className="profile-item">
                  <span>User ID</span>
                  <small>{user.uid}</small>
                </div>

                <div className="profile-item">
                  <span>Provider</span>
                  <strong>{user.providerData[0]?.providerId}</strong>
                </div>

                <div className="profile-item">
                  <span>Role</span>
                  <strong>User</strong>
                </div>
              </div>

              <div className="profile-footer">
                <span className="status-dot"></span>
                Logged In
              </div>
            </div>
          </div>
        )
      }
    />

    {/* ADD NEWS */}
    <Route
      path="add-news"
      element={
        <form className="news-form" onSubmit={handleSubmit}>
          <h3>Add News (Admin Approval Required)</h3>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            rows="4"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <button className="btn primary">Send for Approval</button>
        </form>
      }
    />

    {/* VIEW NEWS */}
    <Route
      path="view-news"
      element={
        <>
          <div className="dashboard-center">
            <div className="dashboard-grid">
              {currentNews.map((news) => (
                <div className="dashboard-card" key={news.id}>
                  <h3>{news.title}</h3>
                  <p>{news.description?.slice(0, 90)}...</p>

                  <button
                    className="btn primary"
                    onClick={() => setSelectedNews(news)}
                  >
                    View News
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      }
    />

  </Routes>

  {/* MODAL */}
  {selectedNews && (
    <div className="modal-overlay" onClick={() => setSelectedNews(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{selectedNews.title}</h2>
        <p>{selectedNews.description}</p>
        <button onClick={() => setSelectedNews(null)}>Close</button>
      </div>
    </div>
  )}

</div>
  )}