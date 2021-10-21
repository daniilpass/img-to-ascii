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

export const getImageDataFromImage = (image, width, height) => {
    let canvas = document.createElement('canvas');
    canvas.width = width || image.naturalWidth;
    canvas.height = height || image.naturalHeight;

    let context = canvas.getContext('2d');     
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let objectUrl = canvas.toDataURL();
    return {
        imageData,
        objectUrl
    }
}