function Card({ shape, img, selected, handleCardSelect }) {
    return (
        <div className={`grid-item ${selected && "selected"}`} onClick={handleCardSelect}>
            <img src={img} height="100" alt={shape} />
        </div>
    )

}

export default Card
