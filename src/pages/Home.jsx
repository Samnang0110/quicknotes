import React, { useState } from "react";
import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import "../styles/Home.css";

const Home = ({ notes, setNotes }) => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "az") return a.title.localeCompare(b.title);
      if (sortOrder === "za") return b.title.localeCompare(a.title);
      if (sortOrder === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="home-container">
      <h1 className="app-title">QuickNotes</h1>

      <div className="buttons">
        <Link to="/add">
          <button className="primary-button">Add Note</button>
        </Link>
        <Link to="/view">
          <button className="primary-button">View All Notes</button>
        </Link>
      </div>

      {/* Search & Sort Controls */}
      <div className="search-sort-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="az">Title A–Z</option>
          <option value="za">Title Z–A</option>
        </select>
      </div>

      <div className="notes-preview">
        {filteredNotes.length === 0 ? (
          <p className="no-notes">No matching notes found.</p>
        ) : (
          filteredNotes.map((note, index) => (
            <div className="note-wrapper" key={index}>
              <NoteCard
                title={note.title}
                content={note.content}
                id={note.id}
                color={note.color}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
