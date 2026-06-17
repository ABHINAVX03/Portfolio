import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import ScrollSection from "@/components/ScrollSection/ScrollSection";

export default function Home() {
  return (
    <div>
      {/* CSS-only animated background — zero JS, zero lag */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Navbar sits outside ScrollSection — it's fixed/global chrome, not a
          scrolling page section, so it shouldn't be subject to depth fade */}
      <Navbar />

      <ScrollSection id="home">
        <Hero />
      </ScrollSection>

      <ScrollSection id="projects">
        <Projects />
      </ScrollSection>

      <ScrollSection id="about">
        <About />
      </ScrollSection>

      <ScrollSection id="contact" intensity={0.6}>
        <Contact />
      </ScrollSection>
    </div>
  );
}