import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Image from "../../atoms/Image";
import FileSelect from "../../molecules/FileSelect";
import Range from "../../molecules/Range";
import NoPhoto from "../../../assets/images/no-photo.png";

import "./ImageProcessor.css";
export function ImageProcessor(props) {    
    const dispatch = useDispatch();
    const userImage = useSelector(state => state.image); 

    useEffect(() => {
        dispatch.image.asyncProcessUserImage();
    }, [userImage.settings]);

    const handleFileChange = (e) => {
        let file = e.target.files[0];
        if (!file) {
            return;
        }

        dispatch.image.asyncLoadUserImage(file);            
    }

    const handleMaxWidthHeightChange = (value) => {
        dispatch.image.setMaxSize({
            width:value, 
            height: value
        })
    }

    return (
        <div className="image-proc">
            <div className="file-wrapper">
                <FileSelect
                    buttonTitle="Select file"
                    onChange={handleFileChange}
                    accept="image/jpg, image/jpeg, image/png" 
                />
                <Range min="1" max="512" initValue="200" onChange={handleMaxWidthHeightChange} />
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