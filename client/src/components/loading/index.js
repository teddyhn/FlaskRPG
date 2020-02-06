import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Typist from 'react-typist'
import bigfrog from '../../assets/map/bigfrog.gif'

function Loading(props) {
    const [count, setCount] = useState(1)

    useEffect(() => {
        setCount(1)
    }, [count, props.loading])

    return (
        <>
            {props.loading ? (
                <div
                    className={'loading-container'}
                    style={{
                        position: 'absolute',
                        zIndex: '1001',
                        top: '0',
                        color: 'white',
                        fontSize: '0.4rem',
                        width: '100%'
                    }}
                >
                    <div 
                        className="loading-animation"
                        style={{
                            height: '100%',
                            width: '20%',
                            padding: '0.25rem'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                loadin
                                {count ? (
                                <Typist
                                    avgTypingDelay={250}
                                    stdTypingDelay={0}
                                    cursor={{ show: false }}
                                    onTypingDone={() => setCount(0)}
                                >
                                    g....
                                </Typist>
                                ) : (
                                    ""
                                )}
                            </div>
                            <img
                                src={bigfrog}
                                style={{
                                    height: '16px',
                                    width: '16px',
                                    imageRendering: 'pixelated'
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

function mapStateToProps(state) {
    return {
        ...state.map
    }
}

export default connect(mapStateToProps)(Loading)