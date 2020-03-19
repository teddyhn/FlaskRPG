const initialState = {
    items: [],
    show: false
}

const itemsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                ...action.payload
            }
        case 'SHOW_ITEMS':
            return {
                ...state,
                show: action.payload
            }
        default:
            return state
    }
}

export default itemsReducer