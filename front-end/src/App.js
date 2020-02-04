import React from 'react'
import AdminMapBuilder from './admin/map-builder'
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
    }}
    >
      {/* <AdminMapBuilder /> */}
      <World />
    </div>
  );
}

export default App;
