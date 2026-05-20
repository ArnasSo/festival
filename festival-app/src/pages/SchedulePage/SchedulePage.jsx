import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import EventCard from "../../components/cards/EventCard/EventCard";
import DetailOverlay from "../../components/overlays/DetailOverlay/DetailOverlay";
import eventsData from "../../data/events.json";
import styles from "./SchedulePage.module.css";

export default function SchedulePage() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  // state to store which event is currently opened in detail overlay
  // null mean no overlay is open :)

  const [highlightHour, setHighlightHour] = useState(null);
  // state to store section to where to scroll to

  const hourRefs = useRef({});
  // state to store time section in the DOM (reference)

  const { savedEvents, toggleSaved } = useOutletContext();
  // we take the functions from layout
  // we need saved event ids and unsave/save functin

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId
  );
  // we find all the relevant data for the selected/opened event

  // Sorts events by time first, then groups them by hour
  const groupedEvents = [...eventsData]
  // we do copy again because sort will mutate(mess up) our array and we dont want that
    .sort((a, b) => Number(a.time.replace(".", "")) - Number(b.time.replace(".", "")))
    .reduce((groups, event) => {
      // we use reduce to convert array into GROUPED objects
      const hour = event.time.split(".")[0] + ".00";

      if (!groups[hour]) {
        groups[hour] = [];
      }
      // if this hour group doesnt exist yet, create empty array for it
      groups[hour].push(event);
      // we .push (add) event into correct hour group
      return groups;
    }, {});

  useEffect(() => {
    const targetHour = "12.00";

    const timer = setTimeout(() => {
      hourRefs.current[targetHour]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setHighlightHour(targetHour);
      // add blue highlight

      // Fade highlight back after animation
      setTimeout(() => {
        setHighlightHour(null);
        // remove blue highlight
      }, 2200);
    }, 500);

    return () => clearTimeout(timer);
    // clearing timer if component unmounts
  }, []);
  // scrioll to selected hour

  return (
    <div className={styles.schedulePage}>
      <h1 className={styles.title}>PROGRAM</h1>

    {/* we render one section per hour group */}
      {Object.entries(groupedEvents).map(([hour, events]) => (
        <section
          key={hour}
          className={styles.timeGroup}
          ref={(element) => {
            hourRefs.current[hour] = element;
          }}
          // we store DOM element ref for this hour
        >
          <h2 className={styles.timeHeading}>{hour}</h2>

          {/* then we simply render events inside this hour group */}
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              title={event.name}
              time={event.time}
              location={event.location}
              imgSmUrl={event.imgSmUrl}
              onClick={() => setSelectedEventId(event.id)}
              // open detail overlay for THIS event (id)
              isSaved={savedEvents.includes(event.id)}
              // check if event ID even exists in savedEvents
              toggleSaved={() => toggleSaved(event.id)}
              // save//unsave this (id) event
              isFirst={index === 0}
              isLast={index === events.length - 1}
              isSingle={events.length === 1}
              // styling based on positioning
              highlighted={highlightHour === hour}
              // highlight blue all events in this hour group
            />
          ))}
        </section>
      ))}

      {/* lst but not least, this is detail overlay only when even is selected 
      thats why we use && operator!*/}
      {selectedEvent && (
        <DetailOverlay
          title={selectedEvent.name}
          time={selectedEvent.time}
          location={selectedEvent.location}
          imgSmUrl={selectedEvent.imgLgUrl}
          tags={selectedEvent.tags}
          description={selectedEvent.description}
          isSaved={savedEvents.includes(selectedEvent.id)}
          // heart state inside overlay
          toggleSaved={() => toggleSaved(selectedEvent.id)}
          // save/unsave selected event
          onClose={() => setSelectedEventId(null)}
          // close overlay
        />
      )}
    </div>
  );
}