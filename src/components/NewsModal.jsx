import React from "react";
import "./NewsModal.css";

function NewsModal({ news, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{news.title}</h2>
        <p>{news.description}</p>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default NewsModal;
