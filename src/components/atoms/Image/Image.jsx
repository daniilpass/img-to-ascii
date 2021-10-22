import React from "react";

import "./Image.css";
export function Image(props) {
    const {
        alt = "", 
        src, 
        fallback,
        rendering = "auto"
    } = props;

    const style = {
        imageRendering: rendering
    };

    return (
        <img className="image" alt={alt} src={src || fallback} style={style} ></img>
    )
}