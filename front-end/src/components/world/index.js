import React from 'react'
import Map from '../map'
import Player from '../player'

function World(props) {
    return (
        <div
            style={{
                position: 'relative',
                width: '480px',
                height: '320px',
                transform: 'scale(2)'
            }}>
            <Map />
            <Player />
        </div>
    )
}

export default World