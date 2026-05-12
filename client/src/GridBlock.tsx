import { useState } from "react";
import { sendPaint } from "./connect"

interface GridBlockProps {
    selectedColor: string
    row: number
    col: number
}

function GridBlock({ selectedColor, row, col }: GridBlockProps) {
    const [bgColor, setBgColor] = useState("#FFFFFF")
    return <div
        className='grid-item'
        style={{ backgroundColor: bgColor }}
        onClick={() => {
            setBgColor(selectedColor)
            sendPaint(selectedColor, row, col)
        }}
    >
    </div>
}

export default GridBlock;