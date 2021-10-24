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
            redColorsCount: 4,
            greenColorsCount: 4,
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
        },
        setMaxSize: (state, {width, height}) => {
            return {
                ...state,
                settings: {
                    ...state.settings,
                    maxWidth: width,
                    maxHeight: height
                }
            }
        },
    },
    effects: (dispatch) => ({
        async asyncLoadUserImage(blob) {
            let objectUrl = URL.createObjectURL(blob);
            let image = await createImageFromObjectUrl(objectUrl);

            let payloadOriginal = {
                image: image,
                objectUrl: objectUrl
            }

            dispatch.image.setOriginalImage(payloadOriginal);
            await dispatch.image.asyncProcessUserImage();
        },
        async asyncProcessUserImage(payload, rootState) {   
            let image = rootState.image.original.image;
            if (!image) {
                return;
            }

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