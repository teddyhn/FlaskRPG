import React from 'react'
import { connect } from 'react-redux'
import walkSprite from '../../assets/player/player.png'
import handleMovement from './movement'

function Player(props) {
    return (
        <div
            style={{
                position: 'absolute',
                top: props.position[1],
                left: props.position[0],
                backgroundImage: `url('${walkSprite}')`,
                imageRendering: 'pixelated',
                backgroundPosition: '0 0',
                width: '16px',
                height: '16px'
            }}>
            
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.player
    }
}

export default connect(mapStateToProps)(handleMovement(Player))

function getState(fn1, fn2) {
    return function(component) {
        return component
    }
}

function foo(component) {
    return component
}