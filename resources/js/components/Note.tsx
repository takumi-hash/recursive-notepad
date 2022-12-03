import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "./Editor";

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
            id: null,
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

    const [selectedId, setSelectedId] = useState<string>("");
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedId(e.target.value);
    };

    const [selectedTitle, setSelectedTitle] = useState<string>("");
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTitle(e.target.value);
    };

    const [selectedBody, setSelectedBody] = useState<string>("");
    const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBody(e.target.value);
    };

    const createNote = (): void => {
        axios
            .post(window.location.origin + `/notes`, {
                title: selectedTitle,
                body: selectedBody,
            })
            .then((response) => {
                setNotes([...notes, response.data]);
            })
            .then(() => {
                setSelectedId("");
                setSelectedBody("");
                setSelectedTitle("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateNote = (): void => {
        axios
            .put(window.location.origin + `/notes/${selectedId}`, {
                title: selectedTitle,
                body: selectedBody,
            })
            .then((response) => {
                setNotes(response.data);
                clearSelectedNote();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const selectNote = (note: Note) => {
        setSelectedId(note.id);
        setSelectedTitle(note.title);
        setSelectedBody(note.body);
    };

    const clearSelectedNote = () => {
        setSelectedId(null);
        setSelectedTitle("");
        setSelectedBody("");
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
            <div className="col-md-4">
                {notes.map((note) => (
                    <>
                        <div key={note.id} className="card my-5">
                            <div className="card-header">{note.title}</div>
                            <div className="card-body">{note.body}</div>
                            <div className="card-body">
                                Create At: {note.created_at}
                            </div>
                            <div className="card-body">
                                Updated At: {note.updated_at}
                            </div>
                            <button onClick={() => selectNote(note)}>
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
            <div className="col-md-8">
                <label>
                    タイトル:
                    <input value={selectedTitle} onChange={handleTitleChange} />
                </label>
                <label>
                    本文:
                    <input value={selectedBody} onChange={handleBodyChange} />
                </label>
                <br />
                {(() => {
                    if (selectedId) {
                        return <button onClick={updateNote}>更新</button>;
                    } else {
                        return <button onClick={createNote}>新規保存</button>;
                    }
                })()}
                <button
                    className="btn btn-danger"
                    onClick={() => deleteNote(selectedId)}
                >
                    削除
                </button>
            </div>
        </>
    );
};

export default Note;
