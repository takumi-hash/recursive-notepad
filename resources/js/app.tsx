import "./bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import Editor from "./components/Editor";
import NotesList from "./components/NotesList";
import Note from "./types/Note";

function App() {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: 1,
            title: "Title",
            body: "Body",
        },
    ]);

    useEffect(() => {
        axios
            .get(window.location.origin + "/notes")
            .then((response) => setNotes(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="row justify-content-center">
                <h2>My Notes</h2>
                <div className="col-md-4">
                    <NotesList />
                </div>
                <div className="col-md-8">
                    <Editor
                        data={{ selectedNote }}
                        setSelectedNote={setSelectedNote}
                    />
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("contents"));
root.render(<App />);
