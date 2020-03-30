const initialState = {
    load: false
}

const worldReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_WORLD':
            return {
                load: true
            }
        default:
            return state
    }
}

export default worldReducer