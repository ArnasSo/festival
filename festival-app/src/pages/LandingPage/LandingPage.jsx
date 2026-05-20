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
  // we seperate event data into two grups to display on landing page
  // we rread json, inside we can find "type"

  const [selectedEventId, setSelectedEventId] = useState(null);
  // store which event is opened in delailoverlay
  // null means no overlay is open
  const [showMyPlan, setShowMyPlan] = useState(false);
  //state to control my plan overlay visibility
  const [activeHighlight, setActiveHighlight] = useState(null);
  // controls which story overlay is open
  const { savedEvents, toggleSaved } = useOutletContext();
  // shared saved event state from layouut.jsx

  const selectedEvent = eventsData.find(
    (event) => event.id === selectedEventId
  );
  // find all data for selected event

  const [watchedHighlights, setWatchedHighlights] = useState(() => {
    const storedHighlights = localStorage.getItem("watchedHighlights");

    return storedHighlights ? JSON.parse(storedHighlights) : {};
  });
  // we store in state, watched highlight cooldowns
  // loaded from localstorage so disabled highlights sttay disabled after page refresh

  const plannedEvents = eventsData.filter((event) =>
    savedEvents.includes(event.id)
  );
  // events shown inside my plan overlay
  // onyl includes ones which are saved

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
  // ddata used by highlightoverlay
  // keep story content grouped in one object

  const WATCH_TIME = 60 * 1000;
  // cooldown time before highlight becomes active again (can be watched again)

  const isHighlightDisabled = (type) => {
    // checks if highlight should be disabled
    const watchedUntil = watchedHighlights[type];
    // stores future timestamp

    return watchedUntil && Date.now() < watchedUntil;
    // idisabled if timestamp exists
    // and current time has not passed it yet

  };

  // marks highlight as watchged and disabled it for WATCH_TIME
  const markHighlightWatched = (type) => {
    const updatedHighlights = {
      ...watchedHighlights,
      // keep existing watched highlights
      [type]: Date.now() + WATCH_TIME,
      // add and update current highlight cooldowns
    };

    setWatchedHighlights(updatedHighlights);
    // we update the state
    localStorage.setItem("watchedHighlights", JSON.stringify(updatedHighlights));
    // then save cooldown in localstorage

    // gwhen timer ends, remove highlight from watched list
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
          // open my plan overlay
        />

        <HighlightCard
          label="Artists"
          image={isHighlightDisabled("artists") ? artistsInactiveImg : artistsImg}
          // highlight is inactive? show inactive image
          onClick={() => setActiveHighlight("artists")}
          // opens overlay
          disabled={isHighlightDisabled("artists")}
          // disabled while on cooldown
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
          // we have dj sets disabled because we didnt make it
        />
      </section>

      {/* artist horizontal section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ARTISTS</h2>

        <div className={styles.horizontalScroll}>
          {artists.map((event) => (
            <LandingEventCard
              key={event.id}
              title={event.name}
              imgLgUrl={event.imgLgUrl}
              onClick={() => setSelectedEventId(event.id)}
              // ope details for clicked artist
            />
          ))}
        </div>
      </section>

          {/* event horizontal section */}
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
    {/* event detail overlay */}
      {selectedEvent && (
        <DetailOverlay
          title={selectedEvent.name}
          time={selectedEvent.time}
          location={selectedEvent.location}
          imgSmUrl={selectedEvent.imgLgUrl}
          tags={selectedEvent.tags}
          description={selectedEvent.description}
          isSaved={savedEvents.includes(selectedEvent.id)}
          // check if selected event is saved
          toggleSaved={() => toggleSaved(selectedEvent.id)}
           // save/unsave selected event
          onClose={() => setSelectedEventId(null)}
          // close overlay...
        />
      )}

       {/* My Plan overlay */}
      {showMyPlan && (
        <MyPlanOverlay
          events={plannedEvents}
          savedEvents={savedEvents}
          toggleSaved={toggleSaved}
          onClose={() => setShowMyPlan(false)}
          // close my plan overlay :)
        />
      )}

       {/* Highlight/story overlay */}
      {activeHighlight && (
        <HighlightOverlay
          title={highlightData[activeHighlight].title}
          bubbleImage={highlightData[activeHighlight].bubbleImage}
          slides={highlightData[activeHighlight].slides}
          // when story finishes
          // mark as watched and close overlay
          onFinish={() => {
            markHighlightWatched(activeHighlight);
            setActiveHighlight(null);
          }}
          onClose={() => setActiveHighlight(null)}
          // close overlay without marking watched
        />
      )}
    </div>
  );
}