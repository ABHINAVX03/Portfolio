# Vercel Deployment Setup

This guide ensures your portfolio deploys smoothly with email functionality working without manual setup.

## Prerequisites

Before deploying to Vercel, you need:

1. **Gmail Account** with 2-factor authentication enabled
2. **Gmail App Password** (not your regular Gmail password)
3. **Vercel Account** connected to your GitHub repository

## Step 1: Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-factor authentication (if not already enabled)
3. Go to [App passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password (you'll need it in Step 2)

## Step 2: Configure Environment Variables in Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

   | Variable Name | Value |
   |---|---|
   | `GMAIL_USER` | your_gmail@gmail.com |
   | `GMAIL_PASSWORD` | paste_the_16_char_password_here |

5. Make sure both variables are set for **Production**, **Preview**, and **Development**
6. Click **Save**

### Option B: Via Vercel CLI

```bash
vercel env add GMAIL_USER
# Enter: your_gmail@gmail.com

vercel env add GMAIL_PASSWORD
# Enter: your_16_character_app_password
```

## Step 3: Deploy to Vercel

After setting environment variables, your deployment is ready:

```bash
git push origin master
```

Vercel will automatically:
1. Detect changes in GitHub
2. Build your Next.js application
3. Use the environment variables you configured
4. Deploy to production

## Step 4: Test Email Functionality

1. Go to your deployed portfolio
2. Fill out the contact form
3. Submit a test email
4. Check your Gmail inbox for the notification

If email doesn't work:
- ✅ Verify `GMAIL_USER` and `GMAIL_PASSWORD` are set in Vercel
- ✅ Check that the 16-character password is correct (no extra spaces)
- ✅ Ensure Gmail 2-factor authentication is enabled
- ✅ Check Vercel logs: **Project** → **Deployments** → **Logs**

## Step 5: Update Contact Email (Optional)

If you want to receive emails at a different address:

1. Edit `src/app/api/send-email/route.js`
2. Find the line: `to: "guptaabhinav697@gmail.com",`
3. Replace with your email address
4. Commit and push to GitHub
5. Vercel will auto-redeploy

## Troubleshooting

### Email Not Working After Deploy

**Check 1: Verify Environment Variables**
```bash
vercel env list
```
Both `GMAIL_USER` and `GMAIL_PASSWORD` should be listed.

**Check 2: View Vercel Logs**
1. Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Go to **Functions** tab
4. Check `/api/send-email` logs for errors

**Check 3: Verify Gmail Settings**
- 2-factor authentication is enabled
- App password is set (not regular Gmail password)
- The app password doesn't have spaces when copied

### Password Was Wrong

1. Go back to [Google App passwords](https://myaccount.google.com/apppasswords)
2. Generate a new app password
3. Update it in Vercel dashboard
4. Trigger a redeployment (push a commit to GitHub)

## Automatic Deployments

After initial setup, deployments are fully automatic:

1. **Push to GitHub**: `git push origin master`
2. **Vercel detects changes** and starts building
3. **Environment variables are automatically injected**
4. **Your portfolio deploys** with working email

No manual setup needed on subsequent deployments!

## Support

For more information:
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment/vercel)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
