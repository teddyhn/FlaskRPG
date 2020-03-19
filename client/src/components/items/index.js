import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { BE_URL, token } from '../../config/constants'
import store from '../../config/store'

function Items(props) {

    const handleItemClick = async (itemName) => {
        await axios({
            method: 'post',
            url: BE_URL + 'api/adv/take/',
            headers: {
                Authorization: 'Token ' + token
            },
            data: {
                item_name: itemName
            }
        })

        return await axios.get(BE_URL + 'api/adv/init/', {
                headers: {
                    Authorization: 'Token ' + token
                }
            }).then(res => {
                store.dispatch({
                    type: 'SET_ITEMS',
                    payload: {
                        items: res.data.items
                    }
                })
        })
    }

    const handleExitClick = () => {
        store.dispatch({
            type: 'SHOW_ITEMS',
            payload: false
        })

        store.dispatch({
            type: 'ENABLE_MOVEMENT'
        })
    }

    useEffect(() => {
        renderItemList(props.items)
    }, [props.items])

    const renderItemList = (items) => {
        if (props.show) {

            store.dispatch({
                type: 'DISABLE_MOVEMENT'
            })

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
                            width: '50%',
                            fontSize: '0.5rem',
                            padding: '0.5rem'
                        }}
                    >
                        <div
                            style={{
                                margin: '0 auto 0.75rem auto',
                                width: 'fit-content'
                            }}
                        >
                            Found items:
                        </div>
                        {items ? (
                            items.map(item => {
                                return (
                                <div 
                                    style={{ 
                                        cursor: 'pointer',
                                        margin: '0.5rem auto', 
                                        width: 'fit-content' 
                                    }}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item}
                                </div>
                                )
                            })
                        ) : null}
                        <div 
                            style={{
                                cursor: 'pointer',
                                border: '1px solid white',
                                margin: '0.75rem auto 0 auto',
                                padding: '0.1rem 0.25rem',
                                width: 'fit-content'
                            }}
                            onClick={() => handleExitClick()}
                        >
                            Exit
                        </div>
                    </div>
                </div>
            )
        } else return
    }

    return (
        <>
            {renderItemList(props.items)}
        </>
    )
    
}

function mapStateToProps(state) {
    return {
        ...state.items
    }
}

export default connect(mapStateToProps)(Items)