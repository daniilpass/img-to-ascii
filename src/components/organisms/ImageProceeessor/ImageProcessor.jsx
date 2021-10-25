import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { imageProcessorParams, palettes } from "../../../settings";
import Image from "../../atoms/Image";
import Label from "../../atoms/Label";
import Select from "../../atoms/Select";
import FileSelect from "../../molecules/FileSelect";
import PaletteView from "../../atoms/PaletteView";
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

    const handlePaletteChange = (e) => {
        const value = e.target.value;
        dispatch.image.setPalette(value);
    }

    const colorsCountOptions = palettes.map((item, index) => (
        {
            value: index,
            title: item.name
        }
    ));

    return (
        <div className="image-proc">
            <div className="processing-settings">
                <Label text="Upload image">
                    <FileSelect
                        buttonTitle="Select file"
                        onChange={handleFileChange}
                        accept="image/jpg, image/jpeg, image/png" 
                    />
                </Label>

                <Label text="Max width/height">
                    <Range
                        min={imageProcessorParams.processedImageMinWidth}
                        max={imageProcessorParams.processedImageMaxWidth}
                        initValue={userImage.settings.maxWidth}
                        onChange={handleMaxWidthHeightChange}
                    />
                </Label>

                <Label text="Palette">
                    <Select
                        options={colorsCountOptions}
                        defaultValue={userImage.settings.palette}
                        onChange={handlePaletteChange}
                    />
                    <PaletteView colors={palettes[userImage.settings.palette].colors}/>
                </Label>
                
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