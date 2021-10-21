import React from "react";

import "./Button.css";
export function Button({title, onClick}) {
    return (
        <button
            className="button"
            onClick={onClick}
        >
            {title}
        </button>
    )
}