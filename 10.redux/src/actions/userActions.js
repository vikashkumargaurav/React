export function setName(name) {

    // case 1 : synchronous return
    // return {
    //     type: 'SET_NAME',
    //     payload: name
    // };

    // case 2 : asynchronous operation using call back (handled by 'redux-thunk' 3rd party package)
    // return dispatch => {
    //     setTimeout(() => {
    //         // executes asynchronously after 3 seconds
    //         dispatch({
    //             type: 'SET_NAME',
    //             payload: name
    //         });
    //     }, 3000);
    // };

    // case 3 : asynchronous operation using promise supported apis (handled by 'redux-promise-middleware' 3rd party package)
    return {
        type: 'SET_NAME',
        payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(name);
            }, 2000);
        })
    };
    //    if promises will be used in asynchronous operations then on success action name will be automatically prefixes by
    //    '_FULFILLED' in the end so in this case new action name is 'SET_NAME_FULFILLED'. so we need to handle this action in reducers
}

export function setAge(age) {
    return {
        type: 'SET_AGE',
        payload: age
    }
}