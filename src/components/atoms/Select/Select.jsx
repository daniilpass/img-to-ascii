import React from "react";

export function Select(props) {
    const {
        options = [],
        defaultValue,
        onChange
     } = props;

    return (
        <select
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