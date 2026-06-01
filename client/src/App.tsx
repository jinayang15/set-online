import { useEffect, useState } from 'react'
import GridBlock from './GridBlock';
import './App.css'
import { grid, connect } from './connect'

function App() {
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [gridState, setGridState] = useState(grid.toArray())
  const gridSize = 10;

  // handle syncing gridState
  useEffect(() => {
    connect(gridSize);

    const observer = () => {
      setGridState(grid.toArray())
    }

    grid.observe(observer)

    return () => {
      grid.unobserve(observer)
    }
  }, [])


  return (
    <div>
      <h1>Color Together</h1>
      <div id="coloring-grid">
        {
          gridState.map((baseColor, index) =>
            <GridBlock
              key={`grid-block-${index}`}
              baseColor={baseColor}
              selectedColor={selectedColor}
              row={Math.floor(index / gridSize)}
              col={index % gridSize}
            />
          )
        }
      </div>
      <input
        type="color"
        id="color-picker"
        name="color-picker"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
      <p>Selected color: {selectedColor}</p>
    </div>
  )
}

export default App
