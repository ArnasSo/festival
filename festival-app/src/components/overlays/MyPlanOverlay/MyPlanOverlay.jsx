import EventCard from "../../cards/EventCard/EventCard";
import { useState } from "react";

export default function MyPlanOverlay({ events, savedEvents, toggleSaved, onClose, }) {
  
const [notificationsOn, setNotificationsOn] = useState(false);
const [toastMessage, setToastMessage] = useState("");

const handleNotificationToggle = () => {
  const newValue = !notificationsOn;

  setNotificationsOn(newValue);
  setToastMessage(
    newValue ? "You will get reminders" : "You won't get reminders",
  );

  setTimeout(() => {
    setToastMessage("");
  }, 3000);
};

    return (
    <div className="my-plan-overlay">
      <button onClick={onClose}>Close</button>

      <h2>My Plan</h2>

      <button onClick={handleNotificationToggle}>
        Notifications: {notificationsOn ? "On" : "Off"}
      </button>

      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}

      {events.length === 0 ? (
        <p>You have not saved any events yet.</p>
      ) : (
        events.map((event) => (
          <EventCard
            key={event.id}
            title={event.name}
            time={event.time}
            location={event.location}
            imgSmUrl={event.imgSmUrl}
            isSaved={savedEvents.includes(event.id)}
            toggleSaved={() => toggleSaved(event.id)}
          />
        ))
      )}
    </div>
  );
}
