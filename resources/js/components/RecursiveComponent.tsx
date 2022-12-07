import React, { useEffect, useState } from "react";
import Note from "./Note";
import axios from "axios";

type RecursiveComponent = {
    data: Note;
    level: number;
    onClickLink: any;
};

const RecursiveComponent = ({
    data,
    level,
    onClickLink,
}: RecursiveComponent) => {
    const indent = `${level ? "".repeat(level) : ""}`;
    return (
        <>
            <li>
                <a
                    href=""
                    onClick={(e) => {
                        e.preventDefault();
                        onClickLink(data);
                    }}
                >
                    {indent}
                    {data.title}
                    {data.children?.map((v) => {
                        return (
                            <RecursiveComponent
                                data={v}
                                level={level + 1}
                                onClickLink={onClickLink}
                            />
                        );
                    })}
                </a>
            </li>
        </>
    );
};

export default RecursiveComponent;
