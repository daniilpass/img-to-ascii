export const asciiImage = {
    state: {
        raw: null,
        html: null
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
        }
    }
}