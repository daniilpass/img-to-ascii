import { palette444 } from "../settings/asciiPalette";

export const imageToAscii = (imageData) => {
    const bytesPerPixel = 4;
    const imageWidth = imageData.width;
    const lineBreak = imageWidth * bytesPerPixel;
    let text = "";

    for (let i = 0; i < imageData.data.length; i += bytesPerPixel) {
        // RED
        let redValue = imageData.data[i + 0];
        // GREEN
        let greenValue = imageData.data[i + 1];
        // BLUE
        let blueValue = imageData.data[i + 2];
        
        let asciiColor = palette444.find(x => x.r === redValue && x.g === greenValue && x.b === blueValue);
        text += asciiColor && asciiColor.char;

        console.log();
        if (  i !== 0 && i % lineBreak === 0) {
            text += "\n";
        }
    }

    return text;
}