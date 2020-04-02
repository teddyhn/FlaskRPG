const initialState = {
    inventory: [],
    show: false,
    money: 0
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
        case 'SET_MONEY':
            return {
                ...state,
                money: action.payload
            }
        default:
            return state
    }
}

export default inventoryReducer