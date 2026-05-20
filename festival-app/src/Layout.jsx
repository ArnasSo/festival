import { Outlet } from "react-router-dom";
import BottomNav from "../src/components/layout/BottomNav/BottomNav";

import ScrollToTop from "../src/components/utils/ScrollToTop/ScrollToTop";
// we use utility scroll to top component because react remembers that you scrolled down in one 
// of the pages - so when you switch to another - it will remain "Scrolled down" and that's a
// thing we want to avoid

import { useEffect, useState } from "react";
// we use useeffect to run code when something changes
// we use usestate to store changing data

// we use layout as a "app shell"
export default function Layout() {
  // Loads saved events from localStorage when app starts
  // we use state of storedEvents to store ids of lived events
  const [savedEvents, setSavedEvents] = useState(() => {
    // basic array destructuring [state, function] = in our code state is savedEvents, function is setSavedEvents

    // we try to get previously stored events from localsotrage
    const storedEvents = localStorage.getItem("savedEvents");

    return storedEvents ? JSON.parse(storedEvents) : [];
    // simple ternary operator
    // if localstorage is there - convert the text (localstorage stores text) into array
    // else return empty array ([])
  });

  // Saves updated likes to localStorage
  useEffect(() => {
    //now we want to save updated events to localstorage
    localStorage.setItem(
      "savedEvents",
      // we need to stringify is (so our array of ids become string - thats what localstorage stored)
      JSON.stringify(savedEvents)
    );
  }, [savedEvents]);
  // our dependency array, means ONLY RUN WHEN SAVEDEVENTS CHANGE :D

  const toggleSaved = (id) => {
    // like or unlike the event
    // it starts by checking if our array already has it
    if (savedEvents.includes(id)) {
      // removes ID
      setSavedEvents(
        // we use filter to keep everything EXCEPT the id it matches
        savedEvents.filter((eventId) => eventId !== id)
      );
    } else {
      // we use else for adding
      // this is called SPREAD OPERATOR :D
      // we basically copy all saved events (savedEvents)
      // and then add new ID (id) at the end
      setSavedEvents([...savedEvents, id]);
    }
  };

  return (
    <>
      <ScrollToTop />
      <main>
        <Outlet
          context={{
            // this is where we pass shared data to all pages! very important!
            savedEvents,
            toggleSaved,
          }}
        />
      </main>

      <BottomNav />
    </>
  );
}