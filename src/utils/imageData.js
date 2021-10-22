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

export const getImageDataFromImage = (image, maxWidth, maxHeight) => {
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
    let objectUrl = canvas.toDataURL();

    return {
        imageData,
        objectUrl
    }
}