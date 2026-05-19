import HeartButton from "../../ui/HeartButton/HeartButton";

export default function EventCard(props, isSaved, toggleSaved) {
  return (
    <div>
      <div onClick={props.onClick}>
        <h2>{props.title}</h2>
        <p>{props.time}</p>
        <p>{props.location}</p>
        <img src={props.imgSmUrl} alt={props.title} />
      </div>
      <HeartButton saved={props.isSaved} toggleSaved={props.toggleSaved} />
    </div>
  );
}
