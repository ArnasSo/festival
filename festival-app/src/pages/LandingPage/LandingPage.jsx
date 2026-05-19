import LandingEventCard from "../../components/cards/LandingEventCard/LandingEventCard";
import eventsData from "../../data/events.json";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import DetailOverlay from "../../components/overlays/DetailOverlay/DetailOverlay";
import MyPlanOverlay from "../../components/overlays/MyPlanOverlay/MyPlanOverlay";

export default function LandingPage() {
  const artists = eventsData.filter((event) => event.type === "artist");
  const events = eventsData.filter((event) => event.type === "event");

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showMyPlan, setShowMyPlan] = useState(false);

  const { savedEvents, toggleSaved } = useOutletContext();

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId,
  );

  const plannedEvents = eventsData.filter((event) =>
    savedEvents.includes(event.id)
  );

  return (
    <div>

      <button onClick={() => setShowMyPlan(true)}>
        My Plan
      </button>

      <div>
        <h1>Artists</h1>
        {artists.map((event) => (
          <LandingEventCard
            key={event.id}
            title={event.name}
            imgLgUrl={event.imgLgUrl}
            onClick={() => setSelectedEventId(event.id)}
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
            onClick={() => setSelectedEventId(event.id)}
          />
        ))}
      </div>

      {selectedEvent && (
        <DetailOverlay
          title={selectedEvent.name}
          time={selectedEvent.time}
          location={selectedEvent.location}
          imgSmUrl={selectedEvent.imgLgUrl}
          tags={selectedEvent.tags}
          description={selectedEvent.description}
          isSaved={savedEvents.includes(selectedEvent.id)}
          toggleSaved={() => toggleSaved(selectedEvent.id)}
          onClose={() => setSelectedEventId(null)}
        />
      )}

      {showMyPlan && (
        <MyPlanOverlay
          events={plannedEvents}
          savedEvents={savedEvents}
          toggleSaved={toggleSaved}
          onClose={() => setShowMyPlan(false)}
        />
      )}
    </div>
  );
}
