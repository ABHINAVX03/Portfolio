import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import ScrollSection from "@/components/ScrollSection/ScrollSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-[var(--c-text-primary)]">
      {/* CSS-only animated background — zero JS, zero lag */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Navbar sits outside ScrollSection — it's fixed/global chrome, not a
          scrolling page section, so it shouldn't be subject to depth fade */}
      <Navbar />

      <ScrollSection>
        <Hero />
      </ScrollSection>

      <ScrollSection>
        <Projects />
      </ScrollSection>

      <ScrollSection>
        <About />
      </ScrollSection>

      <ScrollSection intensity={0.6}>
        <Contact />
      </ScrollSection>
    </div>
  );
}