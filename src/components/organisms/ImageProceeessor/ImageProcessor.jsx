import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { imageToAscii } from "../../../utils";

import Image from "../../atoms/Image";
import FileSelect from "../../molecules/FileSelect";
import NoPhoto from "../../../assets/images/no-photo.png";

import "./ImageProcessor.css";
export function ImageProcessor(props) {    
    const dispatch = useDispatch();
    const userImage = useSelector(state => state.image);

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        if (!file) {
            return;
        }

        dispatch.image.loadUserImage(file)
            .then(() => {
                dispatch.image.processUserImage()
            });
    }

    useEffect(() => {
        if (!userImage.copy.imageData)
            return;

        let text = imageToAscii(userImage.copy.imageData);
        dispatch.text.setText(text);
    }, [userImage.copy]);

    return (
        <div className="image-proc">
            <div className="file-wrapper">
                <FileSelect
                    buttonTitle="Select file"
                    onChange={handleFileChange}
                    accept="image/jpg, image/jpeg, image/png" 
                />
            </div>
            <div className="image-wrapper">
                <Image alt="original" src={userImage.original.objectUrl} fallback={NoPhoto} />
            </div>
            <div className="image-wrapper">
                <Image alt="resized-quantized" src={userImage.copy.objectUrl} fallback={NoPhoto} rendering="pixelated"/>
            </div>            
        </div>
    )
}