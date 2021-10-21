import React from "react";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

import "./FileSelect.css";

export function FileSelect({buttonTitle, onChange, accept}){

    const hanldeLabelClick = (e) => {
        if(e.target !== e.currentTarget) 
            e.currentTarget.click();
    }

    return (
        <label 
            className="file-select"
            onClick={hanldeLabelClick}
        >
            <Input 
                type="file"
                onChange={onChange}
                accept={accept}
            />
            <Button title={buttonTitle} />
        </label>
    )
}