import { 
    createImageFromObjectUrl, 
    getImageDataFromImage,
    quantizeImageData
} from "../../utils";

export const image = {
    state: {
        original: {
            image: null,
            objectUrl: null,
        },
        copy: {
            imageData: null,
            objectUrl: null,            
        },
        settings: {
            maxWidth: 256,
            maxHeight: 256,
            redColorsCount: 8,
            greenColorsCount: 8,
            blueColorsCount: 4,
        }
    },
    reducers: {
        setOriginalImage: (state, payload) => {
            return {
                ...state,
                original: payload
            }
        },
        setCopyImage: (state, payload) => {
            return {
                ...state,
                copy: payload
            }
        }
    },
    effects: (dispatch) => ({
        async loadUserImage(blob) {
            let objectUrl = URL.createObjectURL(blob);
            let image = await createImageFromObjectUrl(objectUrl);

            let payloadOriginal = {
                image: image,
                objectUrl: objectUrl
            }

            dispatch.image.setOriginalImage(payloadOriginal);
        },
        async processUserImage(payload, rootState) {   
            let image = rootState.image.original.image;
            let settings = rootState.image.settings;

            let data = getImageDataFromImage(
                image, 
                settings.maxWidth, 
                settings.maxHeight, 
                [
                    (imageData) => quantizeImageData(
                        imageData, 
                        settings.redColorsCount, 
                        settings.greenColorsCount, 
                        settings.blueColorsCount
                    )                        
                ]
            );

            let payloadCopy = {
                imageData: data.imageData,
                objectUrl: data.objectUrl                
            }

            dispatch.image.setCopyImage(payloadCopy);
        },
    })
}