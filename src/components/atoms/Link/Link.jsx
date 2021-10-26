import React from "react";

import "./Link.css";
export function Link(props) {
    const {
        link,
        title,
        target = "_blank"
    } = props;
    
    return (
        <a className="link" href={link} target={target}>
            {title || link}
        </a>
    )
}