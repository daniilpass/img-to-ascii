import React from "react";
import { useSelector } from "react-redux";
import AsciiImage from "../../atoms/AsciiImage";

import "./AsciiImagePreview.css";
export function AsciiImagePreview(props) {
    const asciiImage = useSelector(state => state.text);
    
    return (
        <div className="ascii-preview"> 
            {
                !!asciiImage.html
                ? <AsciiImage html={asciiImage.html} fontSize={8}/>
                : <></>
            }
        </div>
    )
}