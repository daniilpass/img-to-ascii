import { 
    createImageFromObjectUrl, 
    getImageDataFromImage
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
            maxWidth: 200,
            maxHeight: 200,
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
            console.log('processUserImage',payload, rootState);
            let image = rootState.image.original.image;
            let data = getImageDataFromImage(image, 10, 10);
            let payloadCopy = {
                imageData: data.imageData,
                objectUrl: data.objectUrl                
            }
            dispatch.image.setCopyImage(payloadCopy);
        },
    })
}