import {createStore} from 'redux';

export default function () {

    // if initial val not provided this is the initial state
    const initialState =  15; // recommended to initial initial state as constant & pass it as default argument bcz store needs initial state only first time aftre that store will override the initial state and handle the opertaions of state for all future state change

    // state is the old state and action is new state value
    const reducer = (state = initialState, action) => {
        console.log(state);
        switch (action.type) {
            case 'ADD':
                state = state + action.payload;
                break;
            case 'SUBTRACT':
                state = state - action.payload;
                break;
            default:
                break;
        }
        return state; // we always have to return some state if anything doesn't match, so better return initial state.

    };

    // creating store at only one time
    const store = createStore(reducer, 10); // 2nd argument is optional if u want to pass initial state of the component first time.
    // Recommended to pass initial state as the default argument (es6 syntax) bcz store needs initial state only at first time.after that store will handle all state changes in future


    // subscribing the store to get new state on change
    store.subscribe(() => {
        const result = store.getState(); // store will give new state if a dispatch() request is sent
        console.log('New State', result);
    });

    // dispatching the new state which will be handled by redux and result will be saved into store directly
    store.dispatch({
        type: 'ADD',
        payload: 20
    });

    store.dispatch({
        type: 'ADD',
        payload: 40
    });

    store.dispatch({
        type: 'SUBTRACT',
        payload: 5
    });

    store.dispatch({
        type: 'SUBTRACT',
        payload: 6
    });

}

