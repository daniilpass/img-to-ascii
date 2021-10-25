import React from "react";

import "./Select.css";

export function Select(props) {
    const {
        options = [],
        defaultValue,
        onChange
     } = props;

    return (
        <select
            className="select"
            defaultValue={defaultValue}
            onChange={onChange}
        >
            {
                options.map((item) => (
                    <option key={item.value} value={item.value}>{item.title}</option>
                ))
            }            
        </select>
    )
}