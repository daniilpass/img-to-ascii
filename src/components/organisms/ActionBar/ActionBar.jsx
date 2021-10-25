import React from "react";
import { useSelector } from "react-redux";
import { downloadBlob } from "../../../utils";
import Button from "../../atoms/Button";

import "./ActionBar.css";

export function ActionBar(props) {
    const asciiImage = useSelector(state => state.asciiImage)
    const userImage = useSelector(state => state.image)

    const handleSaveAsTxtClick = () => {
        downloadBlob(asciiImage.raw, "text/plain", `${userImage.original.fileName}.txt`);
    }

    return (
        <div className="action-bar">
            <Button
                title="Save as *.txt"
                onClick={handleSaveAsTxtClick}
                disabled={!asciiImage.raw}
            />
        </div>
    )
}