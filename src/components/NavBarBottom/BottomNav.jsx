"use client";
import { useState, useLayoutEffect } from "react";
import BottomBarNavi from "./BottomBarNavi";
import NavbarBottom from "./NavbarBottom";

const BottomNav = () => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const showNav = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    showNav();
    window.addEventListener("resize", showNav);

    return () => {
      window.removeEventListener("resize", showNav);
    };
  }, []);

  return <div>{isMobile && <NavbarBottom />}</div>;
};

export default BottomNav;
