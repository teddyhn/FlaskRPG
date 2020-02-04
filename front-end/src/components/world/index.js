import React from 'react'
import DialogueBox from '../dialogue'
import Map from '../map'
import MapObscure from '../map/obscure'
import MapOverlay from '../map/overlay'
import Player from '../player'

import { b, bl, l, r, rb, rbl, rl, t, tb, tbl, tl, tr, trb, trbl, trl } from '../../data/maps'

function World(props) {
    return (
        <div
            style={{
                position: 'relative',
                width: '320px',
                height: '240px',
                transform: 'scale(2)'
            }}
        >
            <DialogueBox /> 
            <Map tiles={l.tiles} />
            <MapOverlay overlay={l.overlay} />
            <MapObscure obscure={l.obscure} />
            <Player />
        </div>
    )
}

export default World