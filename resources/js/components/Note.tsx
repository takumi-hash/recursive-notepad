import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

type Note = {
    id: number;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
};

const Note = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: 0,
            title: "",
            body: "",
        },
    ]);

    useEffect(() => {
        axios
            .get(window.location.origin + "/notes")
            .then((response) => setNotes(response.data))
            .catch((error) => console.log(error));
    }, []);

    const [title, setTitle] = useState<string>("");
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const [body, setBody] = useState<string>("");
    const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value);
    };

    const selectNote = (id: number) => {
        console.log("ID" + `${id}` + "のNoteを選択。");
    };

    const deleteNote = (id: number) => {
        axios
            .delete(window.location.origin + "/notes/" + `${id}`)
            .then((response) => {
                console.log(response);
                setNotes(notes.filter((note) => note.id !== id));
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div>
                {notes.map((note) => (
                    <>
                        <div className="card my-5" key={note.id}>
                            <div className="card-header">{note.title}</div>
                            <div className="card-body">{note.body}</div>
                            <div className="card-body">
                                Create At: {note.created_at}
                            </div>
                            <div className="card-body">
                                Updated At: {note.updated_at}
                            </div>
                            <button onClick={() => selectNote(note.id)}>
                                選択
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteNote(note.id)}
                            >
                                削除
                            </button>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
};

export default Note;
