import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddNote.css";

const AddNote = ({ setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();

  const handleSave = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Both title and content are required.");
      return;
    }

    const newNote = {
      id: crypto.randomUUID(), 
      title,
      content,
      color,
      createdAt: new Date().toISOString(),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    navigate("/");
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Discard this note?");
    if (confirmCancel) navigate("/");
  };

  return (
    <div className="add-note-container">
      <h2 className="add-note-title">Add New Note</h2>

      <input
        type="text"
        className="note-input"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="note-textarea"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label className="color-label">
        Choose a color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-input"
        />
      </label>

      <div className="add-note-buttons">
        <button className="save-button" onClick={handleSave}>
          Save Note
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNote;
