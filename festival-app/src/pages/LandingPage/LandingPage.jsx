import LandingEventCard from "../../components/cards/LandingEventCard/LandingEventCard";
import eventsData from "../../data/events.json";

export default function LandingPage() {
  const artists = eventsData.filter((event) => event.type === "artist");
  const events = eventsData.filter((event) => event.type === "event");

  return (
    <div>
      <div>
        <h1>Artists</h1>
        {artists.map((event) => (
          <LandingEventCard
            key={event.id}
            title={event.name}
            imgLgUrl={event.imgLgUrl}
          />
        ))}
      </div>

      <div>
        <h1>Events</h1>
        {events.map((event) => (
          <LandingEventCard
            key={event.id}
            title={event.name}
            imgLgUrl={event.imgLgUrl}
          />
        ))}
      </div>
    </div>
  );
}
