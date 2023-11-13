import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  onAddNote,
  notes,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {

  const sortedNote = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div className="appSidebar">
      <div className="appSidebarHeader">
        <h1>Schedule</h1>
        <button onClick={() => onAddNote()}>Add</button>
      </div>
      <div className="appSidebarNotes">
        {sortedNote.map((note) => (
          <div
            // activeクラスを付与
            className={`appSidebarNote ${note.id === activeNote && "active"}`}
            key={note.id}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebarNoteTitle">
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}>Delete</button>
            </div>
            <p>{note.content}</p>
            <small>
              修正日:
              {new Date(note.modDate).toLocaleDateString("jp", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
