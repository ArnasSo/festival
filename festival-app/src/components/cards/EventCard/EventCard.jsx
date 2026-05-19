import HeartButton from "../../ui/HeartButton/HeartButton";

export default function EventCard(props) {
  return (
    <div>
      <div onClick={props.onClick}>
        <h2>{props.title}</h2>
        <p>{props.time}</p>
        <p>{props.location}</p>
        <img src={props.imgSmUrl} alt={props.title} />
      </div>
      <HeartButton 
        isSaved={props.isSaved}
        onClick={(e) => {
          e.stopPropagation();
          props.onSave();
        }} />
    </div>
  );
}
