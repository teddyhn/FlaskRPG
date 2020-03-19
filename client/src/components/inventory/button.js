import React from 'react'
import store from '../../config/store'

function InventoryButton() {
    
    function handleClick() {
        store.dispatch({
            type: 'SHOW_INVENTORY',
            payload: true
        })
    }

    return (
        <div
            style={{
                fontSize: '0.5rem',
                marginTop: '0.25rem'
            }}
        >
            <div
                style={{
                    cursor: 'pointer',
                    border: '1px solid white',
                    margin: '0 auto',
                    padding: '0.25rem',
                    width: 'fit-content'
                }}
                onClick={() => handleClick()}
            >
                INVENTORY
            </div>
        </div>
    )
}

export default InventoryButton