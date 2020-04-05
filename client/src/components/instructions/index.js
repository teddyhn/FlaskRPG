import React, { useState, useEffect } from 'react'
import useEventListener from '@use-it/event-listener'

function Instructions() {
    const [show, setShow] = useState(true)
    const [isChecked, setIsChecked] = useState(false)

    useEventListener('keydown', ({ code}) => {
        if (code !== 'KeyH') return

        if (show) return setShow(false)

        setShow(true)
    })

    const toggleChange = evt => {
        setIsChecked(evt.target.checked)
    }

    const handleClick = () => {
        setShow(false)
        localStorage.setItem('preventInstructionShow', isChecked)
    }

    const renderInstructions = () => {

        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    zIndex: 1001
                }}
            >
                <div
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, rgb(0, 0, 0, 0.99), rgb(0, 0, 0, 0.9)',
                        border: '1px solid white',
                        margin: 'auto',
                        width: 'fit-content',
                        fontSize: '0.5rem',
                        padding: '0.5rem 1rem'
                    }}
                >
                    <div
                        style={{
                            margin: 'auto',
                            width: 'fit-content'
                        }}
                    >
                        --Instruction--
                    </div>
                    <p>
                        [ENTER or SPACEBAR] - Interact
                    </p>
                    <p>
                        [WASD or Arrow keys] - Move
                    </p>
                    <p>
                        [I] - Inventory
                    </p>
                    <p>
                        [M] - Map
                    </p>
                    <p>
                        [H] - View this window
                    </p>
                    <p>
                        [LEFT CLICK] - Everything else
                    </p>
                    <div 
                        style={{
                            cursor: 'pointer',
                            border: '1px solid white',
                            margin: '0.5rem auto 0.5rem auto',
                            padding: '0.1rem 0.25rem',
                            width: 'fit-content'
                        }}
                        onClick={handleClick}
                    >
                        OK
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <input
                            type="checkbox" 
                            name="instruction" 
                            style={{ margin: '0 0.25rem 0 0' }}
                            checked={isChecked}
                            onChange={toggleChange}
                        />
                        <label for="instruction">Don't show again</label>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        let prevent = JSON.parse(localStorage.getItem('preventInstructionShow'))
        if (prevent) {
            setShow(false)
            setIsChecked(true)
        }
    }, [])

    return (
        <>
            {show ? renderInstructions() : null}
        </>
    )
}

export default Instructions;