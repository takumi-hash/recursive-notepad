import React, { useEffect, useState } from "react";
import RecursiveComponent from "./RecursiveComponent";
import axios from "axios";

import { Note } from "../types/Note";
import { getChildren, getSanitizedPreview } from "../lib/notes";

type Props = {
    selectedNote: Note;
};

export const Editor: React.FC<Props> = ({ selectedNote }: Props) => {
    const [id, setId] = useState<number>();
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
        setupEditor();
    }, [selectedNote]);

    const setupEditor = async () => {
        setId(selectedNote?.id);
        setTitle(selectedNote.title);

        const childrenData = await getChildren(selectedNote.id);
        setChildren(childrenData);

        setBody(selectedNote.body);

        const previewData = await getSanitizedPreview(selectedNote.id);
        setCleanHtml(previewData);
    };

    const onSelectChild = () => {
        selectedNote;
    };

    const clearSelectedNote = () => {
        setupEditor();
    };

    const createNote = (): void => {
        axios
            .post(window.location.origin + `/notes`, {
                title: title,
                body: body,
            })
            .then((response) => {
                setupEditor();
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
                setupEditor();
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
                        rows={10}
                        value={selectedNote.body}
                        onChange={() => handleBodyChange}
                        placeholder="本文"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <p>Preview</p>
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
                    onClick={() => deleteNote(selectedNote.id)}
                    type="button"
                >
                    削除
                </button>
            </form>
        </>
    );
};

export default Editor;
