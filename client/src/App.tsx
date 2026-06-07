import { useEffect, useState, useRef } from 'react'
import './App.css'
import { canvas, connect, handleMouseDown, handleMouseUp, handleMouseMove, clearCanvas } from './connect'
import { Stage, Layer, Line } from 'react-konva';

function App() {
  const [tool, setTool] = useState('brush');
  const [canvasState, setCanvasState] = useState(canvas.toJSON());
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const isDrawing = useRef(false);

  // handle syncing gridState
  useEffect(() => {
    connect();

    const observer = () => {
      console.log("Observed change!")

      setCanvasState(canvas.toJSON())
    }

    canvas.observeDeep(observer)

    return () => {
      canvas.unobserveDeep(observer)
    }
  }, [])

  console.log("canvasState", canvasState)

  return (
    <div>
      <h1>Color Together</h1>
      <div id="coloring-grid">
        <Stage
          width={window.innerWidth}
          height={500}
          onMouseDown={(e) => handleMouseDown(e, isDrawing, tool, selectedColor)}
          onMousemove={(e) => handleMouseMove(e, isDrawing)}
          onMouseup={() => handleMouseUp(isDrawing)}
          onTouchStart={(e) => handleMouseDown(e, isDrawing, tool, selectedColor)}
          onTouchMove={(e) => handleMouseMove(e, isDrawing)}
          onTouchEnd={() => handleMouseUp(isDrawing)}>
          <Layer>
            {canvasState.map((line, i) => {
              return <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            })}
          </Layer>
        </Stage>
      </div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="brush">Brush</option>
        <option value="eraser">Eraser</option>
      </select>
      <input
        type="color"
        id="color-picker"
        name="color-picker"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
      <button type='button' onClick={clearCanvas}>Clear</button>
      <p>Selected color: {selectedColor}</p>
    </div>
  )
}

export default App
