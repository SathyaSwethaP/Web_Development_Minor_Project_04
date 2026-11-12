import { useState, useEffect } from "react";

function NotesApp() {

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content");
      return;
    }

    if (editId !== null) {

      setNotes(notes.map(note =>
        note.id === editId
          ? {
              ...note,
              title,
              content,
              category,
              updatedAt: new Date().toLocaleString()
            }
          : note
      ));

      setEditId(null);

    } else {

      const newNote = {
        id: Date.now(),
        title,
        content,
        category,
        createdAt: new Date().toLocaleString()
      };

      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
    setCategory("Personal");
  };

  const deleteNote = (id) => {

    setNotes(notes.filter(note => note.id !== id));

  };

  const editNote = (note) => {

    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setEditId(note.id);

  };

  const filteredNotes = notes.filter(note =>

    note.title.toLowerCase().includes(search.toLowerCase()) ||

    note.content.toLowerCase().includes(search.toLowerCase()) ||

    note.category.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div className="notes-container">

      <div className="page-heading">
        <h1>My Notes 📝</h1>
        <p>Capture your ideas and important thoughts.</p>
      </div>

      <div className="notes-editor">

        <h2>{editId !== null ? "Edit Note" : "Create a New Note"}</h2>

        <input
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Ideas">Ideas</option>
        </select>

        <button onClick={addNote}>
          {editId !== null ? "Update Note" : "Save Note"}
        </button>

      </div>

      <div className="notes-search">

        <input
          type="text"
          placeholder="🔍 Search your notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="notes-grid">

        {filteredNotes.length === 0 ? (

          <div className="empty-message">
            <h3>No notes found! 📒</h3>
            <p>Create your first note.</p>
          </div>

        ) : (

          filteredNotes.map(note => (

            <div className="note-card" key={note.id}>

              <span className="note-category">
                {note.category}
              </span>

              <h2>{note.title}</h2>

              <p>{note.content}</p>

              <small>
                {note.updatedAt
                  ? `Updated: ${note.updatedAt}`
                  : `Created: ${note.createdAt}`}
              </small>

              <div className="note-actions">

                <button onClick={() => editNote(note)}>
                  ✏️ Edit
                </button>

                <button onClick={() => deleteNote(note.id)}>
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default NotesApp;