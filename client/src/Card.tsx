
interface CardProps {
    shape: string
    img: string
}

function Card({ shape, img }: CardProps) {

    return (
        <div>
            <img src={img} height="100" />
        </div>
    )

}

export default Card