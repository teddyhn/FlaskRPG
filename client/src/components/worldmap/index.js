import React, { useState, useEffect } from 'react'
import useEventListener from '@use-it/event-listener'
import axios from 'axios'
import store from '../../config/store'

import { BE_URL } from '../../config/constants'

function WorldMap() {
    const [grid, setGrid] = useState([])
    const [show, setShow] = useState(false)

    const fetchGridMap = () => {
        axios
            .get(BE_URL + 'api/adv/grid')
            .then(res => {
                setGrid(res.data.grid.reverse())
            })
    }

    useEventListener('keydown', ({ code }) => {
        if (code === 'KeyM') {
            if (show === false) {
                return setShow(true)
            }
            setShow(false)
        }
    })

    const renderGridMap = grid => {
        return grid.map(row => {
            return (
                <div style={{ display: 'flex', height: '16px', width: '320px' }}>
                    {row.map(tile => {
                        let exits = '';

                        if (tile !== null) {
                            if (tile.exits.e) {
                                exits += 'e'
                            }

                            if (tile.exits.n) {
                                exits += 'n'
                            }

                            if (tile.exits.s) {
                                exits += 's'
                            }

                            if (tile.exits.w) {
                                exits += 'w'
                            }
                        }

                        return (
                            <div
                                className={`grid-${exits}`}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '16px', width: '16px', fontSize: '0.75rem', color: 'red' }}
                            >
                                {tile !== null && tile.id === store.getState().player.currentRoomId ? <div style={{ height: '5px', width: '5px', backgroundColor: 'blue', borderRadius: '5px' }} /> 
                                : null}
                                {tile !== null && tile.id !== store.getState().player.currentRoomId ? <div style={{ height: '5px', width: '5px', backgroundColor: 'white', borderRadius: '5px' }} /> : null}
                            </div>)
                    })}
                </div>
            )
        })
    }

    useEffect(() => {
        fetchGridMap()
    }, [])

    return (
        <>
            {show ?
            <div
                style={{
                    backgroundColor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    opacity: '95%',
                    position: 'absolute',
                    height: '320px',
                    width: '320px',
                    textAlign: 'center',
                    zIndex: '3000'
                }}
            >
                {renderGridMap(grid)}
            </div> : null}
        </>
    )
}

export default WorldMap