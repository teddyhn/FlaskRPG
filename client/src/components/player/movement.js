import axios from 'axios'
import store from '../../config/store'
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH, BE_URL, token } from '../../config/constants'

export default function handleMovement(direction) {

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
        const currentRoom = store.getState().map.currentRoom
        const x = newPos[0] / 16
        const y = newPos[1] / 16
        
        if (y < 0 || y > 14 || x < 0 || x > 19) {
            return true
        }

        if (typeof currentRoom.tiles[y][x] == 'string') {
            if (currentRoom.tiles[y][x].endsWith('obs')) {
                return true
            }
        }

        if (typeof currentRoom.overlay[y][x] == 'string') {
            if (currentRoom.overlay[y][x].endsWith('obs')) {
                return true
            } 
        }

        if (currentRoom.tiles[y][x] === 0) {
            return true
        }

        return false
    }

    function observeRoomTraversal(oldPos, direction) {
        const currentRoom = store.getState().map.currentRoom
        const exits = currentRoom.exits

        const x = oldPos[0]
        const y = oldPos[1]

        const newPos = getNewPosition(direction)

        const x2 = newPos[0]
        const y2 = newPos[1]
        
        if (x2 >= MAP_WIDTH && exits.includes("EAST")) {
            return { coords: [0, y], direction: "EAST" }
        }

        if (x2 < 0 && exits.includes("WEST")) {
            return { coords: [MAP_WIDTH - 16, y], direction: "WEST" }
        }

        if (y2 >= MAP_HEIGHT && exits.includes("SOUTH")) {
            return { coords: [x, 0], direction: "SOUTH"}
        }

        if (y2 < 0 && exits.includes("NORTH")) {
            return { coords: [x, MAP_HEIGHT - 16], direction: "NORTH" }
        }

        return false
    }

    async function dispatchMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(direction)

        const roomTraverseXY = observeRoomTraversal(oldPos, direction)

        if (roomTraverseXY) {

            store.dispatch({ type: 'HIDE_PLAYER' })

            store.dispatch({ type: 'DISABLE_MOVEMENT' })

            store.dispatch({ type: 'SET_LOADING', payload: true })

            switch(roomTraverseXY.direction) {
                case ("EAST"):
                    await axios({
                        method: 'post',
                        url: BE_URL + 'api/adv/move/',
                        headers: {
                            Authorization: 'Token ' + token
                        },
                        data: {
                            direction: 'e'
                        }
                    })

                    await store.dispatch({
                        type: 'TRAVERSE_ROOM',
                        payload: {
                            currentRoom: null
                        }
                    })

                    await store.dispatch({ 
                        type: 'SET_LOADING', 
                        payload: false 
                    })

                    await store.dispatch({ type: 'ENABLE_MOVEMENT' })

                    return await store.dispatch({
                        type: 'MOVE_PLAYER',
                        payload: {
                            position: roomTraverseXY.coords,
                            hidden: true
                        }
                    })

                case ("WEST"):
                    await axios({
                        method: 'post',
                        url: BE_URL + 'api/adv/move/',
                        headers: {
                            Authorization: 'Token ' + token
                        },
                        data: {
                            direction: 'w'
                        }
                    })

                    await store.dispatch({
                        type: 'TRAVERSE_ROOM',
                        payload: {
                            currentRoom: null
                        }
                    })

                    await store.dispatch({ 
                        type: 'SET_LOADING', 
                        payload: false 
                    })
                    
                    await store.dispatch({ type: 'ENABLE_MOVEMENT' })

                    return await store.dispatch({
                        type: 'MOVE_PLAYER',
                        payload: {
                            position: roomTraverseXY.coords,
                            hidden: true
                        }
                    })

                case ("SOUTH"):
                    await axios({
                        method: 'post',
                        url: BE_URL + 'api/adv/move/',
                        headers: {
                            Authorization: 'Token ' + token
                        },
                        data: {
                            direction: 's'
                        }
                    })

                    await store.dispatch({
                        type: 'TRAVERSE_ROOM',
                        payload: {
                            currentRoom: null
                        }
                    })

                    await store.dispatch({ 
                        type: 'SET_LOADING', 
                        payload: false 
                    })
                    
                    await store.dispatch({ type: 'ENABLE_MOVEMENT' })

                    return await store.dispatch({
                        type: 'MOVE_PLAYER',
                        payload: {
                            position: roomTraverseXY.coords,
                            hidden: true
                        }
                    })

                case ("NORTH"):
                    await axios({
                        method: 'post',
                        url: BE_URL + 'api/adv/move/',
                        headers: {
                            Authorization: 'Token ' + token
                        },
                        data: {
                            direction: 'n'
                        }
                    })

                    await store.dispatch({
                        type: 'TRAVERSE_ROOM',
                        payload: {
                            currentRoom: null
                        }
                    })

                    await store.dispatch({ 
                        type: 'SET_LOADING', 
                        payload: false 
                    })
                    
                    await store.dispatch({ type: 'ENABLE_MOVEMENT' })

                    return await store.dispatch({
                        type: 'MOVE_PLAYER',
                        payload: {
                            position: roomTraverseXY.coords,
                            hidden: true
                        }
                    })

                default:
                    return
            }
        }

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

    function handleMove(direction) {

        // If player movement is disabled, escape from function
        const disabled = store.getState().player.disableMovement
        if (disabled) {
            return
        }

        switch(direction) {
            case 'LEFT':
                return dispatchMove('WEST')
            case 'UP':
                return dispatchMove('NORTH')
            case 'RIGHT':
                return dispatchMove('EAST')
            case 'DOWN':
                return dispatchMove('SOUTH')
            default:
                return
        }
    }

    handleMove(direction)

    return
}