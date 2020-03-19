const initialState = {
    stock: [],
    show: false,
    shopTab: ''
}

const shopReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_SHOP_STOCK':
            return {
                ...state,
                ...action.payload
            }
        case 'SHOW_SHOP':
            return {
                ...state,
                show: action.payload
            }
        case 'SET_SHOP_TAB':
            return {
                ...state,
                shopTab: action.payload
            }
        default:
            return state
    }
}

export default shopReducer