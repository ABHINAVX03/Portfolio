"use client";
import { useEffect, useState } from "react";
import { MagicTabSelect } from "react-magic-motion";
import { Link } from "react-scroll";

const pillTabs = [
  { title: "Inicio", href: "home" },
  { title: "Proyectos", href: "projects" },
  { title: "Sobre mí", href: "about" },
  { title: "Contacto", href: "contact" },
];

const PillTabs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newIndex = Math.floor(scrollPosition / 1000);
      setHoveredIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tabsComponents = pillTabs.map((text, i) => {
    return (
      <Link
        key={i}
        to={text.href}
        spy={true}
        smooth={true}
        duration={100}
        onMouseEnter={() => setHoveredIndex(i)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          position: "relative",
          padding: "0.5rem 1rem",
          fontSize: "20px",
          fontFamily: "Prototype, sans-serif",
          color: hoveredIndex === i ? "#000" : "#ececec",
          border: 0,
          borderRadius: "20px",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        {hoveredIndex === i && (
          <MagicTabSelect
            id="pillTabs"
            transition={{ type: "spring", bounce: 0.35 }}
          >
            <span
              style={{
                borderRadius: "20px",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                backgroundColor: "rgb(34,196,112)",
                mixBlendMode: "color",
              }}
            />
          </MagicTabSelect>
        )}
        {text.title}
      </Link>
    );
  });

  return (
    <div style={{ display: "flex", gap: "0.75rem", margin: "0.75rem 0" }}>
      {tabsComponents}
    </div>
  );
};

export default PillTabs;
