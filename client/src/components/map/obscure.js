import React from 'react'

function ObscureTile(props) {
    return <div className={`overlay ${props.tile}`} />
}

function ObscureRow(props) {
    return <div className="row">
        {
            props.tiles.map(tile => <ObscureTile tile={tile} />)
        }
    </div>
}

function MapObscure(props) {
    return (
        <div
            style={{
                width: '320px',
                height: '240px',
                zIndex: '1000',
                position: 'absolute'
            }}>
            {
                props.obscure.map(row => <ObscureRow tiles={row} />)
            }
        </div>
    )
}

export default MapObscure