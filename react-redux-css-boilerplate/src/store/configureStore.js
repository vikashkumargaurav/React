import HomeReducer from './reducers/home-reducer'
import thunk from 'redux-thunk'
import {applyMiddleware, combineReducers, createStore, compose} from "redux";


const rootReducers = combineReducers({
    home: HomeReducer, // home is a reducer
});

let composeEnhancers = compose;


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // REDUX DEBUGGER INTEGRATION
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
} else {
    // production code
}


const configureStore = () => {
    return createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))
};

export default configureStore

