import axios from 'axios'
import { BE_URL } from '../../config/constants'
import store from '../../config/store'
import { SPRITE_SIZE } from '../../config/constants'

export default function handleInteraction(direction) {
    const token = localStorage.getItem("token")

    function getNewPosition(oldPos, direction) {
        switch(direction) {
            case 'LEFT':
                return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ]
            case 'RIGHT':
                return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ]
            case 'UP':
                return [ oldPos[0], oldPos[1]-SPRITE_SIZE ]
            case 'DOWN':
                return [ oldPos[0], oldPos[1]+SPRITE_SIZE ]
            default:
                return
        }
    }

    function handleInteract(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)

        const x = newPos[0] / 16
        const y = newPos[1] / 16

        const currentRoom = store.getState().map.currentRoom
        const isShow = store.getState().dialogue.show
        const itemsOpen = store.getState().items.show
        const shopOpen = store.getState().shop.show

        if (itemsOpen || shopOpen) {
            return
        }

        if (isShow) {
            const nextTile = currentRoom.overlay[y][x]
            const target = nextTile.slice(0, nextTile.indexOf('-'))

            if (target === 'mushroom' || target === 'stump' || target === 'tree' || target === 'treasure') {
                store.dispatch({
                    type: 'SHOW_ITEMS',
                    payload: true
                })

                axios.get(BE_URL + 'api/adv/init/', {
                    headers: {
                        Authorization: 'Token ' + token
                    }
                }).then(res => {
                    store.dispatch({
                        type: 'SET_ITEMS',
                        payload: {
                            items: res.data.items
                        }
                    })
                })
            }

            if (target === 'flask') {
                store.dispatch({
                    type: 'SHOW_SHOP',
                    payload: true
                })
            }

            return store.dispatch({
                type: 'SET_CONTEXT',
                payload: {
                    show: false,
                    context: ''
                }
            })
        }

        if (typeof currentRoom.overlay[y][x] ==='string') {
            
            // If target is shopkeeper, handle logic for store

            const nextTile = currentRoom.overlay[y][x]
            const target = nextTile.slice(0, nextTile.indexOf('-'))

            if (target === 'mushroom' || target === 'stump' || target === 'tree' || target === 'treasure') {
                store.dispatch({
                    type: 'SET_CONTEXT',
                    payload: {
                        show: true,
                        context: target
                    }
                })
            }

            if (target === 'flask') {
                store.dispatch({
                    type: 'SET_CONTEXT',
                    payload: {
                        show: true,
                        context: 'Flask'
                    }
                })
            }
        }
    }

    handleInteract(direction)
}