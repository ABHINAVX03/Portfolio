# Phase 0: Baseline & Inventory Report

## 0.1 Full-Page Screenshots
Production build was started and Playwright was used to capture full-page screenshots of `/`, `/projects/nexora`, `/blog` and `/developer` at 360px, 768px, and 1440px. The screenshots have been successfully generated and saved to the `/audit/before/` directory.

## 0.2 "Template Tells" Inventory
The following common developer portfolio "template tells" were found in the codebase:

1. **Typewriter role text with a cursor**: Found in `src/components/Hero/Hero.tsx` (line 57 & 206) and `src/components/About/About.tsx` (line 160 & 452).
2. **Pulsing "Available" pill**: Found in `src/components/Navbar/Navbar.tsx` (line 143) and `src/components/Contact/Contact.tsx` (line 275).
3. **`class Engineer {}` code card**: Found in `src/components/Hero/Hero.tsx` (line 96).
4. **Counter/stat tiles**: Used extensively in `src/components/Hero/Hero.tsx` and `src/components/About/About.tsx`.
5. **"scroll" indicator**: Found in `src/components/Hero/Hero.tsx` (line 635).
6. **Logo marquee**: Found in `src/components/StackSlider/StackSlider.tsx`.
7. **Glow/blur/glass effects**: Highly prevalent. Custom CSS classes for blur and glow filters exist in `src/app/globals.css`, `projects.module.css`, `about.module.css`, and `hero.module.css` (e.g. `backdropFilter: "blur(32px)"`).
8. **Gradient text or backgrounds**: Abundant usage of `linear-gradient` and `radial-gradient` (often combining indigo, violet, and pink) in `Hero.tsx`, `Projects.tsx`, and `About.tsx`.
9. **"Flagship Case Study #n" labels**: Hardcoded logic for this exact label found in `src/components/Projects/Projects.tsx` (line 533).
10. **Decorative `framer-motion` usage**: Included in `Hero.tsx`, `About.tsx`, `Projects.tsx`, `ScrollSection.tsx`, `Navbar.tsx`, and `PageTransition.tsx`.

## 0.3 Current Baseline Metrics
- **Current Fonts**: `var(--font-space-grotesk)` (Headings), `var(--font-jetbrains-mono)` (Code/Accents), and `var(--font-body)` (Inter/Sans).
- **Current Colors**: Deep grays (`#0a0a14`), Indigo (`#6366f1`), Violet (`#8b5cf6`), Pink (`#f472b6`), and Cyan (`#00d4ff`).
- **Animation Libraries**: `framer-motion` is the primary animation driver.
- **Home Route Bundle Size**: 
  - First Load JS for `/` is **189 kB**.
  - Shared chunks total **102 kB**.
