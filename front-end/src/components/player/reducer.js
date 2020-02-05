const initialState = {
    position: [160, 128],
    hidden: false
}

const playerReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'MOVE_PLAYER':
            return {
                ...action.payload
            }
        case 'REVEAL_PLAYER':
            return {
                ...state,
                hidden: false
            }
        default:
            return state
    }
}

export default playerReducer