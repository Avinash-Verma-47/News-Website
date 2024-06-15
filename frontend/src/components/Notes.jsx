import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesNavbar from './NotesNavbar';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      alert('Error fetching notes');
    }
  };

  const addNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/notes', { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes([...notes, response.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      alert('Error adding note');
    }
  };

  const updateNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/notes/${editNoteId}`, { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.map(note => (note.id === editNoteId ? response.data : note)));
      setTitle('');
      setContent('');
      setEditMode(false);
      setEditNoteId(null);
    } catch (error) {
      alert('Error updating note');
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      alert('Error deleting note');
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditNoteId(note.id);
    setEditMode(true);
  };

  useEffect(() => {
    fetchNotes();
  }, [notes]);

  return (
    <>
    <NotesNavbar/>
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Notes</h2>
      <div className="mb-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-1/2 p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-1/2 p-2 mb-2 border rounded"
        />
        {editMode ? (
          <button onClick={updateNote} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Update Note</button>
        ) : (
          <button onClick={addNote} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add Note</button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <div key={note.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center">
            <h5 className="text-xl font-semibold mb-2 text-center">{note.title}</h5>
            <p className="text-gray-700">{note.content}</p>
            <div className="mt-2 flex space-x-2">
              <button onClick={() => handleEdit(note)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Edit</button>
              <button onClick={() => deleteNote(note.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Notes;
