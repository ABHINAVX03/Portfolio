import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #050508, #111827)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 42, marginBottom: 12 }}>Abhinav Gupta</div>
        <div style={{ fontSize: 72, fontWeight: 700 }}>Full Stack Developer</div>
        <div style={{ fontSize: 28, marginTop: 18, color: "#9fb3ff" }}>React • Next.js • Java Spring Boot</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
