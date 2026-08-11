export const metadata = {
  title: "Now | Abhinav Gupta",
  description: "What I am focused on right now in engineering, reading, and building.",
};

export default function NowPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>
      <p style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#6366f1", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.75rem" }}>Now</p>
      <h1 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc", margin: "0 0 12px" }}>What I’m up to lately</h1>
      <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "24px" }}>A snapshot of the work, reading, and learning occupying my attention right now.</p>
      <div style={{ display: "grid", gap: "16px" }}>
        {[
          { title: "Building", body: "A more polished case-study system and stronger frontend architecture patterns for my portfolio." },
          { title: "Reading", body: "System Design Interview, Designing Data-Intensive Applications, and practical software architecture essays." },
          { title: "Learning", body: "Distributed systems, observability, and the tradeoffs between elegant abstractions and pragmatic delivery." },
        ].map((item) => (
          <section key={item.title} style={{ padding: "20px 22px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
            <h2 style={{ fontSize: "1.05rem", color: "#fff", margin: "0 0 8px" }}>{item.title}</h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>{item.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
