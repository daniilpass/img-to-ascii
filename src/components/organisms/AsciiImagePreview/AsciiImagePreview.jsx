import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { palettes } from "../../../settings";

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

        const paletteColors = palettes[userImage.settings.palette].colors;
        let text = imageToAscii(userImage.copy.imageData, paletteColors);
        dispatch.asciiImage.setText(text);
    }, [userImage.copy]);

    return (
        <div className="ascii-preview"> 
            {
                !!asciiImage.html
                ? <AsciiImage
                    html={asciiImage.html}
                    fontFamily={asciiImage.settings.fontFamily}
                    fontSize={asciiImage.settings.fontSize}
                    lineHeight={asciiImage.settings.lineHeight}
                    color={asciiImage.settings.color}
                    backgroundColor={asciiImage.settings.backgroundColor}
                />
                : <></>
            }
        </div>
    )
}