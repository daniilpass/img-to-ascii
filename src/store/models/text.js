export const text = {
    state: {
        raw: null,
        html: null
    },
    reducers: {
        setText: (state, payload) => {
            return {
                ...state,
                raw: payload && payload,
                html: payload && payload.replaceAll("\n","<br/>").replaceAll(" ","&nbsp;")
            };
        }
    }
}