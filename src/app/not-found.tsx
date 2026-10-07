import Link from "next/link";

export default function NotFound() {
  return (
    <div className="sheet-wrapper" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
      <section className="sheet" aria-labelledby="not-found-title">
        <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "left" }}>
          <p
            className="font-mono text-sm uppercase"
            style={{ color: "var(--accent)", marginBottom: "8px", fontWeight: 700 }}
          >
            ERR_ROUTING_MISMATCH // STATUS 404
          </p>
          <h1
            id="not-found-title"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              marginBottom: "16px",
              lineHeight: 1.15,
            }}
          >
            Sheet Not Found in Drawing Set
          </h1>
          <p style={{ marginBottom: "24px", color: "var(--muted)" }}>
            {/* DRAFT-COPY: owner to rewrite */}
            502 Bad Gateway: this route did not make it past the gateway. The requested path does
            not exist in this technical drawing set or was deprecated in a prior revision.
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="/" className="btn-dwg btn-dwg-accent">
              ← Return to Sheet 1 (Index)
            </Link>
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="title-block">
            <div className="title-block-cell">
              <span className="title-block-label">TITLE</span>
              <span className="title-block-val">FAULT / 404</span>
            </div>
            <div className="title-block-cell">
              <span className="title-block-label">DWG NO</span>
              <span className="title-block-val">AG-ERR</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
