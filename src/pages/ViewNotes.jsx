import React from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import "../styles/ViewNotes.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ViewNotes = ({ notes, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = (indexToDelete) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;
    const updatedNotes = notes.filter((_, index) => index !== indexToDelete);
    setNotes(updatedNotes);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  return (
    <div className="view-notes-container">
      <h2 className="view-notes-title">All Notes</h2>

      {notes.length === 0 ? (
        <p className="no-notes">No notes to display.</p>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="notes">
            {(provided) => (
              <div
                className="notes-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {notes.map((note, index) => (
                  <Draggable key={index} draggableId={`${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="note-wrapper"
                        style={{
                          ...provided.draggableProps.style, 
                        }}
                      >
                        <NoteCard
                          title={note.title}
                          content={note.content}
                          id={note.id}
                          color={note.color}
                        />
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default ViewNotes;
