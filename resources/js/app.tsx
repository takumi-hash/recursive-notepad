import "./bootstrap";
import Note from "./components/Note";

import React from "react";
import ReactDOM from "react-dom/client";

function App() {
    return (
        <>
            <div className="row justify-content-center">
                <h2>My Notes</h2>
                <Note />
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("contents"));
root.render(<App />);
