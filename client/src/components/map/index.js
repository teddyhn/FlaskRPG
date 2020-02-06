import React from 'react'
import store from '../../config/store'

function MapTile(props) {
    return <div className={`tile ${props.tile}`} />
}

function MapRow(props) {
    return <div className="row">
        {
            props.tiles.map(tile => <MapTile tile={tile} />)
        }
    </div>
}

function Map(props) {
    
   store.dispatch({ type: 'REVEAL_PLAYER' })

    return (
        <div
            style={{
                width: '320px',
                height: '240px',     
                backgroundColor: 'rgb(41, 38, 52)',
                position: 'absolute'
            }}>
            {
                props.tiles.map(row => <MapRow tiles={row} />)
            }
        </div>
    )
}

export default Map