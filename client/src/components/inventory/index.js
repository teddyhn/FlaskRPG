import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { BE_URL, token } from '../../config/constants'
import store from '../../config/store'

function Inventory(props) {

    const reduceItemDuplicates = (items) => {
        var counts = {};
        var final = [];

        for (var i = 0; i < items.length; i++) {
            if(counts[items[i]] != undefined) {
                counts[items[i]] = 1;
            } else {
                counts[items[i]]++;
            }
        }

        for (const name in counts) {
            final.push({ 'name': name, 'count': counts[name] + 1 });
        }

        return final
    }

    const fetchInventory = async () => {
        return await axios.get(BE_URL + 'api/adv/inventory/', {
            headers: {
                Authorization: 'Token ' + token
            }
        }).then(res => {
            store.dispatch({
                type: 'SET_INVENTORY',
                payload: {
                    inventory: res.data.Inventory
                }
            })
        })
    }

    const handleItemClick = async (itemName) => {
        await axios({
            method: 'post',
            url: BE_URL + 'api/adv/drop/',
            headers: {
                Authorization: 'Token ' + token
            },
            data: {
                item_name: itemName
            }
        })

        return await axios.get(BE_URL + 'api/adv/inventory/', {
                headers: {
                    Authorization: 'Token ' + token
                }
            }).then(res => {
                store.dispatch({
                    type: 'SET_INVENTORY',
                    payload: {
                        inventory: res.data.Inventory
                    }
                })
        })
    }

    const handleExitClick = () => {
        store.dispatch({
            type: 'SHOW_INVENTORY',
            payload: false
        })

        store.dispatch({
            type: 'ENABLE_MOVEMENT'
        })
    }

    useEffect(() => {
        fetchInventory()
    }, [props.show])

    useEffect(() => {
        renderInventory(props.inventory)
    }, [props.inventory])

    const renderInventory = (inventory) => {

        const names = []

        inventory.map(item => {
            names.push(item.name)
        })

        const noDuplicates = reduceItemDuplicates(names)

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
                            Inventory:
                        </div>
                        {noDuplicates.map(item => {
                            return (
                                <div 
                                    style={{ 
                                        cursor: 'pointer',
                                        margin: '0.5rem auto', 
                                        width: 'fit-content' 
                                    }}
                                    onClick={() => handleItemClick(item.name)}
                                >
                                    {item.count ? `${item.name}` + ' x' + `${item.count}` : item.name}
                                </div>
                            )
                        })}
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
            {renderInventory(props.inventory)}
        </>
    )
    
}

function mapStateToProps(state) {
    return {
        ...state.inventory
    }
}

export default connect(mapStateToProps)(Inventory)