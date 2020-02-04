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
    "wall-t-1-obs",
    "wall-t-2-obs",
    "wall-t-3-obs",
    "wall-t-4-obs",
    "wall-t-5-obs",
    "wall-m-1-obs",
    "wall-m-2-obs",
    "wall-m-3-obs",
    "wall-m-4-obs",
    "wall-m-5-obs",
    "wall-b-1-obs",
    "wall-b-2-obs",
    "wall-b-3-obs",
    "bridge-1",
    "bridge-2",
    "bridge-3",
    "bridge-4",
    "bridge-5",
    "bridge-6",
    "rock-1-obs",
    "rock-2-obs",
    "mushroom-1-obs",
    "mushroom-2-obs",
    "stump-1",
    "stump-2",
    "flask-1",
    "flask-2",
    "flask-3-obs",
    "flask-4-obs",
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
    "tree-13-obs",
    "tree-14-obs",
    "grass-c-tl",
    "grass-c-tr",
    "grass-c-bl",
    "grass-c-br",
    "grass-c-bl-br",
    "grass-c-tl-bl",
    "grass-c-tr-br",
    "grass-c-tl-tr",
    "treasure-obs",
    "treasure-2-obs"
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