export default function LandingEventCard( props ) {
    return (
        <div>          
            <img src={props.imgLgUrl} alt={props.title} />
            <h2>{props.title}</h2>         
        </div>
    );
}