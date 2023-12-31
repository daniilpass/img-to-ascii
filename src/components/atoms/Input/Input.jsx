import React from "react";

import "./Input.css"

export function Input(props) 
{
    return (
        <input  {...props} className={`input ${props.className}`.trim()}></input>
    )
}