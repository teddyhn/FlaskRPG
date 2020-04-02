const initialState = {
    facing: 'DOWN',
    position: [160, 128],
    hidden: false,
    disableMovement: false,
    currentRoomId: null
}

const playerReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_FACING':
            return {
                ...state,
                ...action.payload
            }
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
        case 'SET_CURRENT_ROOM_ID':
            return {
                ...state,
                currentRoomId: action.payload
            }
        default:
            return state
    }
}

export default playerReducer