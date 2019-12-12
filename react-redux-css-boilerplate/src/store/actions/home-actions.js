import {
    SET_USER
} from './actionTypes'


export const setName = (name, email) => {
    return ((dispatch, state) => {
        dispatch({
            type: SET_USER,
            payload: {
                name,
                email
            }
        });
    });

};
