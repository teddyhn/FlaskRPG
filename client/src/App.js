import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import World from './components/world'
import axios from 'axios'
import Typist from 'react-typist'

import './index.css'
import { BE_URL } from './config/constants'

function App(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(1)

  const instantiatePlayer = () => {
    axios.post(BE_URL + 'api/instantiate/')
    .then(res => {
      setIsLoading(false)
    }).catch(err => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    instantiatePlayer();
    setCount(1)
  }, [props.load, count])

  return (
    <>
      {isLoading ? 
        <div 
          style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(41, 38, 52)'
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '195px'
            }}
          >
            Starting serve
            {count ?
            <Typist
              avgTypingDelay={400}
              stdTypingDelay={0}
              cursor={{ show: false }}
              onTypingDone={() => setCount(0)}
            >
              r....
            </Typist> : null}
          </div>
        </div>
        :
        <div
          style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(41, 38, 52)'
          }}
        >
          <World />
        </div>
      }
    </>
  );
}

function mapStateToProps(state) {
  return {
    ...state.world
  };
}

export default connect(mapStateToProps)(App);
