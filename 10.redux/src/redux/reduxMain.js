// how to work with redux


import {createStore, combineReducers, applyMiddleware} from "redux";
import reduxLogger from 'redux-logger'; // useful for logging states (optional)


const mathComponentInitialState = {
    result: 1,
    lastValues: []
};

// state is the old state and action is the value given by user
const mathReducer = (state = mathComponentInitialState, action) => {

    // console.log(state); // state will represent current state stored in store. it overrides previous state every time after dispatch() request

    switch (action.type) {
        case 'ADD':
            state = {
                ...state, // ( creating immutable object) creating a brand new object and overriding whatever properties needs to be overridden so we can't change state directly
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload] // immutable array bcz it will point to new memory reference
            };
            // state.lastValues.push(action.payload); // (it is mutable (wrong way) ) bcz state.lastvalue[] is an array inside object, and spread operator only creates copy of the object not the nested object/properties. so u need to create one more spread operator  to copy the old array otherwise the array will point to the same memory location again...
            break;
        case 'SUBTRACT':
            state = {
                ...state, // copying obj with all property, below we only modify those properties which we want to change other properties will remain same
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload] // immutable array bcz it will point to new memory reference
            };
            // state.lastValues.push(action.payload); // (it is mutable (wrong way) ) bcz state.lastvalue[] is an array inside object, and spread operator only creates copy of the object not the nested object/properties. so u need to create one more spread operator  to copy the old array otherwise the array will point to the same memory location again...
            break;
        default:
            break;
    }
    return state; // we always have to return some state if anything doesn't match...

};


const userReducer = (state = {name: 'Alex', age: 24}, action) => {

    switch (action.type) {
        case 'SET_NAME':
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

// proper structure of redux middle ware
const myLogger = (store) => (next) => (action) => {
    console.log('Logged action', action);
    next(action); // necessary to execute further code;
};


// creating store with multiple reducers  at a time
const store = createStore(
    combineReducers({mathReducer, userReducer}), // chaining multiple reducers
    {},  // initial state, 2nd argument is optional if u want to pass component initial state or directly define while creating reducer()
    applyMiddleware(myLogger /*,reduxLogger*/) // using middleware before changing the state (we can pass array of middle ware )
);

// subscribing the store to get new state on change (react will use 'mapsStateToProps' to map received state into component  )
store.subscribe(() => {
    const result = store.getState(); // get state will give new state and automatically set new state  if a store is disaptched
    console.log('New State', result);
});


// dispatching the new state
store.dispatch({
    type: 'ADD',
    payload: 20
});

// every time we dispatch() a request store will override previous state based on logic provided by user
// react will use 'mapsDispatchToProps' to dispatch new props
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

store.dispatch({
    type: 'SET_NAME',
    payload: 'Vikash'
});
