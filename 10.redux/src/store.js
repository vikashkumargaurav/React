// proper structure of redux middle ware

import {applyMiddleware, combineReducers, createStore} from "redux";
import mathReducer from './reducers/mathReducer';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk'; // used for asynchronous action handling
import reduxPromise from 'redux-promise-middleware'; // used for promise handling




const myLogger = (store) => (next) => (action) => {
    console.log('Logged action', action);
    next(action); // necessary to execute further code;
};

// creating store with multiple reducers  at a time
export default createStore(
    combineReducers({
        math: mathReducer,
        user: userReducer
    }), // chaining multiple reducers
    {},  // initial state, 2nd argument is optional if u want to pass component initial state or directly define while creating reducer()
    applyMiddleware( myLogger , thunk, reduxPromise /*reduxLogger()*/) // using middleware before changing the state (we can pass array of middle ware )
);






// subscribing the store to get new state on change
// store.subscribe(() => {
//     const result = store.getState(); // get state will give new state and automatically set new state  if a store is disaptched
//     console.log('New State', result)});
