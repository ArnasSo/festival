import EventCard from "../../components/cards/EventCard/EventCard";
import DetailOverlay from "../../components/overlays/DetailOverlay/DetailOverlay";
import eventsData from "../../data/events.json";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function SchedulePage() {
  const [selectedEventId, setSelectedEventId] = useState(null);

  const { savedEvents, toggleSaved } = useOutletContext();

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId
  );

  return (
    <div>
      {eventsData.map((event) => (
        <EventCard
          key={event.id}
          title={event.name}
          time={event.time}
          location={event.location}
          imgSmUrl={event.imgSmUrl}
          onClick={() => setSelectedEventId(event.id)}
          isSaved={savedEvents.includes(event.id)}
          toggleSaved={() => toggleSaved(event.id)}
        />
      ))}

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
    </div>
  );
}
