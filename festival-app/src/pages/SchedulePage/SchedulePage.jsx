import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import EventCard from "../../components/cards/EventCard/EventCard";
import DetailOverlay from "../../components/overlays/DetailOverlay/DetailOverlay";
import eventsData from "../../data/events.json";
import styles from "./SchedulePage.module.css";

export default function SchedulePage() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { savedEvents, toggleSaved } = useOutletContext();

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId
  );

  // Sorts events by time first, then groups them by hour
  const groupedEvents = [...eventsData]
    .sort((a, b) => Number(a.time.replace(".", "")) - Number(b.time.replace(".", "")))
    .reduce((groups, event) => {
      const hour = event.time.split(".")[0] + ".00";

      if (!groups[hour]) {
        groups[hour] = [];
      }

      groups[hour].push(event);
      return groups;
    }, {});

  return (
    <div className={styles.schedulePage}>
      <h1 className={styles.title}>PROGRAM</h1>

      {Object.entries(groupedEvents).map(([hour, events]) => (
        <section key={hour} className={styles.timeGroup}>
          <h2 className={styles.timeHeading}>{hour}</h2>

          {events.map((event, index) => (
            <EventCard
              key={event.id}
              title={event.name}
              time={event.time}
              location={event.location}
              imgSmUrl={event.imgSmUrl}
              onClick={() => setSelectedEventId(event.id)}
              isSaved={savedEvents.includes(event.id)}
              toggleSaved={() => toggleSaved(event.id)}
              isFirst={index === 0}
              isLast={index === events.length - 1}
              isSingle={events.length === 1}
            />
          ))}
        </section>
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