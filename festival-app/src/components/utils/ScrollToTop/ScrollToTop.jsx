import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // we are passing pathname - so it runs only when route changes
  // if we left it empty [] it would only run ONCE when app stats - bad
  // if we didnt include dependancy array at all -i would just with every render

  return null;
}