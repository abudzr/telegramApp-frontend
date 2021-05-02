const initialState = {
    message: [],
    loading: false,
    error: "",
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_MESSAGES":
            return {
                ...state,
                message: action.payload,
            };
        case "DELETE_MESSAGES":
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
};

export default messageReducer;
