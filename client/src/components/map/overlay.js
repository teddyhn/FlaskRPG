import React from 'react'

function OverlayTile(props) {
    return <div className={`overlay ${props.tile}`} />
}

function OverlayRow(props) {
    return <div className="row">
        {
            props.tiles.map(tile => <OverlayTile tile={tile} />)
        }
    </div>
}

function MapOverlay(props) {
    return (
        <div
            style={{
                width: '320px',
                height: '240px',
                zIndex: '2',
                position: 'absolute'
            }}>
            {
                props.overlay.map(row => <OverlayRow tiles={row} />)
            }
        </div>
    )
}

export default MapOverlay