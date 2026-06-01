import { sendPaint } from "./connect"

interface GridBlockProps {
    baseColor: string
    selectedColor: string
    row: number
    col: number
}

function GridBlock({ baseColor, selectedColor, row, col }: GridBlockProps) {
    return <div
        className='grid-item'
        style={{ backgroundColor: baseColor }}
        onClick={() => {
            sendPaint(selectedColor, row, col)
        }}
    >
    </div>
}

export default GridBlock;