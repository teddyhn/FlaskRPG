import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import DialogueBox from '../dialogue'
import Map from '../map'
import MapObscure from '../map/obscure'
import MapOverlay from '../map/overlay'
import Player from '../player'
import store from '../../config/store'

import '../../config/tiles.css'
import { BE_URL, token } from '../../config/constants'
import { b, bl, l, r, rb, rbl, rl, t, tb, tbl, tl, tr, trb, trbl, trl } from '../../data/maps'

function World(props) {
    const [currentRoom, setCurrentRoom] = useState([])

    const proxyurl = "http://localhost:8080/"

    const fetchCurrentRoom = async () => {
        await axios.get(proxyurl + BE_URL + 'api/adv/init', {
            headers: {
                Authorization: 'Token ' + token
            }
        }).then(res => {
            setCurrentRoom(res.data.exits)
        })
    }

    const determineRoomRender = (exits) => {
        const sortedExits = exits.sort().toString().split(',').join('')

        switch(sortedExits) {
            case 's':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: b
                    }
                })
                return b
            case 'sw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: bl
                    }
                })
                return bl
            case 'w':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: l
                    }
                })
                return l
            case 'e':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: r
                    }
                })
                return r
            case 'es':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: rb
                    }
                })
                return rb
            case 'esw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: rbl
                    }
                })
                return rbl
            case 'ew':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: rl
                    }
                })
                return rl
            case 'n':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: t
                    }
                })
                return t
            case 'ns':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: tb
                    }
                })
                return tb
            case 'nsw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: tbl
                    }
                })
                return tbl
            case 'nw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: tl
                    }
                })
                return tl
            case 'en':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: tr
                    }
                })
                return tr
            case 'ens':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: trb
                    }
                })
                return trb
            case 'ensw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: trbl
                        
                    }
                })
                return trbl
            case 'enw':
                store.dispatch({
                    type: 'TRAVERSE_ROOM',
                    payload: {
                        currentRoom: trl
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
                display: 'flex',
                height: '100vh',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(41, 38, 52)'
            }}
        >
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
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.map
    }
}

export default connect(mapStateToProps)(World)