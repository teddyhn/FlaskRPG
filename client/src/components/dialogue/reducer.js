const initialState = {
    show: false,
    context: ''
}

const dialogueReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_CONTEXT':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default dialogueReducer