const initialState = {
    currentRoom: null
}

const mapReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'TRAVERSE_ROOM':
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default mapReducer