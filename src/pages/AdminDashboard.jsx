import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { getNews, addNews, deleteNews,updateNews } from "../services/newsApi";
// import { updateNews } from "../services/newsApi"; // add at top

import Pagination from "../components/Pagination";

const PAGE_SIZE = 6;

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);

  const [newsList, setNewsList] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [pendingNews, setPendingNews] = useState([]);
  const [page, setPage] = useState(1);

  const [editingNews, setEditingNews] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
  });

  const location = useLocation();
  const hash = location.hash;

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setAdmin(currentUser);
    }
    loadAll();
  }, []);

  function loadAll() {
    loadNews();
    setContactMessages(
      JSON.parse(localStorage.getItem("contactMessages")) || []
    );
    setPendingNews(
      JSON.parse(localStorage.getItem("pendingNews")) || []
    );
  }

  async function loadNews() {
    const data = await getNews();
    setNewsList(data || []);
  }

  /* ================= APPROVE NEWS ================= */
  async function approveNews(index) {
    const news = pendingNews[index];
    await addNews(news);

    const updated = pendingNews.filter((_, i) => i !== index);
    setPendingNews(updated);
    localStorage.setItem("pendingNews", JSON.stringify(updated));

    loadNews();
  }

  /* ================= REJECT NEWS ================= */
  function rejectNews(index) {
    if (!window.confirm("Reject this news?")) return;

    const updated = pendingNews.filter((_, i) => i !== index);
    setPendingNews(updated);
    localStorage.setItem("pendingNews", JSON.stringify(updated));
  }

  /* ================= DELETE CONTACT ================= */
  function deleteContact(index) {
    const updated = contactMessages.filter((_, i) => i !== index);
    setContactMessages(updated);
    localStorage.setItem("contactMessages", JSON.stringify(updated));
  }

  /* ================= EDIT NEWS ================= */
  function startEdit(news) {
    setEditingNews(news);
    setEditForm({
      title: news.title,
      description: news.description,
    });
  }

  // function saveEdit() {
  //   const updated = newsList.map((n) =>
  //     n.id === editingNews.id ? { ...n, ...editForm } : n
  //   );

  //   setNewsList(updated);
  //   setEditingNews(null);
  // }

  async function saveEdit() {
  try {
    await updateNews(editingNews.id, {
      ...editingNews,
      ...editForm,
    });

    setEditingNews(null);
    loadNews(); // reload from backend
  } catch (err) {
    console.error(err);
    alert("Edit failed");
  }
}


  const totalPages = Math.ceil(newsList.length / PAGE_SIZE);
  const currentNews = newsList.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="admin-page page-container admin-dashboard">

      {/* ===== ADMIN PROFILE (DEFAULT VIEW) ===== */}
      {!hash && admin && (
        <div className="profile-wrapper">
          <div className="profile-card-dark">
            <div className="profile-header">
              <div className="profile-avatar">🛡️</div>
              <h2>Admin Profile</h2>
              <p className="profile-sub">NewsHub Administrator</p>
            </div>

            <div className="profile-body">
              <div className="profile-item">
                <span>Email</span>
                <strong>{admin.email}</strong>
              </div>

              <div className="profile-item">
                <span>Admin ID</span>
                <strong>{admin.uid}</strong>
              </div>

              <div className="profile-item">
                <span>Provider</span>
                <strong>{admin.providerData[0]?.providerId}</strong>
              </div>

              <div className="profile-item">
                <span>Role</span>
                <strong>Admin</strong>
              </div>
            </div>

            <div className="profile-footer">
              <span className="status-dot"></span>
              Logged In
            </div>
          </div>
        </div>
      )}

      {/* ===== CONTACT MESSAGES ===== */}
      {hash === "#contact-messages" && (
        <>
          <h2>Contact Messages</h2>
          <div className="news-grid">
            {contactMessages.length === 0 && <p>No messages</p>}
            {contactMessages.map((msg, i) => (
              <div className="news-card" key={i}>
                <h3>{msg.name}</h3>
                <p>{msg.message}</p>
                <p>{msg.email}</p>
                <button className="btn delete" onClick={() => deleteContact(i)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===== PENDING NEWS ===== */}
      {hash === "#pending-news" && (
        <>
          <h2 style={{ marginTop: "40px" }}>Pending News Requests</h2>
          <div className="news-grid">
            {pendingNews.length === 0 && <p>No pending requests</p>}
            {pendingNews.map((news, i) => (
              <div className="news-card" key={i}>
                <h3>{news.title}</h3>
                <p>{news.description}</p>
                <p><strong>Author:</strong> {news.author}</p>

                <div className="btn-group">
                  <button className="btn primary" onClick={() => approveNews(i)}>
                    Approve
                  </button>
                  <button className="btn delete" onClick={() => rejectNews(i)}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===== PUBLISHED NEWS ===== */}
      {hash === "#published-news" && (
        <>
          <h2 style={{ marginTop: "40px" }}>Published News</h2>

          <div className="dashboard-grid">
            {currentNews.map((news) => (
              <div className="dashboard-card" key={news.id}>
                <h3>{news.title}</h3>
                <p>{news.description?.slice(0, 100)}...</p>

                <div className="btn-group">
                  {/* <button
                    className="btn secondary"
                    onClick={() => startEdit(news)}
                  >
                    Edit
                  </button> */}

                  <button
  className="btn secondary"
  onClick={() => startEdit(news)}
>
  Edit
</button>


                  {/* <button
                    className="btn delete"
                    onClick={() => deleteNews(news.id)}
                  >
                    Delete
                  </button> */}
                  <button
  className="btn delete"
  onClick={async () => {
    if (!window.confirm("Delete this news?")) return;
    await deleteNews(news.id);
    loadNews(); // refresh list
  }}
>
  Delete
</button>

                </div>
              </div>
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {/* ===== EDIT MODAL ===== */}
      {editingNews && (
        <div className="modal-overlay" onClick={() => setEditingNews(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit News</h3>

            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />

            <textarea
              rows="4"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
            />

            <div className="btn-group">
              <button className="btn primary" onClick={saveEdit}>
                Save
              </button>
              <button
                className="btn delete"
                onClick={() => setEditingNews(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
