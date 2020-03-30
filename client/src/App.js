import React from 'react'
import Splash from './components/splash'
import World from './components/world'

import './index.css'

function App() {
  return (
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
      <Splash />
      {/* <World /> */}
    </div>
  );
}

export default App;
