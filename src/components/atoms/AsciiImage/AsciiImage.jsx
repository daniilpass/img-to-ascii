import React from "react";

import "./AsciiImage.css";
export function AsciiImage (props) {
    const {
        html = "",
        fontSize = 8
    } = props;

    const style = {
        fontSize: fontSize + "px",
        lineHeight: (fontSize - 2) + "px"
    }

    return (
        <div 
            className="ascii-image"
            style={style}
            dangerouslySetInnerHTML={{__html: html}}
        >
        </div>
    )
}