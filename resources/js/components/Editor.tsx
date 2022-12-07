import React, { useEffect, useState } from "react";
import RecursiveComponent from "./RecursiveComponent";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import Note from "./NotesList";

type Editor = {
    data: Note;
    onClinkChild: any;
};

const Editor = (selectedNote: Note, setSelectedNote) => {
    const [editor, setEditor] = useState<Editor>();
    const [preview, setPreview] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const [children, setChildren] = useState<Note[]>([]);
    const [body, setBody] = useState<string>("");
    const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value);
    };
    const [cleanHtml, setCleanHtml] = useState<string>("");

    useEffect(() => {
        axios
            .get(window.location.origin + `/notes/${selectedNote.id}`)
            .then((response) => setEditor(response.data))
            .catch((error) => console.log(error));

        axios
            .get(
                window.location.origin + `/notes/${selectedNote.id}/parsedbody/`
            )
            .then((response) => setPreview(response.data))
            .catch((error) => console.log(error));
        const cleanHtml = sanitizeHtml(preview);
        setCleanHtml(cleanHtml);

        axios
            .get(window.location.origin + `/notes/${selectedNote.id}/children/`)
            .then((response) => setChildren(response.data))
            .catch((error) => console.log(error));
    }, [selectedNote, preview]);

    const onSelectChild = () => {
        setSelectedNote();
        axios
            .get(window.location.origin + `/notes/${selectedNote.id}`)
            .then((response) => setEditor(response.data))
            .catch((error) => console.log(error));
    };

    const clearSelectedNote = () => {
        setEditor(null);
    };

    const createNote = (): void => {
        axios
            .post(window.location.origin + `/notes`, {
                title: title,
                body: body,
            })
            .then((response) => {
                setEditor(response.data);
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
            .put(window.location.origin + `/notes/${id}`, {
                title: title,
                body: body,
            })
            .then((response) => {
                setEditor(response.data);
                clearSelectedNote();
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
                // setNotes(notes.filter((note) => note.id !== id));
                clearSelectedNote();
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <form action="">
                <div className="">
                    <input
                        type="text"
                        id="titleText"
                        className="form-control"
                        value={selectedNote.title}
                        onChange={handleTitleChange}
                        placeholder="タイトル"
                    />
                </div>
                <div className="mb-3 ms-4 d-grid bg-light">
                    {children?.map((child) => (
                        <>
                            <RecursiveComponent
                                data={child}
                                level={0}
                                onClickLink={onSelectChild}
                            />
                        </>
                    ))}
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        id="bodyText"
                        rows="10"
                        value={selectedNote.body}
                        onChange={handleBodyChange}
                        placeholder="本文"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <p>Preview</p>
                    <p className="text-muted">{preview}</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: cleanHtml,
                        }}
                    ></div>
                </div>
                {(() => {
                    if (selectedNote.id) {
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
                    onClick={() => deleteNote(id)}
                    type="button"
                >
                    削除
                </button>
            </form>
        </>
    );
};

export default Editor;
