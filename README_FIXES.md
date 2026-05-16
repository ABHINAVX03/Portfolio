# Portfolio Fixes — What Changed & Why

## How to apply
Copy each file from this zip into the **same path** in your project, replacing the old version.
Then run: `npm install` (to apply package.json changes).

---

## 🚨 CRITICAL — Do these first

### 1. `src/app/api/send-email/route.js`
**Problem:** Your real Gmail credentials were hardcoded directly in the source file.
Anyone with repo access could read them.

**Fix:** Credentials are now read from `process.env.GMAIL_USER` and `process.env.GMAIL_PASSWORD`.

**Action required:**
- On Vercel → Project Settings → Environment Variables → add GMAIL_USER and GMAIL_PASSWORD
- Locally → fill in `.env.local` with your new app password
- **Revoke the old Gmail app password now at:** https://myaccount.google.com/apppasswords

---

## 📦 Dependencies

### 2. `package.json`
Removed three unnecessary packages:
- `toastify` — duplicate of `react-toastify` (you already use react-toastify everywhere)
- `@emailjs/browser` — unused; you use nodemailer instead
- `dotenv` — unused; Next.js loads .env files natively

After replacing, run `npm install` to clean up node_modules.

---

## ⚙️ Config

### 3. `next.config.mjs`
Added:
- Security headers (X-Frame-Options, X-Content-Type-Options, XSS-Protection, Referrer-Policy)
- `images.remotePatterns` for GitHub avatar URLs (prevents Next.js Image errors)

---

## 🔍 SEO

### 4. `src/app/layout.jsx`
Added Open Graph image (`/og-image.png`) to metadata so link previews work on
LinkedIn, Twitter, Discord, and WhatsApp.

**Action required:** Create a 1200×630px image and save it as `public/og-image.png`.
You can make one free at: https://www.canva.com or https://og-playground.vercel.app

### 5. `src/app/robots.ts` ← NEW FILE
Tells search engine crawlers they can index your site and where the sitemap is.

### 6. `src/app/sitemap.ts` ← NEW FILE
Generates `/sitemap.xml` automatically — helps Google discover your portfolio.

---

## 🛠️ Bug Fixes

### 7. `src/utils/formValidation.js`
**Bug:** The function never returned `true` — it returned `undefined` on success.
If your Contact component does `if (formValidation(data)) { submit() }`, it would
**never submit**. Fixed to explicitly return `true`/`false`.

### 8. `src/utils/logos.js`
Removed `/logos/ReactNative .png` — the space in the filename causes 404 errors on Linux servers.
**To re-add it:** rename the actual file to `ReactNative.png` (no space), then add it back here.

### 9. `src/utils/socials.js`
- Location now links to general "Delhi, India" instead of a precise home address pin
- Discord URL format fixed — `discord.com/channels/...` is not a valid invite link.
  Replace `YOUR_INVITE_CODE` with your real invite code, or remove the Discord entry.

---

## 📋 Data Updates

### 10. `src/utils/projects/index.json`
- Removed broken repo link for `hospital-management` (was pointing to your main GitHub profile, not a specific repo). Set to `null` so no broken button shows.
- Fixed `lastUpdated` from 2024 → 2026-05-16

### 11. `i18next/english/en.json`
Updated the About section text to match your actual profile (MCA/IIIT Vadodara, BCA/GGSIPU, blockchain internship, 200+ DSA).

### 12. `src/utils/resume.json`
Updated with your real education and skills. Fill in your internship company name and dates.

---

## ✅ What you DON'T need to change
- All component files (Hero.tsx, Navbar.tsx, etc.) are fine as-is
- `tailwind.config.ts` — no issues
- `tsconfig.json` — no issues
- `vercel.json` — no issues
- `.gitignore` — already correctly excludes .env.local

## 📌 Remaining manual tasks (not code changes)
1. Compress `public/projects/project2.png` (2 MB) and `project4.png` (4 MB) → use https://squoosh.app, target < 200 KB each
2. Rename `public/logos/ReactNative .png` → `ReactNative.png` (remove the space)
3. Make sure `public/resume/Resume1.pdf` matches the filename referenced in Hero.tsx (`/resume/Resume.pdf`) — rename one to match the other
4. Create `public/og-image.png` (1200×630) for social link previews
5. Revoke old Gmail app password and set up new one in environment variables
