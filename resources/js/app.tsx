import "./bootstrap";
import Note from "./components/Note";
import Editor from "./components/Editor";

import React from "react";
import ReactDOM from "react-dom/client";

function App() {
    return (
        <>
            <div className="row justify-content-center">
                <h2>My Notes</h2>
                <div className="col-md-4">
                    <Note />
                </div>
                <div className="col-md-8">
                    <Editor />
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("contents"));
root.render(<App />);
