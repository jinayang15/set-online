import { useState } from "react";


interface GridBlockProps {
    selectedColor: string
}

function GridBlock({ selectedColor }: GridBlockProps) {
    const [bgColor, setBgColor] = useState("#FFFFFF")
    return <div
        className='grid-item'
        style={{ backgroundColor: bgColor }}
        onClick={() => { setBgColor(selectedColor) }}
    >
    </div>
}

export default GridBlock;