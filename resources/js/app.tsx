import "./bootstrap";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Editor from "./components/Editor";
import NoteItem from "./components/NoteItem";
import { Note } from "./types/Note";
import { getMyNotes } from "./lib/notes";

function App() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note>(0);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const notes = await getMyNotes();
        setNotes(notes);
    };

    const onSelectNote = (note: Note) => {
        setSelectedNote(note);
    };

    const onUpdateNote = () => {
        getNotes();
    };

    const onDeleteNote = () => {
        getNotes();
        const emptyNote: Note = {
            id: undefined,
            title: "",
            body: "",
        };
        setSelectedNote(emptyNote);
    };

    return (
        <>
            <div className="row justify-content-center">
                <h2>My Notes</h2>
                <div className="col-md-4">
                    {notes.map((note) => {
                        return (
                            <NoteItem
                                key={note.id}
                                note={note}
                                onSelectNote={() => onSelectNote(note)}
                            />
                        );
                    })}
                </div>
                <div className="col-md-8">
                    <Editor
                        key={selectedNote.id}
                        selectedNoteId={selectedNote.id}
                        onUpdateNote={() => onUpdateNote()}
                        onDeleteNote={() => onDeleteNote()}
                    />
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("contents")!);
root.render(<App />);
