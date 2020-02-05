import { b, bl, l, r, rb, rbl, rl, t, tb, tbl, tl, tr, trb, trbl, trl } from '../../data/maps'

const rooms = [ b, bl, l, r, rb, rbl, rl, t, tb, tbl, tl, tr, trb, trbl, trl ]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

const initialState = {
    currentRoom: rooms[getRndInteger(0, 16)]
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