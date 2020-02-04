import store from '../../config/store'
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../../config/constants'
import { tiles, overlay } from '../../data/maps/trbl'

export default function handleMovement(player) {

    function getNewPosition(direction) {
        const oldPos = store.getState().player.position
        switch(direction) {
            case 'WEST':
                return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ]
            case 'EAST':
                return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ]
            case 'NORTH':
                return [ oldPos[0], oldPos[1]-SPRITE_SIZE ]
            case 'SOUTH':
                return [ oldPos[0], oldPos[1]+SPRITE_SIZE ]
            default:
                return
        }
    }

    function observeBoundaries(oldPos, newPos) {
        return  (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
                (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
                ? newPos : oldPos
    }

    function observeObstacles(newPos) {
        const x = newPos[0] / 16
        const y = newPos[1] / 16
        
        if (y < 0 || y > 14 || x < 0 || x > 19) {
            return true
        }

        if (typeof tiles[y][x] == 'string') {
            if (tiles[y][x].endsWith('obs')) {
                return true
            }
        }

        if (typeof overlay[y][x] == 'string') {
            if (overlay[y][x].endsWith('obs')) {
                return true
            } 
        }

        if (tiles[y][x] === 0) {
            return true
        }

        return false
    }

    function dispatchMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(direction)

        if (observeObstacles(newPos)) {
            return store.dispatch({
                        type: 'MOVE_PLAYER',
                        payload: {
                            position: oldPos
                        }
                    })
        }

        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: observeBoundaries(oldPos, newPos)
            }
        })
    }

    function handleKeydown(e) {
        e.preventDefault()

        switch(e.keyCode) {
            case 37:
                return dispatchMove('WEST')
            case 38:
                return dispatchMove('NORTH')
            case 39:
                return dispatchMove('EAST')
            case 40:
                return dispatchMove('SOUTH')
            default:
                return
        }
    }

    window.addEventListener('keydown', e => {
        handleKeydown(e)
    })

    return player
}