

function Card({ id, img, selected, handleCardSelect }) {
    return (
        <div className={`grid-item ${selected && "selected"}`} onClick={handleCardSelect} data-index={id}>
            <img src={img} width={360} height={240} />
        </div>
    )

}

export default Card
