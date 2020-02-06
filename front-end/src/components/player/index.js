import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import store from '../../config/store'
import walkSprite from '../../assets/player/player.png'
import handleMovement from './movement'
import useEventListener from '@use-it/event-listener'
import { SPRITE_SIZE } from '../../config/constants'

const MAX_STEP = 3
const STEP_LOOP = [0, 1, 0, 2]
const DIRECTION = {
    DOWN: 0,
    UP: SPRITE_SIZE * 1,
    LEFT: SPRITE_SIZE * 2,
    RIGHT: SPRITE_SIZE * 3
}

function Player(props) {
    const offset = { top: 48, left: 16 }
    const [facing, setFacing] = useState({
        current: DIRECTION.DOWN,
        previous: DIRECTION.DOWN
    })

    // To do: combine into useReducer hook
    const [step, setStep] = useState(0)
    const [stepCounter, setStepCounter] = useState(0)

    useEventListener('keydown', ({ code }) => {
        // If player movement is disabled, escape from function
        const disabled = store.getState().player.disableMovement
        if (disabled) {
            return
        }

        if (code.indexOf('Arrow') === -1) return
        const direction = DIRECTION[code.replace('Arrow', '').toUpperCase()]
        setFacing(prevState => ({
            current: direction,
            previous: prevState.current
        }))

        const moveCode = code.replace('Arrow', '').toUpperCase()

        handleMovement(moveCode)
    })

    useEffect(() => {
        setStepCounter(prevState => (prevState < MAX_STEP ? prevState + 1 : 0))
        setStep(STEP_LOOP[stepCounter])
    }, [facing, props.hidden])

    return (
        <>
            {props.hidden ? null : 
            <div
                style={{
                    position: 'absolute',
                    zIndex: '3',
                    // Subtract 6px from top position so that player sprite looks more natural on map
                    top: props.position[1] - 6,
                    left: props.position[0],
                    background: `url(${walkSprite}) -${offset.left + step * SPRITE_SIZE}px -${offset.top - facing.current}px`,
                    imageRendering: 'pixelated',
                    width: '16px',
                    height: '16px',
                }}
            />}
        </>
    )
}

function mapStateToProps(state) {
    return {
        ...state.player
    }
}

export default connect(mapStateToProps)(Player)