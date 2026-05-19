import { Outlet } from "react-router-dom";
import BottomNav from "../src/components/layout/BottomNav/BottomNav";
import Header from "../src/components/layout/Header/Header";
import { useState } from "react";

export default function Layout() {

  const [savedEvents, setSavedEvents] = useState([]);

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
      <Header />
      <main>
        <Outlet context={{
          savedEvents,
          toggleSaved,
          }} 
        />
      </main>
      <BottomNav />
    </>
  );
}