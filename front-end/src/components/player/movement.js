import axios from 'axios'
import store from '../../config/store'
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH, BE_URL } from '../../config/constants'

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

    async function observeRoomTraversal(oldPos, direction) {
        const currentRoom = store.getState().map.currentRoom
        const exits = currentRoom.exits
        const x = oldPos[0]
        const y = oldPos[1]

        const newPos = getNewPosition(direction)

        const x2 = newPos[0]
        const y2 = newPos[1]

        const proxyurl = "http://localhost:8080/"
        const token = '737724f7274afa224d652d1bbc46e1e9f2ad728f'
        
        if (x2 >= MAP_WIDTH && exits.includes("EAST")) {
            await axios({
                method: 'post',
                url: proxyurl + BE_URL + 'api/adv/move',
                headers: {
                    Authorization: 'Token ' + token
                },
                data: {
                    direction: 'e'
                }
            })

            store.dispatch({
                type: 'TRAVERSE_ROOM',
                payload: {
                    currentRoom: null
                }
            })

            return [0, y]
        }

        if (x2 < 0 && exits.includes("WEST")) {
            await axios({
                method: 'post',
                url: proxyurl + BE_URL + 'api/adv/move',
                headers: {
                    Authorization: 'Token ' + token
                },
                data: {
                    direction: 'w'
                }
            })

            store.dispatch({
                type: 'TRAVERSE_ROOM',
                payload: {
                    currentRoom: null
                }
            })

            return [MAP_WIDTH - 16, y]
        }

        if (y2 >= MAP_HEIGHT && exits.includes("SOUTH")) {
            await axios({
                method: 'post',
                url: proxyurl + BE_URL + 'api/adv/move',
                headers: {
                    Authorization: 'Token ' + token
                },
                data: {
                    direction: 's'
                }
            })

            store.dispatch({
                type: 'TRAVERSE_ROOM',
                payload: {
                    currentRoom: null
                }
            })

            return [x, 0]
        }

        if (y2 < 0 && exits.includes("NORTH")) {
            await axios({
                method: 'post',
                url: proxyurl + BE_URL + 'api/adv/move',
                headers: {
                    Authorization: 'Token ' + token
                },
                data: {
                    direction: 'n'
                }
            })

            store.dispatch({
                type: 'TRAVERSE_ROOM',
                payload: {
                    currentRoom: null
                }
            })

            return [x, MAP_HEIGHT - 16]
        }

        return false
    }

    async function dispatchMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(direction)
        const roomId = store.getState().map.roomId

        console.log(roomId)

        const roomTraverseXY = observeRoomTraversal(oldPos, direction)

        const proxyurl = "http://localhost:8080/"
        const token = '737724f7274afa224d652d1bbc46e1e9f2ad728f'

        if (roomTraverseXY) {
            let newRoomId = roomId

            await axios.get(proxyurl + BE_URL + 'api/adv/init', {
                    headers: {
                        Authorization: 'Token ' + token
                    }
                }).then(res => newRoomId = res.data.id)

            console.log(newRoomId)

            while (true) {
                if (roomId !== newRoomId) {
                    return (
                        store.dispatch({
                                type: 'MOVE_PLAYER',
                                payload: {
                                    position: roomTraverseXY
                            }
                        })
                    )
                    break
                } else return (
                    store.dispatch({
                        type: 'MOVE_PLAYER',
                        payload: {
                            position: oldPos
                        }
                    })
                )
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