import EventCard from "../../components/cards/EventCard/EventCard";
import DetailOverlay from "../../components/overlays/DetailOverlay/DetailOverlay";
import eventsData from "../../data/events.json";
import { useState } from "react";

export default function SchedulePage() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [savedEvents, setSavedEvents] = useState([]);

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId,
  );

  const toggleSaved = (id) => {
    if (savedEvents.includes(id)) {
      setSavedEvents(savedEvents.filter((eventId) => eventId !== id));
    } else {
      setSavedEvents([...savedEvents, id]);
    }
  };

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
