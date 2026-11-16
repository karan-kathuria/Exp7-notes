import { useState } from 'react'
import './App.css'

function App() {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editId, setEditId] = useState(null)

    function saveNote(event) {
        event.preventDefault()

        if (title.trim() === '' || content.trim() === '') {
            alert('Please fill both fields')
            return
        }

        if (editId === null) {
            var newNote = {
                id: Date.now(),
                title: title,
                content: content
            }
            setNotes([...notes, newNote])
        } else {
            var updatedNotes = notes.map(function(note) {
                if (note.id === editId) {
                    return { id: note.id, title: title, content: content }
                }
                return note
            })
            setNotes(updatedNotes)
            setEditId(null)
        }

        setTitle('')
        setContent('')
    }

    function editNote(note) {
        setTitle(note.title)
        setContent(note.content)
        setEditId(note.id)
    }

    function deleteNote(id) {
        var answer = window.confirm('Do you want to delete this note?')
        if (answer) {
            setNotes(notes.filter(function(note) {
                return note.id !== id
            }))
        }
    }

    return (
        <div className="page">
            <header>
                <h1>My Notes</h1>
                <p>A simple place to save my thoughts</p>
            </header>

            <main>
                <form onSubmit={saveNote}>
                    <h2>{editId === null ? 'Add a Note' : 'Update Note'}</h2>
                    <input
                        type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={function(e) { setTitle(e.target.value) }}
                    />
                    <textarea
                        placeholder="Write your note here"
                        rows="4"
                        value={content}
                        onChange={function(e) { setContent(e.target.value) }}
                    ></textarea>
                    <button type="submit">{editId === null ? 'Add Note' : 'Update Note'}</button>
                    {editId !== null && (
                        <button type="button" className="cancel" onClick={function() {
                            setEditId(null)
                            setTitle('')
                            setContent('')
                        }}>Cancel</button>
                    )}
                </form>

                <section className="notes">
                    <h2>Your Notes</h2>
                    {notes.length === 0 && <p>No notes added yet.</p>}
                    {notes.map(function(note) {
                        return (
                            <div className="note" key={note.id}>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                                <button onClick={function() { editNote(note) }}>Edit</button>
                                <button className="delete" onClick={function() { deleteNote(note.id) }}>Delete</button>
                            </div>
                        )
                    })}
                </section>
            </main>
        </div>
    )
}

export default App
