import React from 'react'
import World from './components/world'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <World />
    </div>
  );
}

export default App;
