import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('my-notes')
      return savedNotes ? JSON.parse(savedNotes) : []
    } catch {
      return []
    }
  })

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem('my-notes', JSON.stringify(notes))
  }, [notes])

  function saveNote(e) {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert('Please enter both a title and note.')
      return
    }

    if (editingId !== null) {
      setNotes(previousNotes =>
        previousNotes.map(note =>
          note.id === editingId
            ? { ...note, title: title.trim(), content: content.trim() }
            : note
        )
      )
      setEditingId(null)
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toLocaleDateString()
      }

      setNotes(previousNotes => [newNote, ...previousNotes])
    }

    setTitle('')
    setContent('')
  }

  function editNote(note) {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteNote(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    )

    if (confirmed) {
      setNotes(previousNotes =>
        previousNotes.filter(note => note.id !== id)
      )

      if (editingId === id) {
        cancelEdit()
      }
    }
  }

  function cancelEdit() {
    setEditingId(null)
    setTitle('')
    setContent('')
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="logo">
          note<span>book.</span>
        </a>
        <span className="nav-label">YOUR PERSONAL SPACE</span>
      </header>

      <main className="container">
        <section className="intro">
          <p className="eyebrow">THINK IT. WRITE IT. KEEP IT.</p>
          <h1>
            Your thoughts,
            <br />
            all in one place.
          </h1>
          <p className="subtitle">
            A little space for your big ideas, daily reminders and
            everything in between.
          </p>
        </section>

        <section className="note-form-section">
          <h2>
            {editingId !== null ? 'Edit your note' : 'Create a new note'}
          </h2>

          <form onSubmit={saveNote} className="note-form">
            <input
              type="text"
              placeholder="Give your note a title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={80}
              required
            />

            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows="4"
              required
            />

            <div className="form-actions">
              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}

              <button type="submit" className="save-btn">
                {editingId !== null ? 'Update note' : '+ Add note'}
              </button>
            </div>
          </form>
        </section>

        <section className="notes-section">
          <div className="section-heading">
            <h2>Your notes</h2>
            <span className="note-count">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✎</div>
              <h3>Nothing here just yet</h3>
              <p>
                Your notes will appear here. Start by writing something above!
              </p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map(note => (
                <article className="note-card" key={note.id}>
                  <div className="note-card-top">
                    <span className="note-dot"></span>
                    <span className="note-date">
                      {note.date || 'Recently updated'}
                    </span>
                  </div>

                  <h3>{note.title}</h3>
                  <p className="note-content">{note.content}</p>

                  <div className="card-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => editNote(note)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>Made with care, one note at a time.</p>
        <span>REACT NOTES APP · EXPERIMENT 7</span>
      </footer>
    </div>
  )
}

export default App