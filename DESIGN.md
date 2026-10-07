# DESIGN SPECIFICATION: CONCEPT A — "DRAWING SET"

## 1. Concept Choice & Rationale
**Chosen Concept:** Concept A — "Drawing set" (Engineering Drawing / Blueprint Spec).

### Why it belongs to Abhinav's work
Abhinav Gupta builds distributed systems, microservice backends, and data architectures (Java 21, Spring Cloud Gateway, Kafka, Neo4j AuraDB, Redis, Docker). Engineering drawing sheets were invented to communicate complex multi-component systems with unambiguous precision, exact boundaries, rigorous revision tracking, and verified bills of materials. 
Treating the portfolio as an engineering drawing set directly mirrors this discipline:
- Microservices and graph topologies are represented as technical schematics with numbered callout balloons rather than marketing graphics.
- Skills become a strict "Bill of Materials" (BOM) linking each tool to the exact repository and system component where it was used.
- Career progression and education are tracked in a standardized "Revision History" block with build-derived metadata (git commit hash, commit date).
- Factual benchmarks (k6 measurements on AWS EC2) replace vague adjectives.

---

## 2. Universal Design Rules & Tokens

### Palette
Strict light paper-and-ink palette (`color-scheme: light`). Zero gradients, glows, or glassmorphism.
- **Paper Background (`--paper`):** `#F3EFE6`
- **Surface / Card Background (`--surface`):** `#F3EFE6` (flat paper sheets)
- **Ink / Primary Text (`--ink`):** `#1B1F2A`
- **Hairlines & Borders (`--hairline`):** `#1B1F2A` (1px solid hairlines)
- **Faint Grid Lines (`--grid-line`):** `#D9D2C3` (1px technical drawing grid)
- **Accent ("Red Pencil" annotation) (`--accent`):** `#C23B22`
- **Text Selection:** `::selection { background: #C23B22; color: #F3EFE6; }`

### Shape & Geometry
- **Border Radius:** `0px` everywhere (sharp, clean technical paper edges).
- **Buttons & Tags:** Rectangular blocks with 1px hairline borders; zero pill buttons.
- **Callouts:** Circular geometry is permitted solely for numbered callout balloons (e.g. `(1)`, `(2)`).

### Typography
All fonts self-hosted via `next/font`:
- **Heading / Text Serif:** `Newsreader` (Editorial, literary serif for primary reading lines and hero statements).
- **Metadata & Technical Data:** `JetBrains Mono` (Tabular numbers, drawing block metadata, code, timestamps).
- **Labels / Section Title Tags:** `Barlow Condensed` (Condensed sans uppercase for drawing titles and zone markers).
- **Scale:**
  - Body: 17–18px, line-height 1.65, max text column length 62ch.
  - Numbers: `font-variant-numeric: tabular-nums`.
  - Hero statement: Single oversized type moment per page.

### Banned Elements
- **Banned Fonts:** Inter, Roboto, Arial, Helvetica, Space Grotesk, Poppins, Montserrat, Geist, Outfit, Sora, Plus Jakarta Sans, DM Sans, Manrope.
- **Banned Styling:** Dark mode, gradients, blur/glassmorphism, box-shadows, animated gradient text, pill buttons, floating blobs, custom cursors.
- **Banned Copy Phrases:** "passionate", "scalable systems and elegant interfaces", "clean code", "thoughtful", "seamless", "robust", "cutting-edge", "leverage", "elevate", "crafting", "Building things that matter", "Who I Am", "What I've Built", "Let's Work Together", "Enterprise-grade", "Zero-Disk I/O".

---

## 3. Layout & Grid System
- **12-Column Asymmetric Grid:** Sections are rendered as discrete "Sheets" spanning 12 columns with deliberate empty columns for asymmetrical technical balance.
- **Outer Frame:** 1px ink border with 16px inset margin (8px on mobile).
- **Zone Markers:** Technical coordinates in the margin:
  - Columns A through F across top and bottom.
  - Rows 1 through 4 along left and right.
- **Title Block:** Fixed at the bottom-right of every sheet:
  - `TITLE`: Sheet title
  - `DWG NO`: `AG-001` through `AG-007`
  - `SHEET`: `n / 7`
  - `REV`: Git commit short hash (e.g., `4ce408f`)
  - `DATE`: Git commit timestamp
  - `DRAWN BY`: `Abhinav Gupta`

---

## 4. Component Inventory & Structure

### Sheet 1: Specification Overview (Hero) — `DWG NO: AG-001`
- **Left (Cols 1–7):** Factual hero sentence in large serif: `"Software Development Engineer specializing in Java 21, Spring Boot microservices, Kafka event streaming, and distributed data systems."`
- **Right (Cols 8–12):** Info title block containing:
  - Name: Abhinav Gupta
  - Institution: IIIT Vadodara (MCA)
  - Direct Email: `guptaabhinav697@gmail.com` (visible without scroll)
  - Direct Resume PDF link: `/Abhinav_Gupta_Resume.pdf` (visible without scroll)
  - Availability: `"Open to opportunities"`
  - Key proof line linking directly to Nexora architecture sheet: `"Nexora: 7 microservices, Kafka, Neo4j AuraDB, k6-tested to 500 VUs with <56ms median latency."`

