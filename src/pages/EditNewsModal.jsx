import React, { useState, useEffect } from "react";

export default function EditNewsModal({ news, onSave, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (news) {
      setForm({
        title: news.title || "",
        description: news.description || "",
      });
    }
  }, [news]);

  if (!news) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit News</h3>

        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Title"
        />

        <textarea
          rows="4"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Description"
        />

        <div className="btn-group">
          <button
            className="btn primary"
            onClick={() => onSave(form)}
          >
            Save
          </button>

          <button className="btn delete" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
