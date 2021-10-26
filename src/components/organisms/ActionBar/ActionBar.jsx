import React from "react";
import { useSelector } from "react-redux";
import { downloadBlob, generateAsciiHtmlPage } from "../../../utils";
import Button from "../../atoms/Button";

import "./ActionBar.css";

export function ActionBar(props) {
    const asciiImage = useSelector(state => state.asciiImage)
    const userImage = useSelector(state => state.image)

    const handleSaveAsTxtClick = () => {
        downloadBlob(asciiImage.raw, "text/plain", `${userImage.original.fileName}.txt`);
    }

    const handleSaveAsHtmlClick = () => {
        const font = asciiImage.settings.fontFamily;
        const fontSize = asciiImage.settings.fontSize;
        const lineHeight = asciiImage.settings.lineHeight;
        const color = asciiImage.settings.color;
        const backgroundColor = asciiImage.settings.backgroundColor;
        const html = generateAsciiHtmlPage(asciiImage.html, font, fontSize, lineHeight, color, backgroundColor);
        downloadBlob(html, "text/html", `${userImage.original.fileName}.html`);
    }
    
    return (
        <div className="action-bar">
            <Button
                title="Save as *.txt"
                onClick={handleSaveAsTxtClick}
                disabled={!asciiImage.raw}
                type="primary"
            />
            <Button
                title="Save as *.html"
                onClick={handleSaveAsHtmlClick}
                disabled={!asciiImage.html}
                type="primary"
            />
        </div>
    )
}