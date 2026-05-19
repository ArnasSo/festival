import Tag from "../../ui/Tag/Tag";

export default function DetailOverlay(props) {
  return (
    <div>
      <button onClick={props.onClose}>Close</button>
      <h2>{props.title}</h2>
      <p>{props.time}</p>
      <p>{props.location}</p>
      <div>
        {props.tags?.map((tag, index) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <p>{props.description}</p>
      <img src={props.imgSmUrl} alt={props.title} />
    </div>
  );
}
