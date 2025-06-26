import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";

const NoteCard = ({ title, content, id, color }) => {
  return (
    <div className="note-card" style={{ backgroundColor: color || "#ffffff" }}>
      <Link to={`/note/${id}`} className="note-card-title-link">
        <h3>{title}</h3>
        <p className="note-card-text-link">
          {content.length > 100 ? content.substring(0, 100) + "..." : content}
        </p>
      </Link>
    </div>
  );
};

export default NoteCard;
