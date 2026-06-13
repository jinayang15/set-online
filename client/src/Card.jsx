function Card({ shape, img, selected, handleCardSelect }) {
    return (
        <div className={`grid-item ${selected && "selected"}`} onClick={handleCardSelect}>
            {shape}
        </div>
    )

}

export default Card
