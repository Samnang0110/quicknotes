import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/NoteDetail.css";

const NoteDetail = ({ notes, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === id);
  const noteIndex = notes.findIndex((n) => n.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note?.title || "");
  const [editedContent, setEditedContent] = useState(note?.content || "");
  const [editedColor, setEditedColor] = useState(note?.color || "#ffffff");

  if (!note) {
    return (
      <div className="note-detail-container">
        <p>Note not found.</p>
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleSave = () => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = {
      ...note,
      title: editedTitle,
      content: editedContent,
      color: editedColor,
    };
    setNotes(updatedNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setEditedColor(note.color);
  };

  const handleClear = () => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = { ...note, content: "" };
    setNotes(updatedNotes);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    const updatedNotes = notes.filter((_, index) => index !== noteIndex);
    setNotes(updatedNotes);
    navigate("/");
  };

  return (
    <div
      className="note-detail-container"
      style={{
        backgroundColor: isEditing ? "#fdfdfd" : note.color || "#ffffff",
      }}
    >
      {isEditing ? (
        <>
          <input
            className="note-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="note-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <label className="color-label">
            Choose Color:
            <input
              type="color"
              value={editedColor}
              onChange={(e) => setEditedColor(e.target.value)}
              className="color-input"
            />
          </label>
          <div className="note-detail-buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>{note.title}</h2>
          <p>{note.content || <em>(No content)</em>}</p>

          <div className="note-detail-buttons">
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="clear-button" onClick={handleClear}>
              Clear Note
            </button>
            <button className="edit-button1" onClick={handleDelete}>
              Delete Note
            </button>
            <button className="edit-button2" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteDetail;
