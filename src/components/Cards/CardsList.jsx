"use client";
import { useState, useEffect } from "react";
import Content from "./Content";
import Cards from "./Cards";

const CardsList = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{isMobile ? <Content /> : <Cards />}</>;
};

export default CardsList;
