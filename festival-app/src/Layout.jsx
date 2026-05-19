import { Outlet } from "react-router-dom";
import BottomNav from "../src/components/layout/BottomNav/BottomNav";
import Header from "../src/components/layout/Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}