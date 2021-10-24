import React, { useState } from "react";
import Input from "../../atoms/Input";

import "./Range.css";

export function Range(props) {
    const {
        initValue = 5,
        min = 0,
        max = 10,
        step = 1,
        list,
    } = props;

    const [value, setValue] = useState(initValue);

    const handleOnChange = (e) => {
        let newValue = Number(e.target.value);
        if (newValue < min) {
            newValue = min;
        } else if (newValue > max) {
            newValue = max;
        }

        setValue(newValue);
        props.onChange && props.onChange(newValue);
    }

    return (
        <div className="range">
            <Input
                className="range__range-input" 
                type="range"
                value={value}
                list={list}
                min={min}
                max={max}
                step={step}
                onChange={handleOnChange}
            />
            <Input
                className="range__number-input" 
                type="number"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={handleOnChange}
            />
        </div>
    )
}