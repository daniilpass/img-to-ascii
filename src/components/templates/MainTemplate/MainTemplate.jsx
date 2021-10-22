import React from "react";

import AsciiImagePreview from "../../organisms/AsciiImagePreview";
import ImageProcessor from "../../organisms/ImageProceeessor";

import "./MainTemplate.css";

export function MainTemplate(props) {
    return (
        <div className="main-template">
            <ImageProcessor />
            <AsciiImagePreview />
        </div>
    )
}