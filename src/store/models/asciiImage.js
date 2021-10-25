import { asciiConverterParams } from "../../settings";

export const asciiImage = {
    state: {
        raw: null,
        html: null,
        settings: {
            fontSize: asciiConverterParams.defaultFontSize
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
                }
            };
        }
    }
}