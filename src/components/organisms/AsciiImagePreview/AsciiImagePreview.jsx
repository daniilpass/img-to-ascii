import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { imageToAscii } from "../../../utils";
import AsciiImage from "../../atoms/AsciiImage";

import "./AsciiImagePreview.css";
export function AsciiImagePreview(props) {
    const dispatch = useDispatch();
    const userImage = useSelector(state => state.image); 
    const asciiImage = useSelector(state => state.asciiImage);       

    useEffect(() => {
        if (!userImage.copy.imageData)
            return;

        let text = imageToAscii(userImage.copy.imageData);
        dispatch.asciiImage.setText(text);
    }, [userImage.copy]);

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