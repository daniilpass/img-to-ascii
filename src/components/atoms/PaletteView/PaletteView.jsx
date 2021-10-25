import React from "react";

import "./PaletteView.css";

export function PaletteView(props) {
    const {
        colors = []
    } = props;

    const getFillStyle = (color) => {
        return {
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`
        }
    }
    
    return (
        <div className="palette-view">
            {
                colors.map(x => (
                    <div
                        className="palette-view__color"
                        key={`${x.r}${x.g}${x.b}`}
                        style={getFillStyle(x)}
                    ></div>
                ))
            }
        </div>
    )
}