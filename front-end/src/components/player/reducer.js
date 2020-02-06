const initialState = {
    position: [160, 128],
    hidden: false,
    disableMovement: false
}

const playerReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'MOVE_PLAYER':
            return {
                ...state,
                ...action.payload
            }
        case 'REVEAL_PLAYER':
            return {
                ...state,
                hidden: false
            }
        case 'DISABLE_MOVEMENT':
            return {
                ...state,
                disableMovement: true
            }
        case 'ENABLE_MOVEMENT':
            return {
                ...state,
                disableMovement: false
            }
        default:
            return state
    }
}

export default playerReducer