import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim() === "") return;

    const newNote = { text: note, highlighted: false };
    setNotes([...notes, newNote]);
    setNote("");
  };

  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  const toggleHighlight = (index) => {
    const updated = notes.map((item, i) =>
      i === index ? { ...item, highlighted: !item.highlighted } : item
    );
    setNotes(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(notes[index].text);
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;

    const updated = notes.map((item, i) =>
      i === editingIndex ? { ...item, text: editText } : item
    );

    setNotes(updated);
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="app-container">
      <h1>My Notes</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="notes-list">
        {notes.map((item, index) => (
          <div
            key={index}
            className={`note-card ${item.highlighted ? "highlighted" : ""}`}
          >
            {/* If this note is being edited */}
            {editingIndex === index ? (
              <input
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{item.text}</span>
            )}

            <div className="btn-group">
              {editingIndex === index ? (
                <button className="save-btn" onClick={saveEdit}>
                  Save
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => startEditing(index)}
                >
                  Edit
                </button>
              )}

              <button
                className="highlight-btn"
                onClick={() => toggleHighlight(index)}
              >
                {item.highlighted ? "Unhighlight" : "Highlight"}
              </button>

              <button className="delete-btn" onClick={() => deleteNote(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
