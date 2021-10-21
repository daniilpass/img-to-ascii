import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FileSelect from "../../molecules/FileSelect";

import "./Main.css";
export function Main(props) {
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
        console.log("Loaded user image", userImage.original);
    }, [userImage.original]);

    return (
        <div>
            <h1>Main page</h1>
            <FileSelect
                buttonTitle="Select file"
                onChange={handleFileChange}
                accept="image/jpg, image/jpeg, image/png" 
            />
            {
                userImage.original.objectUrl
                ? <img alt="original" src={userImage.original.objectUrl}></img>
                : <></>
            }
            {
                userImage.copy.objectUrl
                ? <img alt="original" src={userImage.copy.objectUrl}></img>
                : <></>
            }
            
        </div>
    )
}