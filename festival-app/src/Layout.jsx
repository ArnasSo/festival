import { Outlet } from "react-router-dom";
import BottomNav from "../src/components/layout/BottomNav/BottomNav";
import ScrollToTop from "../src/components/utils/ScrollToTop/ScrollToTop";
import { useEffect, useState } from "react";

export default function Layout() {
  // Loads saved events from localStorage when app starts
  const [savedEvents, setSavedEvents] = useState(() => {
    const storedEvents = localStorage.getItem("savedEvents");

    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  // Saves updated likes to localStorage
  useEffect(() => {
    localStorage.setItem(
      "savedEvents",
      JSON.stringify(savedEvents)
    );
  }, [savedEvents]);

  const toggleSaved = (id) => {
    if (savedEvents.includes(id)) {
      setSavedEvents(
        savedEvents.filter((eventId) => eventId !== id)
      );
    } else {
      setSavedEvents([...savedEvents, id]);
    }
  };

  return (
    <>
      <ScrollToTop />
      <main>
        <Outlet
          context={{
            savedEvents,
            toggleSaved,
          }}
        />
      </main>

      <BottomNav />
    </>
  );
}