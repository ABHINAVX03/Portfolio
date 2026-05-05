# Portfolio

A modern, responsive portfolio website showcasing projects with animations and interactive UI components.

## Tech Stack

- **Framework**: Next.js 14.1.0 with App Router
- **Frontend**: React 18 with Framer Motion animations
- **Styling**: Tailwind CSS with CSS Modules
- **Email**: EmailJS and Nodemailer integration
- **Internationalization**: i18next
- **UI Components**: Material-UI icons
- **Deployment**: Vercel

## Project Features

- ✨ Smooth animations and transitions using Framer Motion
- 📱 Fully responsive design with Tailwind CSS
- 🎨 Modern glass morphism and 3D UI effects
- ✉️ Contact form with email notifications
- 🔄 Project management system with single JSON source
- 🌍 Multi-language support (i18n)
- 🚀 Optimized for performance

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) to see your portfolio.

### Build for Production

```bash
npm run build
npm start
```

## Project Management

Manage projects using the provided CLI script:

```bash
# List all projects
node scripts/manage-projects.js list

# Add a new project
node scripts/manage-projects.js add my-project

# Update a project
node scripts/manage-projects.js update my-project priority=1 featured=true

# Delete a project
node scripts/manage-projects.js delete my-project

# Validate project data
node scripts/manage-projects.js validate

# View statistics
node scripts/manage-projects.js stats
```

All project data is stored in `src/utils/projects/index.json`.

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
GMAIL_USER=your_email
GMAIL_PASSWORD=your_app_password
```

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will auto-detect Next.js configuration
4. Deploy with a single click

Visit [Vercel Dashboard](https://vercel.com/dashboard) to manage your deployments.
