import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Image from "../../atoms/Image";
import FileSelect from "../../molecules/FileSelect";
import NoPhoto from "../../../assets/images/no-photo.png";

import "./Main.css";
import { imageToAscii } from "../../../utils";

export function Main(props) {
    const dispatch = useDispatch();
    const userImage = useSelector(state => state.image);
    const asciiImage = useSelector(state => state.text);

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
        <div>
            <h1>Main page</h1>
            <FileSelect
                buttonTitle="Select file"
                onChange={handleFileChange}
                accept="image/jpg, image/jpeg, image/png" 
            />
            <br />

            <Image alt="original" src={userImage.original.objectUrl} fallback={NoPhoto} />
            <Image alt="original" src={userImage.copy.objectUrl} fallback={NoPhoto} rendering="pixelated"/>
            
            <div 
                className="ascii-art"
                dangerouslySetInnerHTML={{__html: asciiImage.html}}
            ></div>
            {/* <textarea defaultValue={asciiImage}></textarea> */}
        </div>
    )
}