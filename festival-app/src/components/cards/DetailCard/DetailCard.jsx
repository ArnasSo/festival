import HeartButton from "../../ui/HeartButton/HeartButton";

export default function DetailCard( props ) {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.time}</p>
            <p>{props.location}</p>
            <p>{props.tags.join(", ")}</p>
            <p>{props.description}</p>
            <img src={props.imgLgUrl} alt={props.title} />
            <HeartButton />
        </div>
    );
}