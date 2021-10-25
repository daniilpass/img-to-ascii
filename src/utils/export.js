export const generateAsciiHtmlPage = (innerHtml, font, fontSize, lineHeight, color, backgroundColor) => {
    return `<html>
        <body>
            <div style="font-family: ${font};
                font-size: ${fontSize}px;
                line-height: ${lineHeight}px;
                color: ${color};
                background-color: ${backgroundColor};
                white-space: nowrap;"
            >
            ${innerHtml}
            </div>
        </body>
    </html>`;
}