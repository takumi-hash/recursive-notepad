import "./bootstrap";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Editor from "./components/Editor";
import NoteItem from "./components/NoteItem";
import { Note } from "./types/Note";
import { getMyNotes } from "./lib/notes";

const emptyNote: Note = {
    id: undefined,
    title: "",
    body: "",
};

function App() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note>(emptyNote);

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

    const clearEditor = () => {
        setSelectedNote(emptyNote);
    };

    return (
        <>
            <div className="row justify-content-center">
                <h2>My Notes</h2>
                <div className="col-md-4 card-list pt-2">
                    {notes.map((note) => {
                        return (
                            <NoteItem
                                key={note.id}
                                note={note}
                                onSelectNote={() => onSelectNote(note)}
                                getNotes={() => getNotes()}
                            />
                        );
                    })}
                </div>
                <div className="col-md-8 pt-2">
                    <Editor
                        key={selectedNote.id}
                        selectedNoteId={selectedNote.id}
                        onSelectChild={onSelectNote}
                        getNotes={() => getNotes()}
                        clearEditor={() => clearEditor()}
                    />
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("contents")!);
root.render(<App />);
