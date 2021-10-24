import React from "react";

import "./Label.css";

export function Label(props) {
    return (
        <div className="label">
            <label>{props.text}</label>
            {props.children}
        </div>
    )
}