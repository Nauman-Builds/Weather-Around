
intialState = [];

export const ApiReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'GetApiData':
            return {...state, state: action.payload} 
        default:
            return state
    }
}
