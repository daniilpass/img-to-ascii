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
        <div className="file-select">
            <label onClick={hanldeLabelClick}>
                <Input 
                    type="file"
                    onChange={onChange}
                    accept={accept}
                />
                <Button title={buttonTitle} />
            </label>
        </div>
        
    )
}