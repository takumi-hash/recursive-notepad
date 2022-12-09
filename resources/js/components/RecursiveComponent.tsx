import React, { useEffect, useState } from "react";
import { Note } from "../types/Note";

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
    const indent = `${"".repeat(level) + ""}`;
    return (
        <>
            <div className={"p-2 border ms-" + level * 4}>
                <a
                    href=""
                    onClick={(e) => {
                        e.preventDefault();
                        onClickLink(data);
                    }}
                >
                    {indent}
                    {"%%" + data.id + "%% = "}
                    {data.title}
                </a>
                {data.children?.map((v) => {
                    return (
                        <RecursiveComponent
                            key={data.id}
                            data={v}
                            level={level + 1}
                            onClickLink={onClickLink}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default RecursiveComponent;
