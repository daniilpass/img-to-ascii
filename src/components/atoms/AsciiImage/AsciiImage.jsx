import React from "react";

import "./AsciiImage.css";
export function AsciiImage (props) {
    const {
        html = "",
        fontFamily,
        fontSize = 8,  
        lineHeight = 6,      
        color = "#000000",
        backgroundColor = "#ffffff"
    } = props;
        
    const style = {
        fontFamily: fontFamily,
        fontSize: fontSize + "px",
        lineHeight: lineHeight + "px",
        color: color,
        backgroundColor: backgroundColor
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