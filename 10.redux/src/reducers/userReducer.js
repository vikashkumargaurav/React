const userReducer = (state = {name: 'Alex', age: 24}, action) => {

    // console.log(state);

    switch (action.type) {
        case 'SET_NAME': // SET_NAME when the request type is synchronous, asynchronous (only callback (redux-thunk))
            state = {
                ...state,
                name: action.payload
            };
            break;
        case 'SET_NAME_FULFILLED': // SET_NAME_FULFILLED when promises are handled by redux middleware
            state = {
                ...state,
                name: action.payload
            };
            break;
        case 'SET_AGE':
            state = {
                ...state,
                age: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};


export default userReducer;