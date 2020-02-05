import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DialogueBox from '../dialogue'
import Map from '../map'
import MapObscure from '../map/obscure'
import MapOverlay from '../map/overlay'
import Player from '../player'

import { BE_URL } from '../../config/constants'
import { b, bl, l, r, rb, rbl, rl, t, tb, tbl, tl, tr, trb, trbl, trl } from '../../data/maps'

function World(props) {
    const [currentRoom, setCurrentRoom] = useState([])

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const fetchCurrentRoom = async () => {
        await axios.get(proxyurl + BE_URL + 'api/adv/init', {
            headers: {
                Authorization: 'Token ' + '98ea7d794810c0a1642f4ddfeee4b7aecdeda9da'
            }
        }).then(res => setCurrentRoom(res.data.exits))
    }

    const determineRoomRender = (exits) => {
        const sortedExits = exits.sort().toString().split(',').join('')

        switch(sortedExits) {
            case 's':
                return b
            case 'sw':
                return bl
            case 'w':
                return l
            case 'e':
                return r
            case 'es':
                return rb
            case 'esw':
                return rbl
            case 'ew':
                return rl
            case 'n':
                return t
            case 'ns':
                return tb
            case 'nsw':
                return tbl
            case 'nw':
                return tl
            case 'en':
                return tr
            case 'ens':
                return trb
            case 'ensw':
                return trbl
            case 'enw':
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
    }, [])

    return (
        <div
            style={{
                position: 'relative',
                width: '320px',
                height: '240px',
                transform: 'scale(2)'
            }}
        >
            {currentRoom.length ? renderRoom(determineRoomRender(currentRoom)) : null}
        </div>
    )
}

export default World