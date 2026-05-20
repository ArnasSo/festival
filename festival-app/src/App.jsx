import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import './index.css'
// this is our routing setup
const router = createBrowserRouter([
  {
    // we create "map" for the app - it says = when url looks like this - show this component
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "schedule",
        element: <SchedulePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}