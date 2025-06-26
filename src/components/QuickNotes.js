import React, { useState, useEffect } from "react";

export default function QuickNotes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("quicknotes");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    localStorage.setItem("quicknotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;
    const newNote = {
      id: Date.now(),
      title,
      content,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>QuickNotes</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <textarea
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        rows="4"
      />
      <button onClick={addNote} style={{ padding: "0.5rem 1rem" }}>
        Save Note
      </button>

      <div style={{ marginTop: "2rem" }}>
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                color: "red",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