### Sheet 2: System Architecture (Nexora) — `DWG NO: AG-002`
- **Primary Drawing:** Technical SVG schematic showing API Gateway, Eureka Discovery, User, Post, Connection, Notification, and Chat microservices with Redis, Kafka, Neo4j, and PostgreSQL.
- **Numbered Callout Balloons:** (1) Gateway & Rate Limiting, (2) Kafka Event Bus, (3) Neo4j Social Graph (sub-20ms 2nd-degree friend traversal vs 2.4s SQL joins), (4) Redis Active Session Store, (5) STOMP WebSocket Presence.
- **Interaction 1:** Hovering/focusing/tapping a callout balloon highlights the corresponding subsystem note and SVG node simultaneously. Fully keyboard accessible.
- **FIG. 0:** Original hand sketch block (hidden with `TODO(owner)` if sketch photo not provided).
- **Benchmark Data Table:** k6 load test results (virtual users, median p50 latency, p95, p99, error rate 0.77%).

### Sheet 3: Drawing List (Projects) — `DWG NO: AG-003`
- **Technical Drawing List Table:**
  - Headers: `DWG NO` | `TITLE` | `STACK` | `STATUS` | `LINKS`
  - Rows: BookKaro, CPSync, AapkaCoach, Portfolio.
- **Interaction 2:** Native HTML `<details>` and `<summary>` disclosure per row expanding into technical notes and verifiable failure postmortems (zero client JS required).

### Sheet 4: General Notes (About) — `DWG NO: AG-004`
- Numbered engineering notes written in first-person factual voice:
  1. MCA candidate at IIIT Vadodara (CGPA 8.5/10); BCA from GGSIPU (9.2/10).
  2. 500+ data structures and algorithms problems solved across platforms.
  3. Hackathons: Smart India Hackathon (SIH), Cerebro, HACKOUT '25.
  4. Core engineering focus: low-latency backend architectures, concurrency with Java 21 virtual threads, and event-driven microservices.
- Optional reference photo block (`PHOTO_PATH`).

### Sheet 5: Bill of Materials (Skills) — `DWG NO: AG-005`
- Formatted as an engineering BOM table:
  - `ITEM` | `USED IN` | `WHAT I DID WITH IT`
  - Every skill listed is paired with direct project evidence (e.g., `Java 21 Virtual Threads` -> `Nexora & CPSync` -> `Handled concurrent contest fetchers and non-blocking I/O`).

### Sheet 6: Revision History (Experience & Education) — `DWG NO: AG-006`
- Standard revision table:
  - `REV` | `DATE` | `DESCRIPTION`
  - `REV C`: 2025–Present | IIIT Vadodara — Master of Computer Applications (MCA), CGPA 8.5/10.
  - `REV B`: 2023 (Aug–Oct) | Codeeater — Software Developer Intern (Solidity smart contracts, Web3.js integration, gas optimization -15%).
  - `REV A`: 2021–2024 | GGSIPU — Bachelor of Computer Applications (BCA), Aggregate 9.2/10.

### Sheet 7: Request for Information (Contact) — `DWG NO: AG-007`
- Headed `"REQUEST FOR INFORMATION"`.
- Primary mailto link with explicit text `guptaabhinav697@gmail.com`.
- Links to GitHub, LinkedIn, LeetCode, and HackerRank.
- Zero decorative form; direct functional communication.

---

## 5. The "Swap Test" (Phase 5 Verification Criteria)
Five specific elements that only make sense for Abhinav Gupta's portfolio:
1. **The Nexora Microservices & Graph Architecture Diagram:** Tailored specifically to Nexora's 7 Spring Boot microservices, Eureka discovery, Kafka event bus, and Neo4j graph traversal replacing multi-table SQL joins.
2. **The k6 Benchmark Data Matrix:** Specific load test metrics (150s duration, 500 VUs, p50 56.1ms, p95 2197ms on AWS EC2) matching Abhinav's actual load script in `Linkdin/k6-load-test.js`.
3. **The BookKaro CORS Incident Postmortem:** The exact failure case where production startup failed on Railway due to an `IllegalStateException` triggered by localhost origins in the prod profile.
4. **The CPSync Threading Bugfix:** Specific mention of resolving contest fetcher deadlocks across Codeforces, LeetCode, CodeChef, and AtCoder using Java 21 Virtual Threads and eager Caffeine cache warming.
5. **The Revision History Table:** Real educational timeline (GGSIPU BCA 9.2 -> Codeeater Solidity Internship -> IIIT Vadodara MCA 8.5) tied directly to verified credentials.

---

## 6. Functional Motion & Craft Details
- **Interactions:**
  1. *Nexora Callout Inspection:* Hover/focus/tap synchronizes SVG highlights with specification notes.
  2. *Project Drawing Expansion:* Pure CSS `<details>` / `<summary>` drawer expansion.
  3. *Anchor Jump Indicator:* Hash anchor navigation briefly illuminates target sheet title block with red pencil accent (`#C23B22`).
- **Craft Features:**
  - Custom SVG monogram favicon (`AG` in hairline ink).
  - Print stylesheet with `@media print` forcing 1 sheet per A4 page landscape.
  - Accessible systems-styled 404 page (`502 Bad Gateway: route did not pass gateway`).
  - `/colophon` route detailing Next.js 15 App Router, TypeScript, Newsreader + JetBrains Mono + Barlow Condensed typography, Vercel hosting, and source code link.
