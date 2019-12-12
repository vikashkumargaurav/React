const initialState = {
    result: 1,
    lastValues: []
};

const mathReducer = (state = initialState, action) => {

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

export default mathReducer;