import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Typist from 'react-typist'

function DialogueBox(props) {

    const generateDialogue = (context) => {
        if (context === 'Flask') {
            return renderDialogue('Flask has wares, if you have coin.', context)
        }

        if (context === 'mushroom' || context === 'stump' || context === 'rock') {
            return renderDialogue(`You investigate the inconspicuous looking ${context}.`)
        }

        if (context === 'tree') {
            return renderDialogue(`The ${context} radiates a calming aura.`)
        }
    }

    const renderDialogue = (text, name) => {
        if (props.show) {
            return (
                <div
                    className={'dialogue-container'}
                    style={{
                        position: 'absolute',
                        zIndex: '1001',
                        width: '100%',
                        bottom: '5%',
                        color: 'white',
                        fontSize: '0.5rem'
                    }}
                >
                    <div 
                        className="dialogue-box"
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, rgb(0, 0, 0, 0.99), rgb(0, 0, 0, 0.9)',
                            border: '1px solid #f5f2d0',
                            width: '80%',
                            margin: '0 auto',
                            padding: '0.5rem'
                        }}
                    >
                        <div
                            style={{
                                marginLeft: '0.3rem'
                            }}
                        >
                            {name ? (
                                <div style={{ marginLeft: '-0.25rem', marginBottom: '0.25rem' }}>{`『${name}』`}</div>
                            ) : null}
                            <Typist
                                stdTypingDelay={0}
                                avgTypingDelay={20}
                                cursor={{ show: false }}
                            >
                                {text}
                            </Typist>
                        </div>
                    </div>
                </div>
            )
        } else return
    }

    useEffect(() => {
        generateDialogue(props.context)
    }, [props.show, props.context])

    return (
        <>
            {generateDialogue(props.context)}
        </>
    )
}

function mapStateToProps(state) {
    return {
        ...state.dialogue
    }
}

export default connect(mapStateToProps)(DialogueBox)