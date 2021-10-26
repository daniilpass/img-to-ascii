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

export const quantizeImageDataByPalette = (imageData, paletteColors) => {
    // Pixel color data stores in 4 bytes.
    const bytesPerPixel = 4; 

    // preformance log
    //console.log(`quantizeImageData start. PaletteLength: ${paletteColors.length}; pixelsCount: ${imageData.data.length / 4}`);
    let startTime = performance.now();  
    
    const useCahce = true;
    let cache = [];

    // Iterate image data and process all pixels
    for (let di = 0; di < imageData.data.length; di += bytesPerPixel) 
    {
        // Remove Alpha channel
        if (imageData.data[di + 3] < 255) {
            //TODO: apply background color insted of tuning to white
            imageData.data[di + 0] = 255;
            imageData.data[di + 1] = 255;
            imageData.data[di + 2] = 255;
            imageData.data[di + 3] = 255; 
        }  

        // get RGB color data 
        let r = imageData.data[di + 0];
        let g = imageData.data[di + 1];
        let b = imageData.data[di + 2];

        let closestColorIndex = -1;        

        // try find in cahce
        let cacheRed =  useCahce ? cache[r] : undefined;
        let cacheGreen
        let cacheBlue;
        if (cacheRed !== undefined) {
            cacheGreen = cacheRed.childs[g];
            if (cacheGreen !== undefined) {
                cacheBlue = cacheGreen.childs[b];
                if (cacheBlue !== undefined) {
                    closestColorIndex = cacheBlue.closestColorIndex;
                }
            }
        }

        if (closestColorIndex === -1)  {
            //find closest color in palette
            let minDistance = Number.MAX_SAFE_INTEGER;
            for (let pi = 0; pi < paletteColors.length; pi++) 
            {
                // Get RGB color from palette
                const paletteColor = paletteColors[pi];
                let pr = paletteColor.r;
                let pg = paletteColor.g;
                let pb = paletteColor.b;
                
                // Get distance between image pixel and palette color
                let distance = Math.sqrt(Math.pow(r - pr, 2) + Math.pow(g - pg, 2) + Math.pow(b - pb, 2))
                // Save color with minimal distance
                if (distance < minDistance) {
                    minDistance = distance;
                    closestColorIndex = pi;
                }
            }

            if (useCahce) {
                if (cacheGreen !== undefined) {
                    cacheGreen.childs[b] = {
                        value: b,
                        closestColorIndex: closestColorIndex
                    };
                } else if (cacheRed !== undefined) {
                    cacheRed.childs[g] = {
                        value: g,
                        childs: [
                            {
                                value: b,
                                closestColorIndex: closestColorIndex
                            }
                        ]
                    }
                } else {
                    cache[r] = {
                        value: r,
                        childs: [
                            {
                                value: g,
                                childs: [
                                    {
                                        value: b,
                                        closestColorIndex: closestColorIndex
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }
        
        // update imageData to new color
        const closestColor = paletteColors[closestColorIndex];
        imageData.data[di + 0] = closestColor.r;
        imageData.data[di + 1] = closestColor.g;
        imageData.data[di + 2]= closestColor.b;              
    }

    // preformance log
    let endTime = performance.now();
    //console.log(`quantizeImageData end. Time: ${endTime - startTime} ms;`);
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
    // var range = splitToRanges(256, 4);
    var colors = [0, 85, 170, 255];

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
                    r: colors[i],
                    g: colors[k],
                    b: colors[m],
                    char: ascii.pop()
                });            
            }            
        }
    }

    console.log(JSON.stringify(pallete));
    console.log(pallete);
}
getAsciiPalette();
*/