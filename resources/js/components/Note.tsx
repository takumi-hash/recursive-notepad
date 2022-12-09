import React, { useEffect, useState } from "react";
import RecursiveComponent from "./RecursiveComponent";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

type Note = {
    id: number;
    title: string;
    children?: Note[];
    body: string;
    previewBody: string;
    cleanHtml: string;
    created_at: Date;
    updated_at: Date;
};

const Note = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: null,
            title: "",
            children: null,
            body: "",
            previewBody: "",
            cleanHtml: "",
        },
    ]);

    useEffect(() => {
        axios
            .get(window.location.origin + "/notes")
            .then((response) => setNotes(response.data))
            .catch((error) => console.log(error));
    }, []);

    const [selectedId, setSelectedId] = useState<number>();
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedId(e.target.value);
    };

    const [selectedTitle, setSelectedTitle] = useState<string>("");
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTitle(e.target.value);
    };

    const [selectedChildren, setSelectedChildren] = useState<Note[]>([]);

    const [selectedBody, setSelectedBody] = useState<string>("");
    const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBody(e.target.value);
    };
    const [previewBody, setPreviewBody] = useState<string>("");
    const [cleanHtml, setCleanHtml] = useState<string>("");

    const clearSelectedNote = () => {
        setSelectedId(null);
        setSelectedTitle("");
        setSelectedChildren(null);
        setSelectedBody("");
        setPreviewBody("");
        setCleanHtml("");
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
        axios
            .get(window.location.origin + `/notes/${note.id}/children/`)
            .then((response) => setSelectedChildren(response.data))
            .catch((error) => console.log(error));
        setSelectedBody(note.body);
        axios
            .get(window.location.origin + `/notes/${note.id}/parsedbody/`)
            .then((response) => setPreviewBody(response.data))
            .catch((error) => console.log(error));
        const cleanHtml = sanitizeHtml(note.previewBody, {
            allowedTags: ["mark"],
            allowedAttributes: {
                mark: [""],
            },
            allowedIframeHostnames: [""],
        });
        setCleanHtml(cleanHtml);
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
                            <div className="card-header">
                                [{note.id}] {note.title}
                            </div>
                            <div className="card-body">
                                <p>{note.body}</p>
                                <p>Create At: {note.created_at}</p>
                                <p>Updated At: {note.updated_at}</p>
                                <button
                                    className="btn btn-outline-primary me-3"
                                    onClick={() => selectNote(note)}
                                    type="button"
                                >
                                    選択
                                </button>
                                <button
                                    className="btn btn-outline-danger me-3"
                                    onClick={() => deleteNote(note.id)}
                                    type="button"
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
                    <div className="">
                        <input
                            type="text"
                            id="titleText"
                            className="form-control"
                            value={selectedTitle}
                            onChange={handleTitleChange}
                            placeholder="タイトル"
                        />
                    </div>
                    <div className="mb-3 ms-4 d-grid bg-light">
                        {selectedChildren?.map((child) => (
                            <>
                                <RecursiveComponent
                                    data={child}
                                    level={0}
                                    onClickLink={selectNote}
                                />
                            </>
                        ))}
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            id="bodyText"
                            rows={10}
                            value={selectedBody}
                            onChange={handleBodyChange}
                            placeholder="本文"
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <p>Preview</p>
                        <p className="text-muted">{previewBody}</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: cleanHtml,
                            }}
                        ></div>
                    </div>
                    {(() => {
                        if (selectedId) {
                            return (
                                <button
                                    className="btn btn-success me-3"
                                    onClick={updateNote}
                                    type="button"
                                >
                                    更新
                                </button>
                            );
                        } else {
                            return (
                                <button
                                    className="btn btn-primary me-3"
                                    onClick={createNote}
                                    type="button"
                                >
                                    新規保存
                                </button>
                            );
                        }
                    })()}
                    <button
                        className="btn btn-outline-danger me-3"
                        onClick={() => deleteNote(selectedId)}
                        type="button"
                    >
                        削除
                    </button>
                </form>
            </div>
        </>
    );
};

export default Note;
