# ⚡ Abhinav Gupta — Engineering Portfolio & Developer Platform

<div align="center">

[![Live Production](https://img.shields.io/badge/Live_Site-portfolio--beta--smoky--46.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-beta-smoky-46.vercel.app)
[![Next.js 15](https://img.shields.io/badge/Next.js-15_(App_Router)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Tests Passing](https://img.shields.io/badge/Jest_Tests-12%2F12_Passed-10B981?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

*An enterprise-grade, high-performance software engineering portfolio, interactive case-study platform, and headless developer API built with Next.js 15 App Router, TypeScript, and modern system design patterns.*

</div>

---

## 📑 Table of Contents
- [Executive Overview](#-executive-overview)
- [Featured Flagship Projects](#-featured-flagship-projects)
- [Developer Platform & Public Headless APIs](#-developer-platform--public-headless-apis)
- [Architecture & Scalability Features](#-architecture--scalability-features)
- [Tech Stack & Tooling](#-tech-stack--tooling)
- [Project Structure](#-project-structure)
- [Local Development & Environment Setup](#-local-development--environment-setup)
- [Testing & Quality Verification](#-testing--quality-verification)
- [License & Contact](#-license--contact)

---

## 📌 Executive Overview

This repository houses the personal portfolio and developer platform of **Abhinav Gupta**, a Software Engineer specializing in high-concurrency backend architecture (Java 21 Virtual Threads, Spring Boot, Apache Kafka, Neo4j) and modern full-stack web engineering (React, Next.js, TypeScript).

Unlike conventional static portfolios, this site is engineered as a **distributed, scalable web application** featuring:
1. **Dual Flagship Case Study Showcases**: Comprehensive deep-dives with system architecture diagrams, lifecycle steps, failure analyses, and design tradeoffs.
2. **Public Headless Developer API**: CORS-enabled endpoints serving projects, tech stack, and a standardized **JSON Resume** (`/api/v1/resume`).
3. **Interactive In-Browser API Playground**: A Postman-style developer sandbox at `/developer`.
4. **On-Demand Incremental Static Regeneration (ISR)**: Sub-second cache purging via secure webhooks without triggering full production rebuilds.
5. **Multi-Tier Fallback Services**: Upstash Redis distributed sliding-window rate limiting with transactional Resend email delivery and graceful in-memory/Gmail fallbacks.

---

## 🚀 Featured Flagship Projects

### 1. 🌐 Nexora — Distributed Professional Social Network (Flagship #1)
* **Concept**: Enterprise-grade event-driven distributed social & professional network built to handle **100k+ concurrent users** with 0% error rate.
* **Architecture**:
  * **Java 21 Virtual Threads (Project Loom)** for lightweight concurrent I/O.
  * **Spring Boot 3.3+** with **Spring Cloud Gateway** & Netflix Eureka discovery.
  * **Apache Kafka** event streaming for non-blocking notification fan-out.
  * **Neo4j AuraDB** graph database for constant-time $O(k)$ 1st/2nd-degree social network traversals.
  * **AWS S3 + CloudFront CDN** delivering multimedia assets with sub-15ms edge latency.
* **Live Site**: [nexoranetwork.site](https://nexoranetwork.site) • **GitHub**: [ABHINAVX03/nexora](https://github.com/ABHINAVX03/nexora)
* **Dedicated Case Study**: View the in-depth architectural breakdown at [`/projects/nexora`](https://portfolio-beta-smoky-46.vercel.app/projects/nexora).

### 2. 🚗 Uber Backend — Ride-Hailing REST API (Flagship #2)
* **Concept**: Cleanly decoupled backend coordinating rider onboarding, driver matching, ride lifecycle state transitions, and fare calculation.
* **Architecture**: Layered Spring Boot services, independent search matching pipeline, immutable trip audits, and Dockerized deployment.
* **Live Demo**: [book-car-frontend.vercel.app](https://book-car-frontend.vercel.app) • **GitHub**: [ABHINAVX03/Book_Karo-backend-Spring-boot-](https://github.com/ABHINAVX03/Book_Karo-backend-Spring-boot-)
* **Dedicated Case Study**: View the deep dive at [`/projects/uber-ride-platform`](https://portfolio-beta-smoky-46.vercel.app/projects/uber-ride-platform).

### 3. ⚡ CP Sync — Contest Aggregation & Calendar Sync Engine
* **Concept**: Automated contest aggregation engine and interactive dashboard that synchronizes upcoming coding rounds from developer platforms (LeetCode, CodeChef, and AtCoder) directly to Google Calendar.
* **Tech**: Java 21, Spring Boot, React, Google Calendar API, AWS EC2, Caching.
* **Live Demo**: [cp-sync-frontend.vercel.app](https://cp-sync-frontend.vercel.app) • **GitHub**: [ABHINAVX03/cp-sync-backend-](https://github.com/ABHINAVX03/cp-sync-backend-)

### 4. 🥗 AapkaCoach — AI-Powered Diet & Fitness Platform
* **Concept**: AI-driven personalized health and nutrition platform generating tailored 7-day Indian meal plans, workout splits, and body recomposition tracking based on BCA scan inputs.
* **Tech**: Next.js 16, React 19, DeepSeek AI, Supabase, Cashfree Payment Gateway, Tailwind CSS.
* **Live Demo**: [aapka-couch.vercel.app](https://aapka-couch.vercel.app) • **GitHub**: [ABHINAVX03/Aapka-Couch](https://github.com/ABHINAVX03/Aapka-Couch)

### 5. 🗳️ Voting DApp
* **Concept**: Decentralized voting application with Ethereum Solidity smart contracts, MetaMask integration, and immutable on-chain ballot recording.
* **Live Demo**: [votingbeta.netlify.app](https://votingbeta.netlify.app) • **GitHub**: [ABHINAVX03/Voting_Dapp](https://github.com/ABHINAVX03/Voting_Dapp)

---

## 🔌 Developer Platform & Public Headless APIs

This portfolio exposes a public, CORS-enabled REST API suite:

| Endpoint | Method | Cache Policy | Description |
| :--- | :---: | :--- | :--- |
| `/api/v1/projects` | `GET` | Edge Cache (`s-maxage=86400`) | Structured JSON feed of all active production projects. |
| `/api/v1/skills` | `GET` | Edge Cache (`s-maxage=86400`) | Grouped tech stack, current learning goals, and certifications. |
| `/api/v1/resume` | `GET` | Edge Cache (`s-maxage=86400`) | Standardized **JSON Resume** format compliant with [jsonresume.org](https://jsonresume.org). |
| `/api/revalidate` | `POST` | Dynamic (Protected) | Webhook endpoint for on-demand ISR cache purging. |

> **Try the Playground**: Visit [`/developer`](https://portfolio-beta-smoky-46.vercel.app/developer) to send live API requests directly from your browser.

---

## 🛠️ Architecture & Scalability Features

* **Scroll Restoration Architecture**: Custom `<ScrollRestoration />` controller enforcing `window.history.scrollRestoration = "manual"`, preventing unwanted viewport jumping on load or route transitions.
* **Modern Animated Theme Switcher**: Glassmorphism toggle powered by `framer-motion` and `AnimatePresence` with smooth icon rotation, scale, and spring physics.
* **Edge Caching**: GitHub API stats route uses `Cache-Control: s-maxage=3600, stale-while-revalidate=86400` to prevent rate-limit exhaustion.
* **Rate Limiting**: Distributed Sliding Window algorithm powered by `@upstash/ratelimit` and Upstash Redis.
* **Resilient Email Pipeline**: Resend API integration with automatic fallback to Nodemailer Gmail SMTP if API keys are not supplied.

---

## 💻 Tech Stack & Tooling

* **Framework**: Next.js 15.5.19 (App Router, Turbopack ready)
* **Frontend**: React 18, TypeScript 5, Framer Motion, React Icons
* **Styling**: Tailwind CSS, CSS Modules, Design Tokens
* **Data & Middleware**: Upstash Redis, Resend, Nodemailer
* **Testing**: Jest, React Testing Library, ESLint 9 (Flat Config)
* **CI/CD & Hosting**: Vercel Edge Network, GitHub Actions

---

## 📂 Project Structure

```text
Portfolio/
├── public/
│   ├── projects/          # High-resolution screenshots & collage assets
│   └── resume/            # Downloadable PDF resume
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── github/    # Cached GitHub profile & commit stats
│   │   │   ├── revalidate/# On-demand ISR webhook
│   │   │   ├── send-email/# Resend + Redis rate-limited mailer
│   │   │   └── v1/        # Public Headless Developer APIs (projects, skills, resume)
│   │   ├── blog/          # Technical writing & ISR dynamic routes
│   │   ├── developer/     # Interactive API Playground
│   │   ├── projects/[slug]# Deep architectural case-study pages
│   │   ├── layout.tsx     # Root layout & global chrome
│   │   └── page.tsx       # Homepage containing Hero, Projects, About, Contact
│   ├── components/
│   │   ├── About/         # Bio, GitHub stats, education & skill timelines
│   │   ├── ApiPlayground/ # Interactive API testing console
│   │   ├── Contact/       # Validated, spam-protected contact form
│   │   ├── Hero/          # Animated role tagline, 3D tilt, code widget
│   │   ├── Navbar/        # Floating glassmorphism navbar
│   │   ├── Projects/      # Dual Flagship cards & project masonry grid
│   │   └── ThemeToggle/   # Spring-animated dark/light switcher
│   ├── hooks/             # Custom utility hooks (focus trap, tilt, etc.)
│   └── utils/
│       ├── caseStudies/   # Narrative case studies (Nexora, Uber, etc.)
│       └── projects/      # Centralized project registry (index.json)
└── README.md
```

---

## 🚀 Local Development & Environment Setup

### 1. Clone the repository
```bash
git clone https://github.com/ABHINAVX03/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
# Email Service (Resend or Gmail)
RESEND_API_KEY=re_your_resend_api_key_here
EMAIL_TO=your_email@gmail.com

# Optional: Gmail fallback
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_gmail_app_password

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://your-upstash-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token_here

# On-Demand Revalidation Secret
REVALIDATION_SECRET=your_super_secret_revalidation_token
```

### 4. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Quality Verification

```bash
# Run unit & component test suites
npm test

# Run TypeScript static type-checking
npx tsc --noEmit

# Run ESLint check
npm run lint

# Run optimized production build
npm run build
```

---

## 📬 Contact & Connect

* **Portfolio**: [portfolio-beta-smoky-46.vercel.app](https://portfolio-beta-smoky-46.vercel.app)
* **GitHub**: [@ABHINAVX03](https://github.com/ABHINAVX03)
* **LinkedIn**: [Abhinav Gupta](https://www.linkedin.com/in/abhinavgupta03/)
* **Flagship Project**: [nexoranetwork.site](https://nexoranetwork.site)
