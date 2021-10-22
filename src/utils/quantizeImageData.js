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
        // Remove Alpha channel
        if (imageData.data[i + 3] < 255) {
            imageData.data[i + 0] = redRanges[redRanges.length - 1].value;
            imageData.data[i + 1] = greenRanges[greenRanges.length - 1].value;
            imageData.data[i + 2] = blueRanges[blueRanges.length - 1].value;
            imageData.data[i + 3] = 255; 

            continue;
        }  

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

/*
const getAsciiPalette = () => {
    var range = splitToRanges(256, 4);
    var colors = range.map(x => x.value);

    // 64 ascii symbols
    var ascii = [];
    for(var i=32; i < 96; ++i) {
        ascii.push(String.fromCharCode(i));
    }
    
    // palette
    var pallete = [];
    for (let i = 0; i < colors.length; i++) {
        for (let k = 0; k < colors.length; k++) {
            for (let m = 0; m < colors.length; m++) {
                pallete.push({
                    r: range[i].value,
                    g: range[k].value,
                    b: range[m].value,
                    char: ascii.pop()
                });            
            }            
        }
    }

    console.log(JSON.stringify(pallete));
    console.log(pallete);
}
*/