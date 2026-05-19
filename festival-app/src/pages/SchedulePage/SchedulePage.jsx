import EventCard from "../../components/cards/EventCard/EventCard";
import DetailOverlay from "../../components/overlays/DetailOverlay/DetailOverlay";
import HeartButton from "../../components/ui/HeartButton/HeartButton";
import eventsData from "../../data/events.json";
import { useState } from "react";

export default function SchedulePage() {
  const [selectedEventId, setSelectedEventId] = useState(null);

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId,
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
          
          onClose={() => setSelectedEventId(null)}
        >
          <HeartButton />
        </DetailOverlay>
      )}
    </div>
  );
}
