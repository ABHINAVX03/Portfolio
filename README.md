# Portfolio

A polished, production-minded Next.js portfolio for a full-stack developer, with a custom visual system, animated experiences, and deep project case studies.

## Tech Stack

- Framework: Next.js 15.5.19 with the App Router
- UI: React 18, Framer Motion, React Icons
- Styling: Tailwind CSS with global CSS and CSS modules
- Backend: Next.js API routes with Nodemailer for the contact form
- Testing: Jest + Testing Library, with Playwright scaffolding for E2E smoke tests
- Deployment: Vercel-ready, Dockerized for local container builds

## What makes this repo different

The case-study system is the differentiator. Each featured project can surface a deep narrative page with lifecycle diagrams, boundary decisions, and failure-analysis content, rather than just a surface-level project card.

## Highlights

- Responsive, animated portfolio shell with a strong visual identity
- Accessible contact form with rate limiting, honeypot protection, and HTML escaping
- GitHub profile API route that aggregates language and commit activity data
- A maintainable project registry with case-study content separated from the project grid data

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:4000 to view the site locally.

## Production checks

```bash
npm run build
npm run lint
npx tsc --noEmit
npm test -- --coverage
```

## Environment variables

Create a .env.local file with:

```env
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password
EMAIL_TO=your_email@gmail.com
```

## Project data

Project metadata lives in src/utils/projects/index.json, while case-study content lives under src/utils/caseStudies/.
