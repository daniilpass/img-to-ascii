export const createImageFromObjectUrl = (url) => {
    return new Promise((resolve, reject) => {
        try {            
            let img = new Image();
            img.onload = () => {
                resolve(img);
            }
            img.src = url;
        } catch (error) {
            reject(error);
        }        
    });
}

export const getImageDataFromImage = (image, maxWidth, maxHeight, processors = []) => {
    // calc scale
    let imageWidth = image.naturalWidth;
    let imageHeight = image.naturalHeight;
    let scaleX = maxWidth / imageWidth;
    let scaleY = maxHeight / imageHeight;
    let scale = scaleX < scaleY ? scaleX : scaleY;

    // calc new width and height
    let newWidth = Math.round(imageWidth * scale);
    let newHeight = Math.round(imageHeight * scale);
    // console.log("SCALE", {scale, scaleX, scaleY, newWidth, newHeight});

    // setup canvas
    let canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    // draw image with scaling on canvas
    let context = canvas.getContext('2d');     
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    // get data
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // process data
    if (processors.length > 0) {
        processors.forEach(p => {
            p(imageData);
        });
    
        context.putImageData(imageData, 0, 0);
    }
    
    let objectUrl = canvas.toDataURL();

    return {
        imageData,
        objectUrl
    }
}

export const quantizeImageData = (imageData, redColorsCount = 256, greenColorsCount = 256, blueColorsCount = 256) => {
    console.log('quantizeImageData', {
        redColorsCount, 
        greenColorsCount, 
        blueColorsCount, 
        totalColorsCount: redColorsCount * greenColorsCount * blueColorsCount
    });

    const defaultColorsCount = 256;
    redColorsCount = (redColorsCount > defaultColorsCount || redColorsCount < 1) ? defaultColorsCount : redColorsCount;
    greenColorsCount = (greenColorsCount > defaultColorsCount || greenColorsCount < 1) ? defaultColorsCount : greenColorsCount;
    blueColorsCount = (blueColorsCount > defaultColorsCount || blueColorsCount < 1) ? defaultColorsCount : blueColorsCount;

    const redRanges = splitToRanges(defaultColorsCount, redColorsCount);
    const greenRanges = splitToRanges(defaultColorsCount, greenColorsCount);
    const blueRanges = splitToRanges(defaultColorsCount, blueColorsCount);
    // console.log({redRanges, greenRanges, blueRanges});

    const bytesPerPixel = 4;
    for (let i = 0; i < imageData.data.length; i += bytesPerPixel) {
        // RED
        let redValue = imageData.data[i + 0];
        let redNewValue = redRanges.find(x => redValue >= x.from && redValue <= x.to).value;
        imageData.data[i + 0] = redNewValue;

        // GREEN
        let greenValue = imageData.data[i + 1];
        let greenNewValue = greenRanges.find(x => greenValue >= x.from && greenValue <= x.to).value;
        imageData.data[i + 1] = greenNewValue;

        // BLUE
        let blueValue = imageData.data[i + 2];
        let blueNewValue = blueRanges.find(x => blueValue >= x.from && blueValue <= x.to).value;
        imageData.data[i + 2] = blueNewValue;

        // Remove Alpha channel
        if (imageData.data[i + 3] < 255) {
            imageData.data[i + 3] = 0; 
        }               
    }
}

const splitToRanges = (parentLength, splitCount) => {
    const rangeWidth = Math.ceil(parentLength / splitCount);
    const ranges = [];

    for (let i = 0; i < splitCount; i++) {
        let from = i * rangeWidth;
        let to = from + rangeWidth - 1;
        to = to > parentLength - 1 ? parentLength - 1: to;
        let rangeValue = Math.round((from + to + 1) / 2);
        ranges.push( {
            from,
            to,
            value: rangeValue     
        });        
    }

    return ranges;
}