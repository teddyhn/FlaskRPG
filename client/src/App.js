import React from 'react'
import AdminMapBuilder from './admin/map-builder'
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
      {/* <AdminMapBuilder /> */}
      <World />
    </div>
  );
}

export default App;
