import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import DialogueBox from '../dialogue'
import Map from '../map'
import MapObscure from '../map/obscure'
import MapOverlay from '../map/overlay'
import Player from '../player'
import store from '../../config/store'

import { BE_URL } from '../../config/constants'
import { b, bl, l, r, rb, rbl, rl, t, tb, tbl, tl, tr, trb, trbl, trl } from '../../data/maps'

function World(props) {
    const [currentRoom, setCurrentRoom] = useState([])
    const [roomId, setRoomId] = useState()

    const proxyurl = "http://localhost:8080/"
    const token = '737724f7274afa224d652d1bbc46e1e9f2ad728f'

    const fetchCurrentRoom = async () => {
        await axios.get(proxyurl + BE_URL + 'api/adv/init', {
            headers: {
                Authorization: 'Token ' + token
            }
        }).then(res => {
            setCurrentRoom(res.data.exits)
            setRoomId(res.data.id)
        })
    }

    const determineRoomRender = (exits) => {
        const sortedExits = exits.sort().toString().split(',').join('')

        switch(sortedExits) {
            case 's':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: b,
                        roomId: roomId
                    }
                })
                return b
            case 'sw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: bl,
                        roomId: roomId
                    }
                })
                return bl
            case 'w':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: l,
                        roomId: roomId
                    }
                })
                return l
            case 'e':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: r,
                        roomId: roomId
                    }
                })
                return r
            case 'es':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: rb,
                        roomId: roomId
                    }
                })
                return rb
            case 'esw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: rbl,
                        roomId: roomId
                    }
                })
                return rbl
            case 'ew':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: rl,
                        roomId: roomId
                    }
                })
                return rl
            case 'n':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: t,
                        roomId: roomId
                    }
                })
                return t
            case 'ns':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: tb,
                        roomId: roomId
                    }
                })
                return tb
            case 'nsw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: tbl,
                        roomId: roomId
                    }
                })
                return tbl
            case 'nw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: tl,
                        roomId: roomId
                    }
                })
                return tl
            case 'en':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: tr,
                        roomId: roomId
                    }
                })
                return tr
            case 'ens':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: trb,
                        roomId: roomId
                    }
                })
                return trb
            case 'ensw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: trbl,
                        roomId: roomId
                    }
                })
                return trbl
            case 'enw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: trl,
                        roomId: roomId
                    }
                })
                return trl
            default:
                return trbl
        }
    }

    const renderRoom = (room) => {
        return (
            <>
                <DialogueBox /> 
                <Map tiles={room.tiles} />
                <MapOverlay overlay={room.overlay} />
                <MapObscure obscure={room.obscure} />
                <Player />
            </>
        )
    }

    useEffect(() => {
        fetchCurrentRoom()
    }, [props.currentRoom])

    return (
        <div
            style={{
                position: 'relative',
                width: '320px',
                height: '240px',
                transform: 'scale(2)'
            }}
        >
            {/* Add loading animation to room render if necessary (it probably will be) */}
            {currentRoom.length ? renderRoom(determineRoomRender(currentRoom)) : null}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.map
    }
}

export default connect(mapStateToProps)(World)