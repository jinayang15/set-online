import { sendPaint } from "./connect"

interface GridBlockProps {
    defaultColor: string
    selectedColor: string
    row: number
    col: number
}

function GridBlock({ defaultColor, selectedColor, row, col }: GridBlockProps) {
    return <div
        className='grid-item'
        style={{ backgroundColor: defaultColor }}
        onClick={() => {
            sendPaint(selectedColor, row, col)
        }}
    >
    </div>
}

export default GridBlock;