const initialState = {
    inventory: [],
    show: false
}

const inventoryReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_INVENTORY':
            return {
                ...state,
                ...action.payload
            }
        case 'SHOW_INVENTORY':
            return {
                ...state,
                show: action.payload
            }
        default:
            return state
    }
}

export default inventoryReducer