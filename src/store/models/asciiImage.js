import { asciiConverterParams } from "../../settings";

export const asciiImage = {
    state: {
        raw: null,
        html: null,
        settings: {
            fontFamily: asciiConverterParams.defaultFontFamily,
            fontSize: asciiConverterParams.defaultFontSize,
            lineHeight: asciiConverterParams.defaultFontSize - 2,
            color: asciiConverterParams.defaultColor,
            backgroundColor: asciiConverterParams.defaultBackgroundColor
        }
    },
    reducers: {
        setText: (state, payload) => {
            let raw = payload || "";
            let html = raw
                .replaceAll("&","&amp;")
                .replaceAll('"',"&quot;")                
                .replaceAll(" ","&nbsp;")
                .replaceAll("<","&lt;")
                .replaceAll(">","&gt;")                
                .replaceAll("\n","<br/>");
            return {
                ...state,
                raw: raw,
                html: html
            };
        },
        setFontSize: (state, fontSize) => {
            return {
                ...state,
                settings: {
                    ...state.settings,
                    fontSize: fontSize,
                    lineHeight: fontSize - 2
                }
            };
        }
    }
}