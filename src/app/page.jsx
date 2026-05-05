import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <div>
      {/* CSS-only animated background — zero JS, zero lag */}
      <div className="bg-grid" aria-hidden="true" />

      <section id="home">
        <Navbar />
        <Hero />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
