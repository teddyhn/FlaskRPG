import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import store from '../../config/store'
import Typist from 'react-typist'
import { BE_URL, token } from '../../config/constants'

function Shop(props) {

    const reduceItemDuplicates = (items) => {
        var prices = {};
        var counts = {};
        var final = [];

        for (var i = 0; i < items.length; i++) {
            if(counts[items[i].name] != undefined) {
                counts[items[i].name] = 1;
            } else {
                counts[items[i].name]++;
            }
        }

        for (var i = 0; i < items.length; i++) {
            prices[items[i].name] = items[i].price 
        }

        for (const name in counts) {
            final.push({ name: name, count: counts[name] + 1, price: prices[name] });
        }

        return final;
    }

    const handleMenuClick = async (action) => {
        switch (action) {
            case 'BUY':
                await axios.get(BE_URL + 'api/adv/store', {
                    headers: {
                        Authorization: 'Token ' + token
                    }
                }).then(res => {
                    store.dispatch({
                        type: 'SET_SHOP_STOCK',
                        payload: {
                            stock: res.data.Stock
                        }
                    })
                })
                return store.dispatch({ type: 'SET_SHOP_TAB', payload: action })
            case 'SELL':
                await axios.get(BE_URL + 'api/adv/inventory/', {
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
                return store.dispatch({ type: 'SET_SHOP_TAB', payload: action })
            case 'TALK':
                return store.dispatch({ type: 'SET_SHOP_TAB', payload: action })
            case 'EXIT':
                store.dispatch({ type: 'SET_SHOP_TAB', payload: '' })
                return store.dispatch({ type: 'SHOW_SHOP', payload: false })
            default:
                return
        }
    }

    const handleBuyClick = async (itemName) => {
        await axios({
            method: 'post',
            url: BE_URL + 'api/adv/buy/',
            headers: {
                Authorization: 'Token ' + token
            },
            data: {
                item_name: itemName
            }
        })

        return await axios.get(BE_URL + 'api/adv/store', {
                headers: {
                    Authorization: 'Token ' + token
                }
            }).then(res => {
                store.dispatch({
                    type: 'SET_SHOP_STOCK',
                    payload: {
                        stock: res.data.Stock
                    }
                })
            })
    }

    const handleSellClick = async (itemName) => {
        await axios({
            method: 'post',
            url: BE_URL + 'api/adv/sell/',
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

    const fetchShopItems = async () => {
        return await axios.get(BE_URL + 'api/adv/store', {
            headers: {
                Authorization: 'Token ' + token
            }
        }).then(res => {
            store.dispatch({
                type: 'SET_SHOP_STOCK',
                payload: {
                    stock: res.data.Stock
                }
            })
        })
    }

    const renderShopMenu = (action) => {
        switch (action) {
            case 'BUY':
                return props.shop.stock.map(item => {
                    return (
                        <div 
                            style={{ margin: '0.5rem 0', cursor: 'pointer' }}
                            onClick={() => handleBuyClick(item.name)}
                        >
                            {`${item.price}G - ` + `${item.name}`}
                        </div>
                    )
                })
            case 'SELL':
                const inventory = props.inventory.inventory
                const namePrice = []
                inventory.map(item => {
                    namePrice.push({ name: item.name, price: item.price })
                })

                const noDuplicates = reduceItemDuplicates(namePrice)

                return noDuplicates.map(item => {
                    return (
                        <div 
                            style={{ margin: '0.5rem 0', cursor: 'pointer' }}
                            onClick={() => handleSellClick(item.name)}
                        >
                            {item.count ? `${item.price}G - ` + `${item.name}` + ' x' + `${item.count}` : `${item.price}G - ` + `${item.name}`}
                        </div>
                    )
                })
            case 'TALK':
                return (
                    <div style={{ margin: '0.5rem 0'}}>
                        <Typist
                            avgTypingDelay={25}
                            stdTypingDelay={0}
                            cursor={{ show: false }}
                        >
                            This won't be the last time . . .
                        </Typist>
                    </div>
                )
            default:
                return (
                    <>
                        <div>* . . .</div>
                        <div>* . . .</div>
                        <div>* . . .</div>
                        <div>* He says hi.</div>
                    </>
                )
        }
    }

    const renderShopView = () => {
        if (props.shop.show) {
            return (
                <div
                    style={{
                        backgroundColor: 'rgb(41, 38, 52)',
                        fontSize: '0.6rem',
                        position: 'absolute',
                        width: '320px',
                        height: '240px',
                        zIndex: 1002
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '50%'
                        }}
                    >
                        <div 
                            style={{
                                display: 'flex',
                                margin: '0 auto',
                                width: 'fit-content' 
                            }}
                        >
                            <div
                                className="flask-1"
                                style={{
                                    imageRendering: 'pixelated',
                                    width: '16px',
                                    height: '16px',
                                    zoom: 5
                                }}
                            />
                            <div
                                className="flask-2"
                                style={{
                                    imageRendering: 'pixelated',
                                    width: '16px',
                                    height: '16px',
                                    zoom: 5
                                }}
                            />
                        </div>
                        <div 
                            style={{
                                display: 'flex',
                                margin: '0 auto',
                                width: 'fit-content' 
                            }}
                        >
                            <div
                                className="flask-3-obs"
                                style={{
                                    imageRendering: 'pixelated',
                                    width: '16px',
                                    height: '8px',
                                    zoom: 5
                                }}
                            />
                            <div
                                className="flask-4-obs"
                                style={{
                                    imageRendering: 'pixelated',
                                    width: '16px',
                                    height: '8px',
                                    zoom: 5
                                }}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            boxSizing: 'border-box',
                            backgroundColor: 'black',
                            display: 'flex',
                            border: '2px solid white',
                            height: '50%',
                        }}
                    >
                        <div
                            className="hide-scroll"
                            style={{
                                border: '2px solid white',
                                padding: '0 0.5rem',
                                width: '70%'
                            }}
                        >
                            {renderShopMenu(props.shop.shopTab)}
                        </div>
                        <div
                            style={{
                                border: '2px solid white',
                                padding: '0 1rem',
                                width: '30%'
                            }}
                        >
                            <div 
                                style={{ margin: '0.5rem 0', cursor: 'pointer' }}
                                onClick={() => handleMenuClick('BUY')}
                            >
                                Buy
                            </div>
                            <div
                                style={{ margin: '0.5rem 0', cursor: 'pointer' }}
                                onClick={() => handleMenuClick('SELL')}
                            >
                                Sell
                            </div>
                            <div
                                style={{ margin: '0.5rem 0', cursor: 'pointer' }}
                                onClick={() => handleMenuClick('TALK')}
                            >
                                Talk
                            </div>
                            <div
                                style={{ margin: '0.5rem 0', cursor: 'pointer' }}
                                onClick={() => handleMenuClick('EXIT')}
                            >
                                Exit
                            </div>
                     </div>
                    </div>
                </div>
            )
        } else return
    }

    useEffect(() => {
        fetchShopItems()
    }, [props.shop.show])

    useEffect(() => {
        renderShopView(props.shop.stock)
    }, [props.shop.stock, props.inventory.inventory])

    return (
        <>
            {renderShopView()}
        </>
    )
}

function mapStateToProps(state) {
    return {
        shop: state.shop,
        inventory: state.inventory
    }
}

export default connect(mapStateToProps)(Shop)