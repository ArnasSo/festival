import LandingEventCard from "../../components/cards/LandingEventCard/LandingEventCard";
import eventsData from "../../data/events.json";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailOverlay from "../../components/overlays/DetailOverlay/DetailOverlay";
import MyPlanOverlay from "../../components/overlays/MyPlanOverlay/MyPlanOverlay";
import Header from "../../components/layout/Header/Header";
import styles from "./LandingPage.module.css";

import HighlightCard from "../../components/cards/HighlightCard/HighlightCard";

import myPlanImg from "../../assets/image/higlight-img/btn-my-plan.png";
import artistsImg from "../../assets/image/higlight-img/btn-activate-artists.png";
import eventsImg from "../../assets/image/higlight-img/btn-activate-events.png";
import djImg from "../../assets/image/higlight-img/btn-deactivate-dj.png";

export default function LandingPage() {
  const artists = eventsData.filter((event) => event.type === "artist");
  const events = eventsData.filter((event) => event.type === "event");

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showMyPlan, setShowMyPlan] = useState(false);

  const { savedEvents, toggleSaved } = useOutletContext();

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId
  );

  const plannedEvents = eventsData.filter((event) =>
    savedEvents.includes(event.id)
  );

  useEffect(() => {
  document.body.classList.add("no-scroll");

  return () => {
    document.body.classList.remove("no-scroll");
  };
}, []);

  return (
    <div className={styles.landingPage}>
      <Header />
      <section className={styles.quickLinks}>
  <HighlightCard
    label="My Plan"
    image={myPlanImg}
    onClick={() => setShowMyPlan(true)}
  />

  <HighlightCard
    label="Artists"
    image={artistsImg}
    onClick={() => console.log("Open artists highlight later")}
  />

  <HighlightCard
    label="Events"
    image={eventsImg}
    onClick={() => console.log("Open events highlight later")}
  />

  <HighlightCard
    label="DJ Sets"
    image={djImg}
    disabled
  />
</section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ARTISTS</h2>

        <div className={styles.horizontalScroll}>
          {artists.map((event) => (
            <LandingEventCard
              key={event.id}
              title={event.name}
              imgLgUrl={event.imgLgUrl}
              onClick={() => setSelectedEventId(event.id)}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>EVENTS</h2>

        <div className={styles.horizontalScroll}>
          {events.map((event) => (
            <LandingEventCard
              key={event.id}
              title={event.name}
              imgLgUrl={event.imgLgUrl}
              onClick={() => setSelectedEventId(event.id)}
            />
          ))}
        </div>
      </section>

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