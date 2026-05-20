import LandingEventCard from "../../components/cards/LandingEventCard/LandingEventCard";
import eventsData from "../../data/events.json";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailOverlay from "../../components/overlays/DetailOverlay/DetailOverlay";
import MyPlanOverlay from "../../components/overlays/MyPlanOverlay/MyPlanOverlay";
import Header from "../../components/layout/Header/Header";
import HighlightCard from "../../components/cards/HighlightCard/HighlightCard";
import HighlightOverlay from "../../components/overlays/HighlightOverlay/HighlightOverlay";
import styles from "./LandingPage.module.css";

import myPlanImg from "../../assets/image/higlight-img/btn-my-plan.png";
import artistsImg from "../../assets/image/higlight-img/btn-activate-artists.png";
import eventsImg from "../../assets/image/higlight-img/btn-activate-events.png";
import djImg from "../../assets/image/higlight-img/btn-deactivate-dj.png";
import artistsInactiveImg from "../../assets/image/higlight-img/btn-deactivate-artists.png";
import eventsInactiveImg from "../../assets/image/higlight-img/btn-deactivate-events.png";

import artist1 from "../../assets/image/higlight-img/artist1.png";
import artist2 from "../../assets/image/higlight-img/artist2.png";
import artist3 from "../../assets/image/higlight-img/artist3.png";

import event1 from "../../assets/image/higlight-img/event1.png";
import event2 from "../../assets/image/higlight-img/event2.png";

export default function LandingPage() {
  const artists = eventsData.filter((event) => event.type === "artist");
  const events = eventsData.filter((event) => event.type === "event");

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showMyPlan, setShowMyPlan] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(null);

  const { savedEvents, toggleSaved } = useOutletContext();

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId
  );

  const [watchedHighlights, setWatchedHighlights] = useState(() => {
    const storedHighlights = localStorage.getItem("watchedHighlights");

    return storedHighlights ? JSON.parse(storedHighlights) : {};
  });

  const plannedEvents = eventsData.filter((event) =>
    savedEvents.includes(event.id)
  );

  const highlightData = {
    artists: {
      title: "Artists",
      bubbleImage: artistsImg,
      slides: [artist1, artist2, artist3],
    },
    events: {
      title: "Events",
      bubbleImage: eventsImg,
      slides: [event1, event2],
    },
  };

  const WATCH_TIME = 60 * 1000;

  const isHighlightDisabled = (type) => {
    const watchedUntil = watchedHighlights[type];

    return watchedUntil && Date.now() < watchedUntil;
  };

  const markHighlightWatched = (type) => {
    const updatedHighlights = {
      ...watchedHighlights,
      [type]: Date.now() + WATCH_TIME,
    };

    setWatchedHighlights(updatedHighlights);
    localStorage.setItem("watchedHighlights", JSON.stringify(updatedHighlights));

    // Refresh state after 1 minute so the icon becomes active again without reloading
    setTimeout(() => {
      setWatchedHighlights((currentHighlights) => {
        const refreshedHighlights = { ...currentHighlights };
        delete refreshedHighlights[type];

        localStorage.setItem(
          "watchedHighlights",
          JSON.stringify(refreshedHighlights)
        );

        return refreshedHighlights;
      });
    }, WATCH_TIME);
  };

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
          image={isHighlightDisabled("artists") ? artistsInactiveImg : artistsImg}
          onClick={() => setActiveHighlight("artists")}
          disabled={isHighlightDisabled("artists")}
        />

        <HighlightCard
          label="Events"
          image={isHighlightDisabled("events") ? eventsInactiveImg : eventsImg}
          onClick={() => setActiveHighlight("events")}
          disabled={isHighlightDisabled("events")}
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

      {activeHighlight && (
        <HighlightOverlay
          title={highlightData[activeHighlight].title}
          bubbleImage={highlightData[activeHighlight].bubbleImage}
          slides={highlightData[activeHighlight].slides}
          onFinish={() => {
            markHighlightWatched(activeHighlight);
            setActiveHighlight(null);
          }}
          onClose={() => setActiveHighlight(null)}
        />
      )}
    </div>
  );
}