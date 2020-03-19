const initialState = {
    currentRoom: null,
    loading: false
}

const mapReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'TRAVERSE_ROOM':
            return {
                ...state,
                ...action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

export default mapReducer