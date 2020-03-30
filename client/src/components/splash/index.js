import React, { useState, useEffect } from 'react'
import axios from 'axios'
import store from '../../config/store'

function Splash() {
    const [onboard, setOnboard] = useState('')
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });
    const [register, setRegister] = useState({
        username: '',
        password1: '',
        password2: ''
    })
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const headers = {
        "Content-Type": "application/json"
    };

    const handleLoginChange = e => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = e => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (onboard === 'register') {
            axios
              .post(
                "https://team-big-bosses-be.herokuapp.com/api/registration/",
                register,
                headers
              )
              .then(res => {
                localStorage.setItem("token", res.data.key);
                store.dispatch({ type: 'LOAD_WORLD' })
              })
              .catch(err => {
                  setError(true)
                  setErrorMessage(err.response.data[1].error)
                  setTimeout(() => setError(false), 3000);
              })
        }

        if (onboard === 'login') {
            axios
              .post(
                "https://team-big-bosses-be.herokuapp.com/api/login/",
                login,
                headers
              )
              .then(res => {
                localStorage.setItem("token", res.data.key);
                store.dispatch({ type: 'LOAD_WORLD' })
              })
              .catch(err => {
                setError(true)
                setErrorMessage('Invalid username and password combination')
                setTimeout(() => setError(false), 3000);
              })
        }
    };

    useEffect(() => {
        renderSplash()
    }, [onboard])

    const renderErrorMessage = () => {

        return (
            <div
                style={{
                    textAlign: 'center',
                    height: '1rem'
                }}
                className={`${error ? 'error' : 'error hide'}`}
            >
                {errorMessage}
            </div>
        )
    }

    const renderSplash = () => {
        if (onboard === 'login') {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {renderErrorMessage()}
                    <form
                        style={{
                            width: '216px',
                            marginTop: '1.5rem'
                        }}
                    >
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={handleLoginChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={handleLoginChange}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}
                        >
                            <div
                                style={{
                                    marginTop: '0.25rem'
                                }}
                            >
                                <div
                                    className='highlight'
                                    style={{
                                        cursor: 'pointer',
                                        border: '4px solid white',
                                        margin: '0 auto',
                                        padding: '0.25rem',
                                        width: 'fit-content'
                                    }}
                                    onClick={handleSubmit}
                                >
                                    START
                                </div>
                            </div>
                            <div
                                style={{
                                    marginTop: '0.25rem'
                                }}
                            >
                                <div
                                    className='highlight'
                                    style={{
                                        cursor: 'pointer',
                                        border: '4px solid white',
                                        margin: '0 auto',
                                        padding: '0.25rem',
                                        width: 'fit-content'
                                    }}
                                    onClick={() => {
                                        setOnboard('');
                                        setErrorMessage('');
                                    }}
                                >
                                    BACK
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }

        if (onboard === 'register') {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {renderErrorMessage()}
                    <form
                        style={{
                            width: '216px',
                            marginTop: '1.5rem'
                        }}
                    >
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={handleRegisterChange}
                        />
                        <input
                            type="password"
                            name="password1"
                            placeholder="password"
                            onChange={handleRegisterChange}
                        />
                        <input
                            type="password"
                            name="password2"
                            placeholder="confirm"
                            onChange={handleRegisterChange}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}
                        >
                            <div
                                style={{
                                    marginTop: '0.25rem'
                                }}
                            >
                                <div
                                    className='highlight'
                                    style={{
                                        cursor: 'pointer',
                                        border: '4px solid white',
                                        margin: '0 auto',
                                        padding: '0.25rem',
                                        width: 'fit-content'
                                    }}
                                    onClick={handleSubmit}
                                >
                                    START
                                </div>
                            </div>
                            <div
                                style={{
                                    marginTop: '0.25rem'
                                }}
                            >
                                <div
                                    className='highlight'
                                    style={{
                                        cursor: 'pointer',
                                        border: '4px solid white',
                                        margin: '0 auto',
                                        padding: '0.25rem',
                                        width: 'fit-content'
                                    }}
                                    onClick={() => {
                                        setOnboard('');
                                        setErrorMessage('');
                                    }}
                                >
                                    BACK
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }

        return (
            <div
                style={{
                    position: 'relative',
                    width: '320px',
                    height: '240px',
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'space-around'
                }}
            >
                <div
                    style={{
                        fontSize: '2.25rem',
                        textAlign: 'center'
                    }}
                >
                    FlaskRPG
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1.25rem'
                    }}
                >
                    <div className='highlight' onClick={() => setOnboard('login')}>Login</div>
                    <div className='highlight' onClick={() => setOnboard('register')}>Register</div>
                </div>
            </div>
        );
    }

    return (
        renderSplash()
    )
}

export default Splash;