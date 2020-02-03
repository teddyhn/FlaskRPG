import React from 'react'
import Map from '../map'
import MapOverlay from '../map/overlay'
import Player from '../player'

import { tiles, overlay } from '../../data/maps/trbl'

function World(props) {
    return (
        <div
            style={{
                position: 'relative',
                width: '320px',
                height: '240px',
                transform: 'scale(2)'
            }}>
            <Map tiles={tiles} />
            <MapOverlay overlay={overlay} />
            <Player />
        </div>
    )
}

export default World