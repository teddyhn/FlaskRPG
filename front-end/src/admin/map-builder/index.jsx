import React, { useState } from 'react'
import './styles.css'
import '../../config/tiles.css'

const tiles = [
    "grass",
    "grass-tl",
    "grass-t1",
    "grass-t2",
    "grass-tr",
    "grass-l",
    "grass-r",
    "grass-bl",
    "grass-b",
    "grass-br",
    "grass-e-tl",
    "grass-e-tb",
    "grass-e-tr",
    "grass-e-lr",
    "grass-e-bl",
    "grass-e-br",
    "grass-overlay",
    "wall-t-1",
    "wall-t-2",
    "wall-t-3",
    "wall-t-4",
    "wall-t-5",
    "wall-m-1",
    "wall-m-2",
    "wall-m-3",
    "wall-m-4",
    "wall-m-5",
    "wall-b-1",
    "wall-b-2",
    "wall-b-3",
    "bridge-1",
    "bridge-2",
    "bridge-3",
    "bridge-4",
    "bridge-5",
    "bridge-6",
    "rock-1",
    "rock-2",
    "mushroom-1",
    "mushroom-2",
    "stump-1",
    "stump-2",
    "flask-1",
    "flask-2",
    "flask-3",
    "flask-4",
    "tree-1",
    "tree-2",
    "tree-3",
    "tree-4",
    "tree-5",
    "tree-6",
    "tree-7",
    "tree-8",
    "tree-9",
    "tree-10",
    "tree-11",
    "tree-12",
    "tree-13",
    "tree-14",


]

export default function AdminMapBuilder() {
    const [placedTiles, setPlacedTiles] = useState([]);

    function handleDrag(e) {
        e.dataTransfer.setData("text", e.target.id);
    }

    function handleDrop(e) {
        e.preventDefault()
        const tile = e.dataTransfer.getData('text').split('_')[0]
        placeTile(tile, e.clientX, e.clientY);
    }

    function placeTile(tile, x, y) {
        const snappedX = Math.ceil(x / 16) * 16 - 16
        const snappedY = Math.ceil(y / 16) * 16 - 16
        setPlacedTiles(prevState => [
            ...prevState,
            {
                tile,
                x: snappedX,
                y: snappedY
            }
        ])
    }

    return (
        <div className='map-builder'>
            <div
                className="map"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                style={{
                    width: '321px',
                    height: '241px'
                }}
            >
                {placedTiles.map(placed => <div className={`placed tile ${placed.tile}`} style={{
                    left: placed.x,
                    top: placed.y
                }}>
                </div>)}
            </div>
            <div className="tiles">
                {tiles.map((tile, i) => (
                    <div 
                        className={`tile ${tile}`}
                        draggable={true}
                        onDragStart={handleDrag}
                        id={`${tile}_${i}`}
                    />
                ))}
            </div>
        </div>
    )
}