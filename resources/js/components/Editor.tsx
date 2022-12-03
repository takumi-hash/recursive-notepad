import React, { useEffect, useState } from "react";
import axios from "axios";

import Note from "./Note";

const Editor = ({ note }) => {
    const [noteDetail, setNoteDetail] = useState();

    useEffect(() => {
        const getUser = async () => {
            const response = await axios
                .get(window.location.origin + `/notes/${noteDetail.id}`)
                .then((response) => setNoteDetail(response.data));
            console.log(response.data);
        };
        getUser();
        // axios
        //     .get(window.location.origin + `/notes/${noteDetail.id}`)
        //     .then((response) => setNoteDetail(response.data))
        //     .catch((error) => console.log(error));
    }, [noteDetail]);

    const [title, setTitle] = useState<string>("");
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const [body, setBody] = useState<string>("");
    const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value);
    };

    const saveNote = (): void => {
        axios
            .post(window.location.origin + "/notes", {
                title: title,
                body: body,
            })
            .then((response) => {
                setNoteDetail([...note, response.data]);
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
                setNoteDetail(noteDetail.filter((note) => note.id !== id));
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
                setNoteDetail(response.data);
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
                onClick={() => deleteNote(noteDetail.id)}
            >
                削除
            </button>
        </>
    );
};

export default Editor;
