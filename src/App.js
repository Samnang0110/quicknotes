import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import ViewNotes from "./pages/ViewNotes";
import NoteDetail from "./pages/NoteDetail";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route path="/add" element={<AddNote setNotes={setNotes} />} />
        <Route
          path="/view"
          element={<ViewNotes notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/note/:id"
          element={<NoteDetail notes={notes} setNotes={setNotes} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
