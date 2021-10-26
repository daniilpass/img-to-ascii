import React from "react";

import "./Button.css";
export function Button({title, onClick, type, disabled}) {
    let typeClassName;

    switch (type) {
        case "agree":
            typeClassName = "button--agree"
            break;
        case "primary":
            typeClassName = "button--primary"
            break;
        case "warning":
            typeClassName = "button--warning"
            break;
        default:
            typeClassName = "button--default"
            break;
    }

    return (
        <button
            className={`button ${typeClassName}`.trim()}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    )
}