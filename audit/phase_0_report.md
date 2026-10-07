# Portfolio Phase 0 Audit Report

## Template Tells Identified
The current codebase exhibits multiple hallmarks of generic developer templates. Below is the inventory:

1. **Gradients**
   - `src/app/globals.css`: `.bg-gradient-to-r`
   - `src/components/Hero/Hero.tsx`: `text-transparent bg-clip-text bg-gradient-to-r`
2. **Glow / Blur / Glass Effects**
   - `src/app/globals.css`: `.bg-orb` (creating background glows)
   - `src/components/Navbar/Navbar.tsx`: `backdrop-blur-md`
3. **Typewriter Text**
   - `src/components/Hero/Hero.tsx`: Uses `useTypewriter` hook for cycling roles.
   - `src/components/About/About.tsx`: Uses `useTypewriter` hook for bio.
4. **Code Card**
   - `src/components/Hero/Hero.tsx`: Contains a floating decorative `class Engineer {}` visual.
5. **Counter Tiles**
   - `src/components/Hero/Hero.tsx`: Stats block containing `<StatsWidget>` components.
6. **Pills / Badges**
   - `src/components/Navbar/Navbar.tsx`: "Available" pill with a pulsing green dot.
   - `src/components/Projects/Projects.tsx`: Technology and capability pills.
7. **Identical Card Grids**
   - `src/components/Projects/Projects.tsx`: Uniform, repeated grid of `.card` instances for all projects.
8. **"Flagship" Labels**
   - `src/components/Projects/Projects.tsx`: Uses generic hype labels like "Flagship Case Study #1".
9. **Decorative Framer Motion**
   - Widespread usage of `<motion.div>`, `initial`, `animate`, `transition` in:
     - `src/components/Hero/Hero.tsx`
     - `src/components/Projects/Projects.tsx`
     - `src/components/About/About.tsx`
     - `src/components/Navbar/Navbar.tsx`
     - `src/components/Contact/Contact.tsx`
     - `src/components/PageTransition.tsx`
10. **Default Fonts**
    - The design falls back to default `sans-serif` and imported `Inter` / `Geist` (from generic Next.js scaffold).

## Baseline Screenshots
Before-state screenshots of `/, /projects/nexora, /blog, /now, /developer` at widths `360px`, `768px`, and `1440px` have been successfully captured and stored in `/audit/before/`.
