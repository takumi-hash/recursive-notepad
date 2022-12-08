import React, { useEffect, useState } from "react";
import axios from "axios";
import { Note } from "../types/Note";

type Props = {
    note: Note;
    onSelectNote: () => void;
};

export const NoteItem: React.FC<Props> = ({ note, onSelectNote }: Props) => {
    useEffect(() => {}, []);

    // const deleteNote = (id: number) => {
    //     axios
    //         .delete(window.location.origin + "/notes/" + `${id}`)
    //         .then((response) => {
    //             console.log(response);
    //             setNotes(notes.filter((note) => note.id !== id));
    //             // setSelectedNote(Note);
    //         })
    //         .catch((error) => console.log(error));
    // };

    return (
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
                        onClick={() => onSelectNote()}
                        type="button"
                    >
                        選択
                    </button>
                    <button
                        className="btn btn-outline-danger me-3"
                        // onClick={() => deleteNote(note.id)}
                        type="button"
                    >
                        削除
                    </button>
                </div>
            </div>
        </>
    );
};

export default NoteItem;
