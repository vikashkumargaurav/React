import {
    SET_USER
} from '../actions/actionTypes'

const initialState = {
    name: '',
    email: ''
};

const reducers = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email
            };

        default:
            break;
    }
    return state;
};

export default reducers