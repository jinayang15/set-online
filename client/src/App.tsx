import { useEffect, useState } from 'react'
import GridBlock from './GridBlock';
import './App.css'
import { connect } from './connect'

function App() {
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const gridSize = 10;

  useEffect(() => {
    connect();
  }, [])

  return (
    <div>
      <h1>Color Together</h1>
      <div id="coloring-grid">
        {
          Array.from({ length: gridSize ** 2 }, (_, i) => i).map((_, i) => {
            return (
              <GridBlock
                key={`grid-block-${i}`}
                selectedColor={selectedColor}
                row={Math.floor(i / gridSize)}
                col={i % gridSize}
              />)
          })
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
