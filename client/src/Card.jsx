function Card({ shape, img }) {

    return (
        <div>
            <img src={img} height="100" alt={shape} />
        </div>
    )

}

export default Card
