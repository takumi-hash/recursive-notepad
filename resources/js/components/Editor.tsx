import React, { useEffect, useState } from "react";
import axios from "axios";

import Note from "./Note";

const Editor = () => {
    const [notes, setNotes] = useState<Note>({
        id: 0,
        title: "",
        body: "",
    });

    useEffect(() => {
        axios
            .get(window.location.origin + `/notes/1`)
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

    const saveNote = (): void => {
        const timestamp = new Date();
        axios
            .post(window.location.origin + "/notes", {
                title: title,
                body: body,
                createdAt: timestamp,
            })
            .then((response) => {
                setNotes([...notes, response.data]);
            })
            .then(() => {
                setBody("");
                setTitle("");
            })
            .catch((error) => {
                console.log(error);
            });
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
    const updateNote = (id: number) => {
        axios
            .patch(window.location.origin + "/notes/" + `${id}`, {
                title: title,
                body: body,
            })
            .then((response) => {
                setNotes(response.data);
            })
            .then(() => {
                setTitle("");
                setBody("");
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <label>
                タイトル:
                <input value={title} onChange={handleTitleChange} />
            </label>
            <label>
                本文:
                <input value={body} onChange={handleBodyChange} />
            </label>
            <br />
            <button onClick={saveNote}>保存</button>
            <button
                className="btn btn-danger"
                onClick={() => deleteNote(note.id)}
            >
                削除
            </button>
        </>
    );
};

export default Editor;
