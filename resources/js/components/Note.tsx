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

    const clearSelectedNote = () => {
        setSelectedId(null);
        setSelectedTitle("");
        setSelectedBody("");
    };

    const createNote = (): void => {
        axios
            .post(window.location.origin + `/notes`, {
                title: selectedTitle,
                body: selectedBody,
            })
            .then((response) => {
                setNotes(response.data);
            })
            .then(() => {
                clearSelectedNote();
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

    const deleteNote = (id: number) => {
        axios
            .delete(window.location.origin + "/notes/" + `${id}`)
            .then((response) => {
                console.log(response);
                setNotes(notes.filter((note) => note.id !== id));
                clearSelectedNote();
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div className="col-md-4">
                {notes.map((note) => (
                    <>
                        <div key={note.id} className="card mb-3">
                            <div className="card-header">{note.title}</div>
                            <div className="card-body">
                                <p>{note.body}</p>
                                <p> Create At: {note.created_at}</p>
                                <p>Updated At: {note.updated_at}</p>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary me-3"
                                    onClick={() => selectNote(note)}
                                >
                                    選択
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger me-3"
                                    onClick={() => deleteNote(note.id)}
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <div className="col-md-8">
                <form action="">
                    <div className="mb-3">
                        <input
                            type="text"
                            id="titleText"
                            className="form-control"
                            value={selectedTitle}
                            onChange={handleTitleChange}
                            placeholder="タイトル"
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            id="bodyText"
                            rows="10"
                            value={selectedBody}
                            onChange={handleBodyChange}
                            placeholder="本文"
                        ></textarea>
                    </div>
                    <br />
                    {(() => {
                        if (selectedId) {
                            return (
                                <button
                                    className="btn btn-success me-3"
                                    onClick={updateNote}
                                >
                                    更新
                                </button>
                            );
                        } else {
                            return (
                                <button
                                    className="btn btn-primary me-3"
                                    onClick={createNote}
                                >
                                    新規保存
                                </button>
                            );
                        }
                    })()}
                    <button
                        className="btn btn-outline-danger me-3"
                        onClick={() => deleteNote(selectedId)}
                    >
                        削除
                    </button>
                </form>
            </div>
        </>
    );
};

export default Note;
