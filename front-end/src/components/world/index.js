import React from 'react'
import DialogueBox from '../dialogue'
import Map from '../map'
import MapObscure from '../map/obscure'
import MapOverlay from '../map/overlay'
import Player from '../player'

import { trbl } from '../../data/maps/trbl'

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
            <Map tiles={trbl.tiles} />
            <MapOverlay overlay={trbl.overlay} />
            <MapObscure obscure={trbl.obscure} />
            <Player />
        </div>
    )
}

export default World