import React, { useEffect, useState } from "react";
import RecursiveComponent from "./RecursiveComponent";
import axios from "axios";

import { Note } from "../types/Note";
import {
    getNoteDetail,
    getChildren,
    getSanitizedPreview,
    deleteNote,
} from "../lib/notes";

type Props = {
    selectedNoteId: number;
    onSelectChild: (note: Note) => void;
    getNotes: () => void;
    clearEditor: () => void;
};

export const Editor: React.FC<Props> = ({
    selectedNoteId,
    onSelectChild,
    getNotes,
    clearEditor,
}: Props) => {
    const [editingNote, setEditingNote] = useState<Note>();
    const [id, setId] = useState<number>();
    const [title, setTitle] = useState<string>("");
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const [children, setChildren] = useState<Note[]>([]);
    const [body, setBody] = useState<string>("");
    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };
    const [cleanHtml, setCleanHtml] = useState<string>("");

    useEffect(() => {
        setupEditor();
    }, [selectedNoteId]);

    const setupEditor = async () => {
        setId(selectedNoteId);

        const noteData = await getNoteDetail(selectedNoteId);
        setEditingNote(noteData);
        setTitle(noteData.title);
        setBody(noteData.body);

        const childrenData = await getChildren(selectedNoteId);
        setChildren(childrenData);

        const previewData = await getSanitizedPreview(selectedNoteId);
        setCleanHtml(previewData);
    };

    const createNote = (): void => {
        axios
            .post(window.location.origin + `/notes`, {
                title: title,
                body: body,
            })
            .then((response) => {
                console.log("Create request snet.");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onClickUpdate = (): void => {
        axios
            .put(window.location.origin + `/notes/${id}`, {
                title: title,
                body: body,
            })
            .then((response) => {
                console.log("Update sent.");
                getNotes();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <form action="" className="editor">
                <div className="d-flex flex-column">
                    <div>
                        <input
                            type="text"
                            id="titleText"
                            className="form-control"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="タイトル"
                        />
                    </div>
                    <div className="mb-3 ms-4 d-grid bg-light">
                        {children?.map((child) => {
                            return (
                                <RecursiveComponent
                                    key={child.id}
                                    data={child}
                                    level={0}
                                    onClickLink={onSelectChild}
                                />
                            );
                        })}
                    </div>
                    <div className="mb-3 flex-grow-1" id="bodyArea">
                        <textarea
                            className="form-control"
                            id="bodyText"
                            // rows={10}
                            value={body}
                            onChange={handleBodyChange}
                            placeholder="本文"
                        ></textarea>
                    </div>
                    <div className="mb-3" id="previewArea">
                        <p>Preview</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: cleanHtml,
                            }}
                        ></div>
                    </div>
                    <div className="mb-3" id="composeButtons">
                        {(() => {
                            if (selectedNoteId) {
                                return (
                                    <button
                                        className="btn btn-success me-3"
                                        onClick={onClickUpdate}
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
                                        type="submit"
                                    >
                                        新規保存
                                    </button>
                                );
                            }
                        })()}
                        <button
                            className="btn btn-outline-danger me-3"
                            onClick={() => {
                                deleteNote(selectedNoteId);
                                getNotes();
                                clearEditor();
                            }}
                            type="button"
                        >
                            削除
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Editor;
