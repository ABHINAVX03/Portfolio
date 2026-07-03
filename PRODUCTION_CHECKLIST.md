# PRODUCTION DEPLOYMENT CHECKLIST

## Pre-Deployment ✅

### Environment & Configuration
- [ ] All secrets configured in Vercel Dashboard (GMAIL_USER, GMAIL_PASSWORD, EMAIL_TO)
- [ ] GitHub token added (optional, for rate limit increase)
- [ ] Sentry DSN configured for error tracking
- [ ] Vercel Analytics ID set
- [ ] Domain configured and SSL certificate valid
- [ ] .env.production.example reviewed and all vars present

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npx tsc --noEmit`)
- [ ] No unused imports or dead code
- [ ] Bundle size < 1MB
- [ ] No console.error or console.warn in production code
- [ ] No TODO comments in critical paths

### Security
- [ ] No hardcoded secrets in repository
- [ ] Discord URL is either removed or contains actual invite
- [ ] Rate limiting active on /api/send-email
- [ ] CSRF protection in place (if needed)
- [ ] Security headers configured in next.config.mjs
- [ ] Content Security Policy tested
- [ ] No dependency vulnerabilities (`npm audit`)
- [ ] Dependencies up-to-date

### Performance
- [ ] Lighthouse score > 80 for each metric
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Images optimized (WebP format where possible)
- [ ] Fonts using font-display: swap
- [ ] API caching configured (GitHub profile 1hr)
- [ ] Database connections pooled (if applicable)

### SEO & Accessibility
- [ ] Meta tags correct and unique per page
- [ ] OpenGraph images optimized
- [ ] robots.txt correct
- [ ] sitemap.xml includes all routes
- [ ] WCAG 2.2 AA compliance check passed
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Color contrast verified

### Testing
- [ ] Manual smoke test in production environment
- [ ] Contact form submission tested end-to-end
- [ ] GitHub profile API tested
- [ ] Error boundary tested (simulate error)
- [ ] Mobile responsiveness tested on real devices
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] API error scenarios tested

### Monitoring & Logging
- [ ] Sentry error tracking active
- [ ] Application Performance Monitoring (APM) configured
- [ ] Log aggregation service set up (if applicable)
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom)
- [ ] Alert notifications configured (email, Slack)
- [ ] Database backups scheduled
- [ ] CDN cache settings optimized

### Documentation
- [ ] README updated with production deployment instructions
- [ ] Environment variables documented
- [ ] API endpoint documentation complete
- [ ] Runbooks created for common incidents
- [ ] Database schema documented (if applicable)
- [ ] Deployment procedure documented

## Deployment Steps

### Vercel Deployment (Recommended)
```bash
# 1. Ensure all changes committed
git status
git add -A
git commit -m "Production ready: phase 13 fixes"

# 2. Push to main branch (triggers auto-deploy)
git push origin main

# 3. Monitor deployment in Vercel Dashboard
# 4. Run smoke tests on production

# 5. Monitor errors in Sentry for 24 hours
```

### Docker Deployment
```bash
# 1. Build Docker image
docker build -t portfolio:latest .

# 2. Tag for registry
docker tag portfolio:latest your-registry/portfolio:latest

# 3. Push to registry
docker push your-registry/portfolio:latest

# 4. Deploy using docker-compose
docker-compose -f docker-compose.yml up -d

# 5. Verify health
curl http://localhost:3000/api/health
```

### Manual Server Deployment
```bash
# 1. SSH to server
ssh user@your-server.com

# 2. Clone/pull latest code
git clone https://github.com/ABHINAVX03/Portfolio.git
cd Portfolio

# 3. Install & build
npm ci --omit=dev
npm run build

# 4. Set environment variables
export GMAIL_USER=...
export GMAIL_PASSWORD=...
export EMAIL_TO=...

# 5. Start application
npm start

# 6. Configure reverse proxy (nginx)
# See: ./nginx.conf.example
```

## Post-Deployment ✅

### Monitoring (First 24 Hours)
- [ ] Monitor Sentry for errors
- [ ] Monitor Vercel Analytics dashboard
- [ ] Check API response times
- [ ] Monitor GitHub API rate limits
- [ ] Test contact form (multiple submissions)
- [ ] Verify emails are being sent and received
- [ ] Monitor database connections (if applicable)

### Production Validation
- [ ] Visit homepage and verify all sections load
- [ ] Test contact form (should receive email)
- [ ] Verify GitHub profile stats display
- [ ] Check mobile responsiveness
- [ ] Verify page performance with Lighthouse
- [ ] Confirm sitemap is crawlable
- [ ] Check robots.txt

### Ongoing Maintenance (Weekly)
- [ ] Review Sentry error logs
- [ ] Check dependency updates (`npm outdated`)
- [ ] Verify uptime monitoring
- [ ] Review API response times
- [ ] Check storage usage
- [ ] Verify backups are being created

### Monthly Tasks
- [ ] Update dependencies (if security updates available)
- [ ] Review and rotate secrets if needed
- [ ] Verify SSL certificate expiry
- [ ] Review analytics and performance metrics
- [ ] Update documentation as needed
- [ ] Conduct security audit

### Quarterly Tasks
- [ ] Full penetration test
- [ ] Dependency security audit
- [ ] Performance optimization review
- [ ] Disaster recovery drill (restore from backup)
- [ ] Update playbooks and runbooks

## Rollback Plan

If production is broken:

### Vercel Rollback
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" on previous working deployment
3. Verify deployment successful
4. Test critical paths

### Docker Rollback
```bash
# Rollback to previous image
docker-compose down
docker pull your-registry/portfolio:previous-version
docker tag your-registry/portfolio:previous-version your-registry/portfolio:latest
docker-compose up -d
```

### Manual Server Rollback
```bash
git checkout HEAD~1
npm ci --omit=dev
npm run build
npm start
```

---

**Last Updated:** 2026-07-03
**Deployed By:** [Your Name]
**Deployment Time:** [Time]
**Status:** [Status]
