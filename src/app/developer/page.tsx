import ApiPlayground from "@/components/ApiPlayground/ApiPlayground";

export const metadata = {
  title: "Developer API | Abhinav Gupta",
  description: "Public headless APIs and JSON Resume for Abhinav Gupta's portfolio.",
};

export default function DeveloperPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", maxWidth: "980px", margin: "0 auto" }}>
      <p style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#6366f1", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.75rem" }}>
        Developer Platform
      </p>
      <h1 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc", margin: "0 0 12px" }}>
        Headless API & JSON Resume
      </h1>
      <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "700px", lineHeight: 1.7, marginBottom: "48px" }}>
        I built this portfolio as a headless platform. You can consume my projects, skills, and resume data programmatically via public REST APIs. Try it out in the sandbox below.
      </p>

      <ApiPlayground />

      <div style={{ marginTop: "64px", display: "grid", gap: "32px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
          <h3 style={{ color: "#fff", fontFamily: "var(--font-space-grotesk)", fontSize: "1.2rem", margin: "0 0 8px" }}>Always in Sync</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            Powered by Next.js On-Demand ISR, these API endpoints serve cached edge responses that are instantly invalidated whenever I push an update via my CMS.
          </p>
        </div>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
          <h3 style={{ color: "#fff", fontFamily: "var(--font-space-grotesk)", fontSize: "1.2rem", margin: "0 0 8px" }}>JSON Resume Standard</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            The <code>/api/v1/resume</code> endpoint strictly adheres to the open-source JSON Resume schema, making it easily parsable by ATS systems and developer tools.
          </p>
        </div>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
          <h3 style={{ color: "#fff", fontFamily: "var(--font-space-grotesk)", fontSize: "1.2rem", margin: "0 0 8px" }}>CORS Enabled</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            Want to build a widget featuring my projects? The API has permissive CORS headers. Feel free to `fetch()` it directly from your own frontend.
          </p>
        </div>
      </div>
    </main>
  );
}
