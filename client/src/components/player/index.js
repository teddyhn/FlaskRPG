import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import walkSprite from '../../assets/player/player.png'
import handleMovement from './movement'
import useEventListener from '@use-it/event-listener'
import { SPRITE_SIZE } from '../../config/constants'
import store from '../../config/store'

const STEP_LOOP = [1, 0, 1]
const STEP_LOOP2 = [1, 2, 1]
const spriteDirMap = {
    RIGHT: 0,
    LEFT: 1,
    UP: 2,
    DOWN: 3
}

function Player(props) {
    const [timestamp, setTimestamp] = useState(0)
    const [sameDir, setSameDir] = useState(false)

    const didMountRef = useRef(false)

    const canvasRef = React.createRef();

    const sprite = new Image()
    sprite.src = walkSprite
    sprite.onload = () => {
        animate('draw')
    }

    useEventListener('keydown', ({ code }) => {
        // If player movement is disabled, escape from function
        const disabled = props.disableMovement
        if (disabled) {
            return
        }

        if (code.indexOf('Arrow') === -1) return

        const moveCode = code.replace('Arrow', '').toUpperCase()

        if (props.facing == moveCode) {
            setSameDir(prevState => !prevState)
        }

        // If 180ms have not passed (approximately animation speed) skip handling movement
        if (timestamp + 180 < Date.now()) {
            handleMovement(moveCode)
            setTimestamp(Date.now())
        }

        return store.dispatch({
            type: 'SET_FACING',
            payload: {
                facing: moveCode
            }
        })
    })

    useEffect(() => {
        if (didMountRef.current) {
            if (sameDir) {
                animate('animate2')
            } else animate('animate')
        } else didMountRef.current = true
    }, [props.hidden, props.facing, props.position])

    const animate = (action) => {
        if (canvasRef && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            const spriteLine = spriteDirMap[props.facing] * SPRITE_SIZE

            const drawFrame = frame => {
                // Don't allow invalid frames
                if (frame > 3 || frame < 0) frame = 1

                ctx.clearRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)
                ctx.drawImage(
                    sprite,
                    frame * SPRITE_SIZE,
                    spriteLine,
                    SPRITE_SIZE,
                    SPRITE_SIZE,
                    0,
                    0,
                    SPRITE_SIZE,
                    SPRITE_SIZE
                );
            };

            let currentFrame = 0
            let currentTick = 0
            const ticksPerFrame = 30

            const update = () => {
                currentTick++

                if (currentTick > ticksPerFrame) {
                    currentTick = 0
                    currentFrame++
                }
            }
    
            const step = () => {
                drawFrame(STEP_LOOP[currentFrame])
                update()
                const id = window.requestAnimationFrame(step)

                if (currentFrame > 2) {
                    window.cancelAnimationFrame(id)
                }
            }

            const step2 = () => {
                drawFrame(STEP_LOOP2[currentFrame])
                update()
                const id = window.requestAnimationFrame(step2)

                if (currentFrame > 2) {
                    window.cancelAnimationFrame(id)
                }
            }
    
            if (action === 'draw') {
                drawFrame(1)
            }
    
            if (action === 'animate') {
                step()
            }

            if (action === 'animate2') {
                step2()
            }
        }
    }

    return (
        <>
            {props.hidden ? null : 
            <div
                style={{
                    position: 'absolute',
                    zIndex: '3',
                    // Subtract 10px from top position so that player sprite looks more natural on map
                    top: props.position[1] - 10,
                    left: props.position[0],
                    imageRendering: 'pixelated'
                }}
            >
                <canvas ref={canvasRef} width={16} height={16} />
            </div>}
        </>
    )
}

function mapStateToProps(state) {
    return {
        ...state.player
    }
}

export default connect(mapStateToProps)(Player)